import type { Character } from '../types';

export const CHARACTERS: Character[] = [
  {
    id: 'recem-chegado',
    name: 'Recém-chegado',
    emoji: '🎒',
    tagline: 'Cheio de energia, ninguém conhece seu nome ainda.',
    description:
      'Desceu do ônibus há três dias com uma mala e uma promessa vaga de emprego. Não conhece os atalhos, mas também não tem vícios paulistanos ainda.',
    modifiers: { energy: 20, contacts: -10 },
  },
  {
    id: 'estudante',
    name: 'Estudante',
    emoji: '📚',
    tagline: 'Bolsa parcial, orgulho integral.',
    description:
      'Trocou o interior por uma vaga na universidade e um quarto dividido com mais três pessoas. Sabe economizar, mas o RU não paga o aluguel.',
    modifiers: { mental: 15, money: -20 },
  },
  {
    id: 'freelancer',
    name: 'Freelancer',
    emoji: '💻',
    tagline: 'Chefe de si mesmo, refém do próprio calendário.',
    description:
      'Trabalha de qualquer lugar com wi-fi decente e um café que não custe uma fortuna. Tem nome no mercado, mas o mercado esqueceu de pagar em dia.',
    modifiers: { reputation: 15, energy: -15 },
  },
  {
    id: 'entregador',
    name: 'Entregador',
    emoji: '🛵',
    tagline: 'A cidade inteira depende da sua velocidade.',
    description:
      'Conhece cada buraco do asfalto e cada porteiro chato da cidade. O app paga por corrida, a cidade cobra em cansaço.',
    modifiers: { money: 25, mental: -15 },
  },
];
