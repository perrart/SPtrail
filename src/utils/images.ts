import type { District, Period } from '../types';
import { ZONE_IMAGE_PREFIX } from '../types';

const BASE = import.meta.env.BASE_URL ?? '/';

/** Manhã e Tarde usam a imagem DIA; Noite usa a imagem NOITE. */
export function periodIsNight(period: Period): boolean {
  return period === 'Noite';
}

export function districtImagePath(district: District, period: Period): string {
  const prefix = ZONE_IMAGE_PREFIX[district.zone];
  const suffix = periodIsNight(period) ? 'NOITE' : 'DIA';
  return `${BASE}IMGS/${prefix}_${district.imageKey}_${suffix}.png`;
}

export function personaImagePath(imageKey: string): string {
  return `${BASE}IMGS/PERSONA_${imageKey}.png`;
}
