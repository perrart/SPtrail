import type { Transport } from '../types';

export const TRANSPORTS: Transport[] = [
  {
    id: 'metro',
    name: 'Metrô',
    emoji: '🚇',
    description: 'Barato e rápido, quando não está lotado ou parado.',
    moneyCost: 5,
    energyCost: 3,
    tags: ['lotacao', 'atraso', 'social', 'barato'],
  },
  {
    id: 'onibus',
    name: 'Ônibus',
    emoji: '🚌',
    description: 'Muito barato, muito lento, muito sujeito ao trânsito paulistano.',
    moneyCost: 3,
    energyCost: 5,
    tags: ['transito', 'atraso', 'barato', 'social'],
  },
  {
    id: 'uber',
    name: 'Uber',
    emoji: '🚗',
    description: 'Confortável, caro, e sempre com uma tarifa dinâmica esperando por você.',
    moneyCost: 18,
    energyCost: 1,
    tags: ['caro', 'conforto', 'tarifa_dinamica'],
  },
  {
    id: 'bike',
    name: 'Bicicleta',
    emoji: '🚲',
    description: 'De graça, mas a cidade cobra o preço em suor e em risco.',
    moneyCost: 0,
    energyCost: 8,
    tags: ['energia', 'acidente', 'saudavel', 'gratis'],
  },
];
