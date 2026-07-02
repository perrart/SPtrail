// ---------------------------------------------------------------------------
// THE SÃO PAULO TRAIL — tipos centrais do motor de jogo
// ---------------------------------------------------------------------------

export type ResourceKey = 'money' | 'energy' | 'mental' | 'contacts' | 'reputation';

export type Resources = Record<ResourceKey, number>;

export interface Character {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  modifiers: Partial<Resources>;
}

export interface District {
  id: string;
  name: string;
  emoji: string;
  description: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  avgCost: number;
  economicProfile: string;
  opportunities: string[];
  vibe: string;
}

export interface Transport {
  id: string;
  name: string;
  emoji: string;
  description: string;
  moneyCost: number;
  energyCost: number;
  tags: string[];
}

export interface EventChoice {
  id: string;
  label: string;
  base: Partial<Resources>;
  variance: number;
  resultTemplate: string;
  luckyChance?: number;
  luckyBonus?: Partial<Resources>;
  luckyText?: string;
  unluckyChance?: number;
  unluckyPenalty?: Partial<Resources>;
  unluckyText?: string;
  unlockEventId?: string;
  unlockChance?: number;
}

export interface GameEvent {
  id: string;
  districtId: string;
  weight: number;
  compatibleTransports: string[] | 'any';
  title: string;
  description: string;
  choices: [EventChoice, EventChoice, EventChoice];
  isBonus?: boolean; // eventos desbloqueáveis, não sorteados por padrão
}

export type Period = 'Manhã' | 'Tarde' | 'Noite';

export interface TurnRecord {
  day: number;
  period: Period;
  districtId: string;
  transportId: string;
  eventId: string;
  eventTitle: string;
  choiceLabel: string;
  resultText: string;
  delta: Partial<Resources>;
}

export interface Ending {
  id: string;
  title: string;
  emoji: string;
  description: string;
  priority: number;
  condition: (ctx: EndingContext) => boolean;
}

export interface EndingContext {
  resources: Resources;
  turns: TurnRecord[];
  survivedDays: number;
  gameOverEarly: boolean;
  character: Character;
}

export type ScreenId = 'home' | 'character' | 'howToPlay' | 'main' | 'turnResult' | 'end';

export type TurnStep = 'district' | 'transport' | 'event';

export interface GameState {
  screen: ScreenId;
  character: Character | null;
  resources: Resources;
  day: number; // 1..7
  periodIndex: number; // 0,1,2
  turnStep: TurnStep;
  currentDistrictId: string | null;
  currentTransportId: string | null;
  currentEvent: GameEvent | null;
  turnHistory: TurnRecord[];
  unlockedEventIds: string[];
  gameOverEarly: boolean;
  endingId: string | null;
  lastTurn: TurnRecord | null;
}

export const RESOURCE_META: Record<
  ResourceKey,
  { label: string; icon: string; lethal: boolean }
> = {
  money: { label: 'Dinheiro', icon: '💰', lethal: true },
  energy: { label: 'Energia', icon: '⚡', lethal: true },
  mental: { label: 'Saúde Mental', icon: '🧠', lethal: true },
  contacts: { label: 'Contatos', icon: '🤝', lethal: false },
  reputation: { label: 'Reputação', icon: '⭐', lethal: false },
};

export const TOTAL_TURNS = 21;
export const PERIODS: Period[] = ['Manhã', 'Tarde', 'Noite'];
