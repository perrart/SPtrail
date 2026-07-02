import type { Character } from '../types';

export const CHARACTERS: Character[] = [
  {
    id: 'recem-chegado',
    name: 'Recém-chegado',
    emoji: '🎒',
    imageKey: 'RECEM',
    tagline: 'Cheio de energia, ninguém conhece seu nome ainda.',
    description:
      'Desceu do ônibus há três dias com uma mala e uma promessa vaga de emprego. Não conhece os atalhos, mas também não tem vícios paulistanos ainda. Sem emprego fixo — cada turno é uma aposta.',
    modifiers: { energy: 20, contacts: -10 },
  },
  {
    id: 'estudante',
    name: 'Estudante',
    emoji: '📚',
    imageKey: 'ESTUDANTE',
    tagline: 'Bolsa parcial, orgulho integral.',
    description:
      'Trocou o interior por uma vaga na USP, no Butantã. Vive de bolsa parcial de monitoria — pouco, mas ajuda. Precisa estar em aula toda manhã.',
    modifiers: { mental: 15, money: -12 },
    workDistrictId: 'butanta',
    workPeriods: ['Manhã'],
    salaryPerShift: 10,
    workEnergyCost: 6,
    workMentalCost: -3,
    absencePenalty: { mental: -10, reputation: -4 },
  },
  {
    id: 'freelancer',
    name: 'Freelancer',
    emoji: '💻',
    imageKey: 'FREELANCER',
    tagline: 'Chefe de si mesmo, refém do próprio calendário.',
    description:
      'Trabalha de qualquer lugar com wi-fi decente e um café que não custe uma fortuna. Tem nome no mercado, mas o mercado esqueceu de pagar em dia. Sem local fixo de trabalho.',
    modifiers: { reputation: 15, energy: -8, money: 5 },
  },
  {
    id: 'entregador',
    name: 'Entregador de App',
    emoji: '🛵',
    imageKey: 'ENTREGADOR',
    tagline: 'A cidade inteira depende da sua velocidade.',
    description:
      'Conhece cada buraco do asfalto e cada porteiro chato da cidade. O app paga por corrida, a cidade cobra em cansaço. Trabalha em qualquer bairro.',
    modifiers: { money: 25, mental: -15 },
  },
  {
    id: 'motorista',
    name: 'Motorista de App',
    emoji: '🚗',
    imageKey: 'MOTORISTA',
    tagline: 'O carro é seu escritório, o trânsito é seu inimigo.',
    description:
      'Financiou o carro pra rodar por São Paulo inteira. Ganha mais que o entregador, mas o desgaste com o trânsito e a insegurança pesa. Trabalha em qualquer bairro.',
    modifiers: { money: 20, energy: -10, mental: -10 },
  },
  {
    id: 'artista',
    name: 'Artista de Rua',
    emoji: '🎭',
    imageKey: 'ARTISTA',
    tagline: 'Vive de aplausos, contas nem sempre acompanham.',
    description:
      'Faz malabarismo, música ou teatro nos sinais e nas praças. Reputação e contatos sobram, dinheiro é sempre incerto. Trabalha em qualquer bairro.',
    modifiers: { reputation: 20, contacts: 10, money: -8 },
  },
  {
    id: 'estagiario',
    name: 'Estagiário Faria Limer',
    emoji: '🧑‍💼',
    imageKey: 'ESTAGIARIO',
    tagline: 'Crachá plastificado, bolsa-auxílio de estagiário.',
    description:
      'Conseguiu um estágio em Pinheiros, na zona do dinheiro. Currículo bombando, conta bancária nem tanto. Precisa estar no escritório de manhã e à tarde.',
    modifiers: { reputation: 10, contacts: 15, money: -10, mental: -5 },
    workDistrictId: 'pinheiros',
    workPeriods: ['Manhã', 'Tarde'],
    salaryPerShift: 28,
    workEnergyCost: 8,
    workMentalCost: -5,
    absencePenalty: { money: -10, reputation: -10 },
  },
  {
    id: 'callcenter',
    name: 'Operador de Call Center',
    emoji: '🎧',
    imageKey: 'CALL',
    tagline: 'Sua voz, seu script, sua meta do dia.',
    description:
      'Trabalha numa central de atendimento na Sé, no meio do centro. Salário estável, rotina que desgasta a cabeça aos poucos. Turno vespertino e noturno.',
    modifiers: { money: 10, mental: -20 },
    workDistrictId: 'se',
    workPeriods: ['Tarde', 'Noite'],
    salaryPerShift: 26,
    workEnergyCost: 6,
    workMentalCost: -6,
    absencePenalty: { money: -15, reputation: -5 },
  },
];
