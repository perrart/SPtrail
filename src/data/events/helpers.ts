import type { EventChoice, GameEvent, Resources } from '../../types';

export function c(
  id: string,
  label: string,
  base: Partial<Resources>,
  resultTemplate: string,
  opts: Partial<
    Pick<
      EventChoice,
      | 'variance'
      | 'luckyChance'
      | 'luckyBonus'
      | 'luckyText'
      | 'unluckyChance'
      | 'unluckyPenalty'
      | 'unluckyText'
      | 'unlockEventId'
      | 'unlockChance'
    >
  > = {}
): EventChoice {
  return {
    id,
    label,
    base,
    variance: opts.variance ?? 4,
    resultTemplate,
    ...opts,
  };
}

export function ev(
  id: string,
  districtId: string,
  title: string,
  description: string,
  choices: [EventChoice, EventChoice, EventChoice],
  opts: Partial<Pick<GameEvent, 'weight' | 'compatibleTransports' | 'isBonus'>> = {}
): GameEvent {
  return {
    id,
    districtId,
    title,
    description,
    choices,
    weight: opts.weight ?? 10,
    compatibleTransports: opts.compatibleTransports ?? 'any',
    isBonus: opts.isBonus ?? false,
  };
}
