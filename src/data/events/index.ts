import { CENTRO_EVENTS } from './centro';
import { LIBERDADE_EVENTS } from './liberdade';
import { BRAS_EVENTS } from './bras';
import { PINHEIROS_EVENTS } from './pinheiros';
import { FARIA_LIMA_EVENTS } from './farialima';
import { ITAQUERA_EVENTS } from './itaquera';
import { MOOCA_EVENTS } from './mooca';
import type { GameEvent } from '../../types';

export const ALL_EVENTS: GameEvent[] = [
  ...CENTRO_EVENTS,
  ...LIBERDADE_EVENTS,
  ...BRAS_EVENTS,
  ...PINHEIROS_EVENTS,
  ...FARIA_LIMA_EVENTS,
  ...ITAQUERA_EVENTS,
  ...MOOCA_EVENTS,
];

export const EVENTS_BY_ID: Record<string, GameEvent> = Object.fromEntries(
  ALL_EVENTS.map((e) => [e.id, e])
);

export function eventsForDistrict(districtId: string): GameEvent[] {
  return ALL_EVENTS.filter((e) => e.districtId === districtId && !e.isBonus);
}
