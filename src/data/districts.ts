import type { District } from '../types';

export const DISTRICTS: District[] = [
  {
    id: 'centro',
    name: 'Centro',
    emoji: '🏙️',
    description:
      'Oportunidade e caos dividem a mesma calçada. Tudo acontece rápido demais, inclusive os golpes.',
    difficulty: 4,
    avgCost: 35,
    economicProfile: 'Comércio popular, ambulantes, prédios históricos e escritórios decadentes.',
    opportunities: ['bicos rápidos', 'networking de rua', 'achados e compras baratas'],
    vibe: 'caótico',
  },
  {
    id: 'liberdade',
    name: 'Liberdade',
    emoji: '🏮',
    description:
      'Lanternas vermelhas, feira de fim de semana e uma paz meio impostada no meio do vulcão urbano.',
    difficulty: 2,
    avgCost: 25,
    economicProfile: 'Gastronomia asiática, comércio tradicional e turismo de fim de semana.',
    opportunities: ['bicos em feiras', 'gastronomia', 'eventos culturais'],
    vibe: 'sereno por fora',
  },
  {
    id: 'bras',
    name: 'Brás',
    emoji: '🧵',
    description:
      'Capital não-oficial do atacado. Se existe, alguém vende mais barato aqui — a pergunta é a que custo.',
    difficulty: 3,
    avgCost: 20,
    economicProfile: 'Confecções, atacado, imigração histórica e logística pesada.',
    opportunities: ['revenda', 'bicos de carga', 'liquidações'],
    vibe: 'trabalhador',
  },
  {
    id: 'pinheiros',
    name: 'Pinheiros',
    emoji: '🍺',
    description:
      'Bares lotados, agências de publicidade e um aluguel que sobe mais rápido que sua reputação.',
    difficulty: 3,
    avgCost: 45,
    economicProfile: 'Vida noturna, agências criativas, gastronomia elevada.',
    opportunities: ['networking criativo', 'bicos em eventos', 'vida social'],
    vibe: 'hipster',
  },
  {
    id: 'farialima',
    name: 'Faria Lima',
    emoji: '🏦',
    description:
      'Ternos, crachás e um café de vinte reais. Aqui o dinheiro fala mais alto que qualquer curriculo.',
    difficulty: 4,
    avgCost: 60,
    economicProfile: 'Bancos, startups, fundos de investimento e salários que impressionam no papel.',
    opportunities: ['networking corporativo', 'salários altos', 'vagas de tecnologia'],
    vibe: 'concorrido',
  },
  {
    id: 'itaquera',
    name: 'Itaquera',
    emoji: '🚉',
    description:
      'Bairro de gente que acorda cedo. Longe do centro financeiro, perto da vida real da cidade.',
    difficulty: 2,
    avgCost: 15,
    economicProfile: 'Comércio de bairro, arena esportiva e forte presença residencial.',
    opportunities: ['bicos de bairro', 'comércio local', 'eventos no estádio'],
    vibe: 'comunitário',
  },
  {
    id: 'mooca',
    name: 'Mooca',
    emoji: '🍝',
    description:
      'Tradição italiana, cantinas cheias aos domingos e imóveis antigos com histórias entaladas nas paredes.',
    difficulty: 1,
    avgCost: 22,
    economicProfile: 'Pequenas indústrias, comércio de família, cantinas e bares tradicionais.',
    opportunities: ['bicos em cantinas', 'comércio local', 'rede de vizinhança'],
    vibe: 'acolhedor',
  },
];
