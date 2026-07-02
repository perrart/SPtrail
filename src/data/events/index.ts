import { SE_EVENTS } from './se';
import { LIBERDADE_EVENTS } from './liberdade';
import { PINHEIROS_EVENTS } from './pinheiros';
import { ITAQUERA_EVENTS } from './itaquera';
import { MOOCA_EVENTS } from './mooca';
import { ZONA_CENTRO_EVENTS } from './zonaCentro';
import { ZONA_NORTE_EVENTS } from './zonaNorte';
import { ZONA_SUL_EVENTS } from './zonaSul';
import { ZONA_LESTE_EVENTS } from './zonaLeste';
import { ZONA_OESTE_EVENTS } from './zonaOeste';
import { GENERIC_EVENTS } from './generic';
import type { GameEvent } from '../../types';

// Eventos exclusivos de um bairro específico.
export const DISTRICT_EVENTS: GameEvent[] = [
  ...SE_EVENTS,
  ...LIBERDADE_EVENTS,
  ...PINHEIROS_EVENTS,
  ...ITAQUERA_EVENTS,
  ...MOOCA_EVENTS,
  ...ZONA_CENTRO_EVENTS,
  ...ZONA_NORTE_EVENTS,
  ...ZONA_SUL_EVENTS,
  ...ZONA_LESTE_EVENTS,
  ...ZONA_OESTE_EVENTS,
];

// Eventos que podem sortear em qualquer bairro (districtId 'generic').
export { GENERIC_EVENTS };

export const ALL_EVENTS: GameEvent[] = [...DISTRICT_EVENTS, ...GENERIC_EVENTS];

export const EVENTS_BY_ID: Record<string, GameEvent> = Object.fromEntries(
  ALL_EVENTS.map((e) => [e.id, e])
);

/** Eventos exclusivos de um bairro (não inclui os genéricos). */
export function eventsForDistrict(districtId: string): GameEvent[] {
  return DISTRICT_EVENTS.filter((e) => e.districtId === districtId && !e.isBonus);
}
