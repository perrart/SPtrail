// ---------------------------------------------------------------------------
// THE SÃO PAULO TRAIL — tipos centrais do motor de jogo
// ---------------------------------------------------------------------------

export type ResourceKey = 'money' | 'energy' | 'mental' | 'contacts' | 'reputation';

export type Resources = Record<ResourceKey, number>;

export type Zone = 'Centro' | 'Norte' | 'Sul' | 'Leste' | 'Oeste';

// Prefixo usado nos arquivos de imagem dos bairros: Z{prefixo}_{imageKey}_{DIA|NOITE}.png
export const ZONE_IMAGE_PREFIX: Record<Zone, string> = {
  Centro: 'ZC',
  Norte: 'ZN',
  Sul: 'ZS',
  Leste: 'ZL',
  Oeste: 'ZO',
};

export interface Character {
  id: string;
  name: string;
  emoji: string;
  /** Corresponde ao arquivo PERSONA_{imageKey}.png */
  imageKey: string;
  tagline: string;
  description: string;
  modifiers: Partial<Resources>;
  /** Bairro fixo de trabalho/estudo (id de District). Undefined = trabalho flexível, sem local fixo. */
  workDistrictId?: string;
  /** Períodos em que esse personagem precisa estar no workDistrictId. */
  workPeriods?: Period[];
  /** Dinheiro ganho por período trabalhado. */
  salaryPerShift?: number;
  /** Custo de energia/saúde mental de um turno de trabalho. */
  workEnergyCost?: number;
  workMentalCost?: number;
  /** Penalidade aplicada se o personagem faltar a um período de trabalho obrigatório. */
  absencePenalty?: Partial<Resources>;
}

export interface District {
  id: string;
  name: string;
  zone: Zone;
  /** Corresponde ao token nos arquivos Z{prefixo}_{imageKey}_DIA|NOITE.png */
  imageKey: string;
  emoji: string;
  description: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  avgCost: number;
  /** Aluguel semanal cobrado no meio da semana caso o jogador more aqui. */
  rent: number;
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
  isWork?: boolean;
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

export type ScreenId =
  | 'home'
  | 'character'
  | 'residence'
  | 'howToPlay'
  | 'main'
  | 'turnResult'
  | 'end';

export type TurnStep = 'district' | 'transport' | 'event';

export interface GameState {
  screen: ScreenId;
  character: Character | null;
  homeDistrictId: string | null;
  resources: Resources;
  day: number; // 1..7
  periodIndex: number; // 0,1,2
  turnStep: TurnStep;
  /** As 8 opções de bairro sorteadas para o turno atual (mais o trabalho fixo, se houver). */
  currentOptions: string[];
  currentDistrictId: string | null;
  currentTransportId: string | null;
  currentEvent: GameEvent | null;
  isWorkTurn: boolean;
  turnHistory: TurnRecord[];
  unlockedEventIds: string[];
  rentCharged: boolean;
  gameOverEarly: boolean;
  endingId: string | null;
  lastTurn: TurnRecord | null;
  /** Avisos do sistema (aluguel cobrado, falta ao trabalho, etc.) mostrados no topo do turno seguinte. */
  notices: string[];
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
