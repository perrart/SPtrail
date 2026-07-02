import { DISTRICT_EVENTS, GENERIC_EVENTS } from './src/data/events';
import type { EventChoice, Resources } from './src/types';

const neutral: Resources = { money: 50, energy: 50, mental: 50, contacts: 50, reputation: 50 };

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

function analyze(name: string, events: typeof DISTRICT_EVENTS) {
  let moneySum = 0;
  let energySum = 0;
  let mentalSum = 0;
  for (const ev of events) {
    const c = bestChoice(ev.choices, neutral);
    moneySum += c.base.money ?? 0;
    energySum += c.base.energy ?? 0;
    mentalSum += c.base.mental ?? 0;
  }
  console.log(
    `${name}: n=${events.length} avgMoney(bestChoice)=${(moneySum / events.length).toFixed(2)} avgEnergy=${(energySum / events.length).toFixed(2)} avgMental=${(mentalSum / events.length).toFixed(2)}`
  );
}

analyze('DISTRICT_EVENTS (todos)', DISTRICT_EVENTS);
analyze('GENERIC_EVENTS (todos)', GENERIC_EVENTS);

// separar por bairro
const byDistrict: Record<string, typeof DISTRICT_EVENTS> = {};
for (const ev of DISTRICT_EVENTS) {
  (byDistrict[ev.districtId] ??= []).push(ev);
}
console.log('\nPor bairro:');
for (const [id, evs] of Object.entries(byDistrict)) {
  analyze(`  ${id}`, evs);
}

// custo médio de transporte
import { TRANSPORTS } from './src/data/transports';
const avgTransportMoney = TRANSPORTS.reduce((s, t) => s + t.moneyCost, 0) / TRANSPORTS.length;
const avgTransportEnergy = TRANSPORTS.reduce((s, t) => s + t.energyCost, 0) / TRANSPORTS.length;
console.log(`\nTransporte médio: money=-${avgTransportMoney.toFixed(1)} energy=-${avgTransportEnergy.toFixed(1)}`);
console.log('Transporte "bike" (grátis): money=0 energy=-8');
