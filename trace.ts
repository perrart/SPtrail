import { CHARACTERS } from './src/data/characters';
import { DISTRICTS } from './src/data/districts';
import {
  chooseCharacter,
  chooseResidence,
  continueAfterResult,
  createInitialState,
  makeChoice,
  selectDistrict,
  selectTransport,
  getWorkDistrictForPeriod,
} from './src/engine/gameEngine';
import type { EventChoice, Resources } from './src/types';
import { PERIODS } from './src/types';

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function scoreChoice(choice: EventChoice, resources: Resources): number {
  let score = 0;
  const weight: Record<string, number> = { money: 1.3, energy: 1, mental: 1.2, contacts: 0.6, reputation: 0.6 };
  (Object.keys(choice.base) as (keyof Resources)[]).forEach((k) => {
    let v = (choice.base[k] ?? 0) * (weight[k] ?? 1);
    if ((choice.base[k] ?? 0) < 0 && resources[k] < 30) v *= 2.2;
    score += v;
  });
  return score;
}
function bestChoice(choices: EventChoice[], resources: Resources): EventChoice {
  return [...choices].sort((a, b) => scoreChoice(b, resources) - scoreChoice(a, resources))[0];
}
function bestTransport(resources: Resources): string {
  if (resources.energy < 25) return 'uber';
  if (resources.money < 20) return 'bike';
  return pick(['bike', 'metro']);
}

const character = CHARACTERS.find((c) => c.id === 'estudante')!;
let state = createInitialState();
state = chooseCharacter(state, character);
state = chooseResidence(state, DISTRICTS[0].id);
console.log(`Início: money=${state.resources.money}`);

let guard = 0;
while (state.screen !== 'end' && guard < 60) {
  guard++;
  if (state.screen === 'main' && state.turnStep === 'district') {
    const period = PERIODS[state.periodIndex];
    const workDistrict = getWorkDistrictForPeriod(character, period);
    const districtId = workDistrict && state.currentOptions.includes(workDistrict)
      ? workDistrict
      : [...state.currentOptions].map((id) => DISTRICTS.find((d) => d.id === id)!).sort((a, b) => a.avgCost - b.avgCost)[0].id;
    state = selectDistrict(state, districtId);
  } else if (state.screen === 'main' && state.turnStep === 'transport') {
    const t = bestTransport(state.resources);
    const moneyBefore = state.resources.money;
    state = selectTransport(state, t);
    console.log(`  transporte=${t} money ${moneyBefore} -> ${state.resources.money}`);
  } else if (state.screen === 'main' && state.turnStep === 'event' && state.currentEvent) {
    const choice = bestChoice(state.currentEvent.choices, state.resources);
    const moneyBefore = state.resources.money;
    state = makeChoice(state, choice.id);
    console.log(`  evento="${state.currentEvent?.title}" escolha="${choice.label}" base.money=${choice.base.money ?? 0} money ${moneyBefore} -> ${state.resources.money}`);
  } else if (state.screen === 'turnResult') {
    state = continueAfterResult(state);
    console.log(`--- dia ${state.day} periodo ${PERIODS[state.periodIndex]} money=${state.resources.money} energy=${state.resources.energy} mental=${state.resources.mental} notices=${JSON.stringify(state.notices)}`);
  } else break;
}
console.log(`\nFIM: ending=${state.endingId} gameOverEarly=${state.gameOverEarly} day=${state.day} money=${state.resources.money}`);
