import { CHARACTERS } from './src/data/characters';
import { DISTRICTS } from './src/data/districts';
import { TRANSPORTS } from './src/data/transports';
import {
  chooseCharacter,
  chooseResidence,
  continueAfterResult,
  createInitialState,
  makeChoice,
  selectDistrict,
  selectTransport,
} from './src/engine/gameEngine';
import type { Character, GameState } from './src/types';

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function playOneGame(character: Character, homeDistrictId: string): {
  endingId: string;
  gameOverEarly: boolean;
  survivedDay: number;
  finalResources: GameState['resources'];
  turnsPlayed: number;
  worksAttended: number;
  worksMissed: number;
} {
  let state = createInitialState();
  state = chooseCharacter(state, character);
  state = chooseResidence(state, homeDistrictId);

  let worksAttended = 0;
  let worksMissed = 0;
  let guard = 0;

  while (state.screen !== 'end' && guard < 200) {
    guard++;
    if (state.screen === 'main' && state.turnStep === 'district') {
      const wasWorkPending = state.currentOptions.length > 0 &&
        character.workDistrictId &&
        character.workPeriods?.includes(['Manhã', 'Tarde', 'Noite'][state.periodIndex] as any) &&
        state.currentOptions.includes(character.workDistrictId);

      // 70% chance to go to work if it's an option and required this period, else random
      let districtId: string;
      if (wasWorkPending && Math.random() < 0.7) {
        districtId = character.workDistrictId as string;
      } else {
        districtId = pick(state.currentOptions);
      }
      state = selectDistrict(state, districtId);

      if (character.workDistrictId && districtId === character.workDistrictId) {
        // will count as attended only if it truly was a mandatory work period turn
      }
    } else if (state.screen === 'main' && state.turnStep === 'transport') {
      const t = pick(TRANSPORTS);
      state = selectTransport(state, t.id);
    } else if (state.screen === 'main' && state.turnStep === 'event' && state.currentEvent) {
      const choice = pick(state.currentEvent.choices);
      state = makeChoice(state, choice.id);
    } else if (state.screen === 'turnResult') {
      // track work attendance vs requirement before transitioning
      const period = ['Manhã', 'Tarde', 'Noite'][state.periodIndex];
      const required = character.workDistrictId && character.workPeriods?.includes(period as any);
      if (required) {
        if (state.currentDistrictId === character.workDistrictId) worksAttended++;
        else worksMissed++;
      }
      state = continueAfterResult(state);
    } else {
      break;
    }
  }

  return {
    endingId: state.endingId ?? 'unknown',
    gameOverEarly: state.gameOverEarly,
    survivedDay: state.day,
    finalResources: state.resources,
    turnsPlayed: state.turnHistory.length,
    worksAttended,
    worksMissed,
  };
}

// ---------------------------------------------------------------------------
const RUNS_PER_CHARACTER = 300;
const results: Record<string, ReturnType<typeof playOneGame>[]> = {};

for (const character of CHARACTERS) {
  results[character.id] = [];
  for (let i = 0; i < RUNS_PER_CHARACTER; i++) {
    const home = pick(DISTRICTS);
    results[character.id].push(playOneGame(character, home.id));
  }
}

console.log('='.repeat(80));
console.log(`SIMULAÇÃO: ${RUNS_PER_CHARACTER} jogos por persona (${CHARACTERS.length} personas, escolhas semi-aleatórias)`);
console.log('='.repeat(80));

let grandTotalGameOverEarly = 0;
let grandTotal = 0;
const endingCounts: Record<string, number> = {};

for (const character of CHARACTERS) {
  const runs = results[character.id];
  grandTotal += runs.length;
  const earlyCount = runs.filter((r) => r.gameOverEarly).length;
  grandTotalGameOverEarly += earlyCount;
  const survivedRuns = runs.filter((r) => !r.gameOverEarly);
  const avgMoney = avg(runs.map((r) => r.finalResources.money));
  const avgEnergy = avg(runs.map((r) => r.finalResources.energy));
  const avgMental = avg(runs.map((r) => r.finalResources.mental));
  const avgContacts = avg(runs.map((r) => r.finalResources.contacts));
  const avgRep = avg(runs.map((r) => r.finalResources.reputation));
  const avgSurvivedDay = avg(runs.map((r) => r.survivedDay));
  const avgTurns = avg(runs.map((r) => r.turnsPlayed));

  const localEndings: Record<string, number> = {};
  for (const r of runs) {
    localEndings[r.endingId] = (localEndings[r.endingId] ?? 0) + 1;
    endingCounts[r.endingId] = (endingCounts[r.endingId] ?? 0) + 1;
  }

  const workReqRuns = runs.filter((r) => r.worksAttended + r.worksMissed > 0);
  const avgAttendanceRate = workReqRuns.length
    ? avg(workReqRuns.map((r) => r.worksAttended / (r.worksAttended + r.worksMissed)))
    : null;

  console.log(`\n--- ${character.name} (${character.id}) ---`);
  console.log(`  Game over precoce: ${earlyCount}/${runs.length} (${pct(earlyCount, runs.length)})`);
  console.log(`  Dia médio de sobrevivência (se morreu cedo) / turnos médios jogados: ${avgSurvivedDay.toFixed(1)} / ${avgTurns.toFixed(1)}`);
  console.log(`  Recursos finais médios -> money:${avgMoney.toFixed(1)} energy:${avgEnergy.toFixed(1)} mental:${avgMental.toFixed(1)} contacts:${avgContacts.toFixed(1)} reputation:${avgRep.toFixed(1)}`);
  if (avgAttendanceRate !== null) {
    console.log(`  Taxa média de comparecimento ao trabalho: ${(avgAttendanceRate * 100).toFixed(0)}%`);
  }
  console.log(`  Finais: ${Object.entries(localEndings).sort((a, b) => b[1] - a[1]).map(([id, n]) => `${id}=${n}`).join(', ')}`);
}

console.log('\n' + '='.repeat(80));
console.log(`TOTAL GERAL: ${grandTotalGameOverEarly}/${grandTotal} jogos terminaram em game over precoce (${pct(grandTotalGameOverEarly, grandTotal)})`);
console.log('Distribuição geral de finais:');
for (const [id, n] of Object.entries(endingCounts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${id}: ${n} (${pct(n, grandTotal)})`);
}

function avg(nums: number[]): number {
  if (nums.length === 0) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}
function pct(n: number, total: number): string {
  return `${((n / total) * 100).toFixed(1)}%`;
}
