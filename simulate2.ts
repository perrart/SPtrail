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
  getWorkDistrictForPeriod,
} from './src/engine/gameEngine';
import type { Character, GameState, EventChoice, Resources } from './src/types';
import { PERIODS } from './src/types';

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Pontua uma escolha de evento considerando os recursos atuais (prioriza
// blindar recursos críticos e valoriza dinheiro/mental um pouco mais).
function scoreChoice(choice: EventChoice, resources: Resources): number {
  let score = 0;
  const weight: Record<string, number> = { money: 1.3, energy: 1, mental: 1.2, contacts: 0.6, reputation: 0.6 };
  (Object.keys(choice.base) as (keyof Resources)[]).forEach((k) => {
    let v = (choice.base[k] ?? 0) * (weight[k] ?? 1);
    // Penaliza mais fortemente perdas em recursos já baixos (jogador cauteloso).
    if ((choice.base[k] ?? 0) < 0 && resources[k] < 30) v *= 2.2;
    score += v;
  });
  return score;
}

function bestChoice(choices: EventChoice[], resources: Resources): EventChoice {
  return [...choices].sort((a, b) => scoreChoice(b, resources) - scoreChoice(a, resources))[0];
}

// Estratégia de transporte: usa bike/metro (barato) por padrão; usa uber só
// se a energia estiver muito baixa; evita ônibus (pior custo-benefício aqui).
function bestTransport(resources: Resources): string {
  if (resources.money < 25) return 'bike';
  if (resources.energy < 25) return 'uber';
  return pick(['bike', 'metro']);
}

function playOneGame(character: Character, homeDistrictId: string) {
  let state = createInitialState();
  state = chooseCharacter(state, character);
  state = chooseResidence(state, homeDistrictId);

  let worksAttended = 0;
  let worksMissed = 0;
  let guard = 0;

  while (state.screen !== 'end' && guard < 200) {
    guard++;
    if (state.screen === 'main' && state.turnStep === 'district') {
      const period = PERIODS[state.periodIndex];
      const workDistrict = getWorkDistrictForPeriod(character, period);
      let districtId: string;
      if (workDistrict && state.currentOptions.includes(workDistrict)) {
        districtId = workDistrict; // jogador atento sempre vai trabalhar quando possível
      } else {
        // prefere bairro de menor avgCost entre as opções (jogador econômico)
        const districtsOpts = state.currentOptions
          .map((id) => DISTRICTS.find((d) => d.id === id)!)
          .sort((a, b) => a.avgCost - b.avgCost);
        districtId = districtsOpts[0].id;
      }
      state = selectDistrict(state, districtId);
    } else if (state.screen === 'main' && state.turnStep === 'transport') {
      state = selectTransport(state, bestTransport(state.resources));
    } else if (state.screen === 'main' && state.turnStep === 'event' && state.currentEvent) {
      const choice = bestChoice(state.currentEvent.choices, state.resources);
      state = makeChoice(state, choice.id);
    } else if (state.screen === 'turnResult') {
      const period = PERIODS[state.periodIndex];
      const required = getWorkDistrictForPeriod(character, period);
      if (required) {
        if (state.currentDistrictId === required) worksAttended++;
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
console.log(`SIMULAÇÃO 2 (jogador cauteloso/heurístico): ${RUNS_PER_CHARACTER} jogos por persona`);
console.log('='.repeat(80));

let grandTotalGameOverEarly = 0;
let grandTotal = 0;
const endingCounts: Record<string, number> = {};

for (const character of CHARACTERS) {
  const runs = results[character.id];
  grandTotal += runs.length;
  const earlyCount = runs.filter((r) => r.gameOverEarly).length;
  grandTotalGameOverEarly += earlyCount;
  const avgMoney = avg(runs.map((r) => r.finalResources.money));
  const avgEnergy = avg(runs.map((r) => r.finalResources.energy));
  const avgMental = avg(runs.map((r) => r.finalResources.mental));
  const avgSurvivedDay = avg(runs.map((r) => r.survivedDay));
  const avgTurns = avg(runs.map((r) => r.turnsPlayed));

  const localEndings: Record<string, number> = {};
  for (const r of runs) {
    localEndings[r.endingId] = (localEndings[r.endingId] ?? 0) + 1;
    endingCounts[r.endingId] = (endingCounts[r.endingId] ?? 0) + 1;
  }

  console.log(`\n--- ${character.name} (${character.id}) ---`);
  console.log(`  Game over precoce: ${earlyCount}/${runs.length} (${pct(earlyCount, runs.length)})`);
  console.log(`  Dia médio / turnos médios jogados: ${avgSurvivedDay.toFixed(1)} / ${avgTurns.toFixed(1)} (de 21 turnos totais)`);
  console.log(`  Recursos finais médios -> money:${avgMoney.toFixed(1)} energy:${avgEnergy.toFixed(1)} mental:${avgMental.toFixed(1)}`);
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
