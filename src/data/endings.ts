import type { Ending } from '../types';

// A ordem de prioridade importa: finais mais específicos/dramáticos são
// avaliados antes dos finais genéricos de "sobrevivência morna".
export const ENDINGS: Ending[] = [
  {
    id: 'burnout',
    title: 'Burnout',
    emoji: '🔥',
    description:
      'Você sobreviveu à semana, mas o corpo cobrou a conta. Energia e saúde mental raspando o fundo do poço — a cidade venceu essa rodada.',
    priority: 100,
    condition: ({ resources, gameOverEarly }) =>
      !gameOverEarly && resources.energy <= 28 && resources.mental <= 28,
  },
  {
    id: 'quebrou',
    title: 'Quebrou Financeiramente',
    emoji: '💸',
    description:
      'A semana acabou, mas o bolso não aguentou. Entre golpes, tarifas dinâmicas e cafés de vinte reais, o dinheiro simplesmente evaporou.',
    priority: 95,
    condition: ({ resources, gameOverEarly }) => !gameOverEarly && resources.money <= 15,
  },
  {
    id: 'voltou-pra-casa',
    title: 'Voltou para Casa',
    emoji: '🚌',
    description:
      'São Paulo é grande demais e você, pequeno demais essa semana. Contatos e reputação baixos, sem rede para segurar a barra. Malas prontas, volta ao ponto de partida.',
    priority: 90,
    condition: ({ resources, gameOverEarly }) =>
      !gameOverEarly && resources.contacts <= 28 && resources.reputation <= 28,
  },
  {
    id: 'lenda-paulistana',
    title: 'Lenda Paulistana',
    emoji: '🏆',
    description:
      'Todo mundo te conhece, todo mundo confia em você e, de alguma forma, ainda sobra dinheiro no fim do mês. Você não sobreviveu a São Paulo — você a conquistou.',
    priority: 85,
    condition: ({ resources, gameOverEarly }) =>
      !gameOverEarly &&
      resources.money >= 75 &&
      resources.reputation >= 75 &&
      resources.contacts >= 75 &&
      resources.mental >= 60,
  },
  {
    id: 'executivo-promissor',
    title: 'Executivo Promissor',
    emoji: '📈',
    description:
      'Terno alinhado, agenda cheia, crachá corporativo plastificado. A Faria Lima te engoliu e devolveu com uma promoção no horizonte.',
    priority: 80,
    condition: ({ resources, gameOverEarly }) =>
      !gameOverEarly && resources.reputation >= 70 && resources.money >= 60,
  },
  {
    id: 'empreendedor',
    title: 'Empreendedor',
    emoji: '🚀',
    description:
      'Sem chefe, sem certeza, mas com uma ideia que começa a dar certo. Sua rede de contatos virou clientela — e clientela virou plano de negócio.',
    priority: 75,
    condition: ({ resources, gameOverEarly }) =>
      !gameOverEarly && resources.contacts >= 70 && resources.reputation >= 55,
  },
  {
    id: 'freelancer-bem-sucedido',
    title: 'Freelancer Bem-Sucedido',
    emoji: '💻',
    description:
      'Sem horário fixo, sem escritório, mas com a agenda cheia de projetos e o dinheiro entrando todo mês. A liberdade compensou o caos.',
    priority: 70,
    condition: ({ resources, gameOverEarly }) =>
      !gameOverEarly && resources.money >= 65 && resources.mental >= 55,
  },
  {
    id: 'influenciador',
    title: 'Influenciador',
    emoji: '📱',
    description:
      'Sua semana virou conteúdo. Sua reputação disparou nas redes, mesmo que sua conta bancária não tenha acompanhado o mesmo ritmo.',
    priority: 65,
    condition: ({ resources, gameOverEarly }) =>
      !gameOverEarly && resources.reputation >= 75 && resources.money < 50,
  },
  {
    id: 'sobrevivente',
    title: 'Sobrevivente Paulistano',
    emoji: '🌆',
    description:
      'Não foi bonito, não foi fácil, mas você chegou ao fim da semana de pé. Isso, por si só, já é uma vitória nessa cidade.',
    priority: 10,
    condition: () => true, // fallback: sempre bate se ninguém mais bater
  },

  // -------- Finais de morte súbita (recurso zerado no meio da semana) --------
  {
    id: 'falido-precoce',
    title: 'Sem Grana, Sem Jogo',
    emoji: '🪙',
    description:
      'O dinheiro acabou no meio da semana. Em São Paulo, sem grana, o jogo termina mais cedo do que se imagina.',
    priority: 200,
    condition: ({ resources, gameOverEarly }) => gameOverEarly && resources.money <= 0,
  },
  {
    id: 'exausto-precoce',
    title: 'Sem Fôlego',
    emoji: '🛌',
    description:
      'O corpo bateu o pé antes do fim da semana. A cidade não perdoa quem esquece de descansar.',
    priority: 195,
    condition: ({ resources, gameOverEarly }) => gameOverEarly && resources.energy <= 0,
  },
  {
    id: 'colapso-mental-precoce',
    title: 'Colapso',
    emoji: '💔',
    description:
      'A cabeça não aguentou a pressão da cidade antes do fim da semana. Às vezes, parar é a única saída que sobra.',
    priority: 190,
    condition: ({ resources, gameOverEarly }) => gameOverEarly && resources.mental <= 0,
  },
];

export function resolveEnding(ctx: Parameters<Ending['condition']>[0]): Ending {
  const sorted = [...ENDINGS].sort((a, b) => b.priority - a.priority);
  for (const ending of sorted) {
    if (ending.condition(ctx)) return ending;
  }
  return ENDINGS[ENDINGS.length - 1];
}
