import type {
  Character,
  EventChoice,
  GameEvent,
  GameState,
  Period,
  Resources,
  TurnRecord,
} from '../types';
import { PERIODS, RESOURCE_META, TOTAL_TURNS } from '../types';
import { DISTRICTS } from '../data/districts';
import { TRANSPORTS } from '../data/transports';
import { ALL_EVENTS, EVENTS_BY_ID, GENERIC_EVENTS, eventsForDistrict } from '../data/events';
import { getWorkEvent } from '../data/workEvents';
import { resolveEnding } from '../data/endings';
import { clamp } from '../utils/clamp';
import { chance, pickWeighted, randInt, sampleDistinct } from '../utils/random';

const BASE_RESOURCES: Resources = {
  money: 60,
  energy: 75,
  mental: 70,
  contacts: 40,
  reputation: 40,
};

const DISTRICT_OPTIONS_PER_TURN = 8;
const RENT_DAY = 4; // meio da semana

function applyModifiers(base: Resources, mods: Partial<Resources>): Resources {
  const result = { ...base };
  (Object.keys(mods) as (keyof Resources)[]).forEach((k) => {
    result[k] = clamp(result[k] + (mods[k] ?? 0));
  });
  return result;
}

function clamp2(resources: Resources, delta: Partial<Resources>): Resources {
  const result = { ...resources };
  (Object.keys(delta) as (keyof Resources)[]).forEach((k) => {
    result[k] = clamp(result[k] + (delta[k] ?? 0));
  });
  return result;
}

function isVitalDepleted(resources: Resources): boolean {
  return (['money', 'energy', 'mental'] as const).some((k) => resources[k] <= 0);
}

/** Retorna o bairro de trabalho obrigatório do personagem para o período dado, se houver. */
export function getWorkDistrictForPeriod(character: Character | null, period: Period): string | null {
  if (!character || !character.workDistrictId || !character.workPeriods) return null;
  return character.workPeriods.includes(period) ? character.workDistrictId : null;
}

/** Sorteia as opções de bairro de um turno, sempre incluindo o trabalho obrigatório, se houver. */
export function drawDistrictOptions(character: Character | null, period: Period): string[] {
  const allIds = DISTRICTS.map((d) => d.id);
  const workDistrict = getWorkDistrictForPeriod(character, period);
  return sampleDistinct(allIds, DISTRICT_OPTIONS_PER_TURN, workDistrict ?? undefined);
}

export function createInitialState(): GameState {
  return {
    screen: 'home',
    character: null,
    homeDistrictId: null,
    resources: { ...BASE_RESOURCES },
    day: 1,
    periodIndex: 0,
    turnStep: 'district',
    currentOptions: [],
    currentDistrictId: null,
    currentTransportId: null,
    currentEvent: null,
    isWorkTurn: false,
    turnHistory: [],
    unlockedEventIds: [],
    rentCharged: false,
    gameOverEarly: false,
    endingId: null,
    lastTurn: null,
    notices: [],
  };
}

/** Etapa 1: jogador escolhe o personagem. Ainda falta escolher onde vai morar. */
export function chooseCharacter(state: GameState, character: Character): GameState {
  return {
    ...state,
    character,
    resources: applyModifiers(BASE_RESOURCES, character.modifiers),
    screen: 'residence',
  };
}

/** Etapa 2: jogador escolhe o bairro onde vai morar. A partir daqui o jogo começa de fato. */
export function chooseResidence(state: GameState, districtId: string): GameState {
  if (!state.character) return state;
  return {
    ...state,
    homeDistrictId: districtId,
    day: 1,
    periodIndex: 0,
    turnStep: 'district',
    currentOptions: drawDistrictOptions(state.character, PERIODS[0]),
    screen: 'main',
    notices: [],
  };
}

export function selectDistrict(state: GameState, districtId: string): GameState {
  const period = PERIODS[state.periodIndex];
  const workDistrict = getWorkDistrictForPeriod(state.character, period);
  return {
    ...state,
    currentDistrictId: districtId,
    isWorkTurn: workDistrict !== null && workDistrict === districtId,
    turnStep: 'transport',
  };
}

export function selectTransport(state: GameState, transportId: string): GameState {
  if (!state.currentDistrictId) return state;
  const transport = TRANSPORTS.find((t) => t.id === transportId);
  if (!transport) return state;

  let chosenEvent: GameEvent | null = null;

  if (state.isWorkTurn && state.character) {
    chosenEvent = getWorkEvent(state.character.id);
  }

  if (!chosenEvent) {
    const pool = [
      ...eventsForDistrict(state.currentDistrictId),
      ...GENERIC_EVENTS.filter(
        (e) => e.compatibleTransports === 'any' || e.compatibleTransports.includes(transportId)
      ),
      ...state.unlockedEventIds
        .map((id) => EVENTS_BY_ID[id])
        .filter((e): e is GameEvent => !!e && e.districtId === state.currentDistrictId),
    ];

    const compatiblePool = pool.filter(
      (e) => e.compatibleTransports === 'any' || e.compatibleTransports.includes(transportId)
    );
    const finalPool = compatiblePool.length > 0 ? compatiblePool : pool;

    chosenEvent =
      pickWeighted(finalPool, (e) => e.weight) ??
      pickWeighted(ALL_EVENTS.filter((e) => e.districtId === state.currentDistrictId), (e) => e.weight) ??
      pickWeighted(GENERIC_EVENTS, (e) => e.weight);
  }

  if (!chosenEvent) return state;

  // Custo-base de transporte é aplicado junto com o resultado do evento,
  // para que o jogador sinta o impacto da escolha de deslocamento.
  const resourcesAfterTransport = clamp2(state.resources, {
    money: -transport.moneyCost,
    energy: -transport.energyCost,
  });

  return {
    ...state,
    currentTransportId: transportId,
    currentEvent: chosenEvent,
    resources: resourcesAfterTransport,
    turnStep: 'event',
  };
}

interface ResolvedChoice {
  delta: Partial<Resources>;
  resultText: string;
  unlockedEventId?: string;
}

function resolveChoice(choice: EventChoice): ResolvedChoice {
  const delta: Partial<Resources> = {};
  (Object.keys(choice.base) as (keyof Resources)[]).forEach((k) => {
    const baseVal = choice.base[k] ?? 0;
    const variance = choice.variance ?? 0;
    const noise = variance > 0 ? randInt(-variance, variance) : 0;
    delta[k] = baseVal + noise;
  });

  let resultText = choice.resultTemplate;
  let unlockedEventId: string | undefined;

  if (choice.luckyChance && chance(choice.luckyChance) && choice.luckyBonus) {
    (Object.keys(choice.luckyBonus) as (keyof Resources)[]).forEach((k) => {
      delta[k] = (delta[k] ?? 0) + (choice.luckyBonus![k] ?? 0);
    });
    if (choice.luckyText) resultText = `${resultText} ${choice.luckyText}`;
  } else if (choice.unluckyChance && chance(choice.unluckyChance) && choice.unluckyPenalty) {
    (Object.keys(choice.unluckyPenalty) as (keyof Resources)[]).forEach((k) => {
      delta[k] = (delta[k] ?? 0) + (choice.unluckyPenalty![k] ?? 0);
    });
    if (choice.unluckyText) resultText = `${resultText} ${choice.unluckyText}`;
  }

  if (choice.unlockEventId && choice.unlockChance && chance(choice.unlockChance)) {
    unlockedEventId = choice.unlockEventId;
  }

  return { delta, resultText, unlockedEventId };
}

export function makeChoice(state: GameState, choiceId: string): GameState {
  if (!state.currentEvent || !state.currentDistrictId || !state.currentTransportId) return state;
  const choice = state.currentEvent.choices.find((c) => c.id === choiceId);
  if (!choice) return state;

  const { delta, resultText, unlockedEventId } = resolveChoice(choice);
  const newResources = clamp2(state.resources, delta);

  const turnRecord: TurnRecord = {
    day: state.day,
    period: PERIODS[state.periodIndex],
    districtId: state.currentDistrictId,
    transportId: state.currentTransportId,
    eventId: state.currentEvent.id,
    eventTitle: state.currentEvent.title,
    choiceLabel: choice.label,
    resultText,
    delta,
    isWork: state.isWorkTurn,
  };

  const gameOverEarly = isVitalDepleted(newResources);

  const unlockedEventIds =
    unlockedEventId && !state.unlockedEventIds.includes(unlockedEventId)
      ? [...state.unlockedEventIds, unlockedEventId]
      : state.unlockedEventIds;

  return {
    ...state,
    resources: newResources,
    turnHistory: [...state.turnHistory, turnRecord],
    unlockedEventIds,
    gameOverEarly,
    lastTurn: turnRecord,
    screen: 'turnResult',
  };
}

export function continueAfterResult(state: GameState): GameState {
  if (state.gameOverEarly) {
    return { ...state, screen: 'end', endingId: computeEndingId(state) };
  }

  const isLastTurnOfGame = state.turnHistory.length >= TOTAL_TURNS;
  if (isLastTurnOfGame) {
    return { ...state, screen: 'end', endingId: computeEndingId(state) };
  }

  // ---- Penalidade de falta ao trabalho -----------------------------------
  const notices: string[] = [];
  let resources = state.resources;
  const finishedPeriod = PERIODS[state.periodIndex];
  const workDistrict = getWorkDistrictForPeriod(state.character, finishedPeriod);
  if (workDistrict && state.currentDistrictId !== workDistrict && state.character?.absencePenalty) {
    resources = clamp2(resources, state.character.absencePenalty);
    notices.push(
      `Você faltou ao seu compromisso de ${finishedPeriod.toLowerCase()} e isso pesou nos seus recursos.`
    );
  }

  if (isVitalDepleted(resources)) {
    return {
      ...state,
      resources,
      gameOverEarly: true,
      screen: 'end',
      endingId: computeEndingId({ ...state, resources, gameOverEarly: true }),
    };
  }

  let nextPeriodIndex = state.periodIndex + 1;
  let nextDay = state.day;
  if (nextPeriodIndex >= PERIODS.length) {
    nextPeriodIndex = 0;
    nextDay += 1;
    // Uma noite de sono recupera um pouco de energia e saúde mental —
    // a cidade é dura, mas ninguém aguenta 7 dias sem nenhum descanso.
    resources = clamp2(resources, { energy: 16, mental: 8 });
  }

  // ---- Cobrança de aluguel, uma vez, no meio da semana -------------------
  let rentCharged = state.rentCharged;
  if (!rentCharged && nextDay >= RENT_DAY && state.homeDistrictId) {
    const home = getDistrictById(state.homeDistrictId);
    if (home) {
      resources = clamp2(resources, { money: -home.rent });
      notices.push(`Aluguel do(a) ${home.name} descontado: -R$ ${home.rent}.`);
      rentCharged = true;
    }
  }

  if (isVitalDepleted(resources)) {
    return {
      ...state,
      resources,
      rentCharged,
      gameOverEarly: true,
      screen: 'end',
      endingId: computeEndingId({ ...state, resources, gameOverEarly: true }),
    };
  }

  return {
    ...state,
    resources,
    day: nextDay,
    periodIndex: nextPeriodIndex,
    turnStep: 'district',
    currentOptions: drawDistrictOptions(state.character, PERIODS[nextPeriodIndex]),
    currentDistrictId: null,
    currentTransportId: null,
    currentEvent: null,
    isWorkTurn: false,
    rentCharged,
    notices,
    screen: 'main',
  };
}

function computeEndingId(state: GameState): string {
  if (!state.character) return 'sobrevivente';
  const ending = resolveEnding({
    resources: state.resources,
    turns: state.turnHistory,
    survivedDays: state.day,
    gameOverEarly: state.gameOverEarly,
    character: state.character,
  });
  return ending.id;
}

export function getDistrictById(id: string) {
  return DISTRICTS.find((d) => d.id === id) ?? null;
}

export function getTransportById(id: string) {
  return TRANSPORTS.find((t) => t.id === id) ?? null;
}

export function resourceLethalityWarning(resources: Resources): string | null {
  const critical = (Object.keys(RESOURCE_META) as (keyof Resources)[]).filter(
    (k) => RESOURCE_META[k].lethal && resources[k] <= 15
  );
  if (critical.length === 0) return null;
  return critical.map((k) => RESOURCE_META[k].label).join(', ');
}
