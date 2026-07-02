import { c, ev } from './helpers';
import type { GameEvent } from '../../types';

export const PINHEIROS_EVENTS: GameEvent[] = [
  ev(
    'pinheiros-happy-hour',
    'pinheiros',
    'Happy hour inesperado com pessoal da área',
    'Um grupo de conhecidos te chama para um happy hour de última hora num bar lotado.',
    [
      c('ir', 'Ir e aproveitar', { contacts: 10, mental: 6, money: -18, energy: -6 },
        'Boa conversa, boa cerveja, boa rede de contatos. Caro, mas valeu.', { variance: 5 }),
      c('passar-rapido', 'Passar só para cumprimentar', { contacts: 4, money: -6 },
        'Deu um "oi" rápido e seguiu com o resto do plano.', { variance: 3 }),
      c('recusar', 'Recusar o convite', { mental: -2 },
        'Ficou de fora dessa e sentiu um friozinho de FOMO.', { variance: 2 }),
    ],
    { weight: 11 }
  ),

  ev(
    'pinheiros-aluguel-caro',
    'pinheiros',
    'Anúncio de aluguel que parecia bom demais',
    'Um apartamento com preço aparentemente justo pede um depósito antecipado "para garantir a vaga".',
    [
      c('desconfiar', 'Desconfiar e pesquisar mais', { mental: -2 },
        'Encontrou reclamações online. Escapou por pouco de um golpe.', { variance: 3 }),
      c('pagar-deposito', 'Pagar o depósito para garantir', { money: -30 },
        'O anúncio suniu, o dinheiro também.', {
          variance: 5,
          luckyChance: 0.1,
          luckyBonus: { money: 30 },
          luckyText: 'Surpreendentemente, o imóvel era real e o negócio se confirmou.',
        }),
      c('visitar-primeiro', 'Insistir em visitar antes de pagar', { energy: -6 },
        'O "corretor" nunca apareceu para a visita marcada.', { variance: 3 }),
    ],
    { weight: 8 }
  ),

  ev(
    'pinheiros-agencia-freela',
    'pinheiros',
    'Agência de publicidade oferece bico rápido',
    'Uma agência precisa de ajuda urgente com um projeto e paga bem por entrega rápida.',
    [
      c('aceitar', 'Aceitar o prazo apertado', { money: 25, energy: -15, mental: -5 },
        'Entregou no talo do prazo, exausto mas satisfeito com o pagamento.', { variance: 5 }),
      c('negociar-prazo', 'Negociar um prazo mais razoável', { money: 15, mental: 2 },
        'Conseguiu um acordo mais humano, com menos pressa.', { variance: 4 }),
      c('recusar', 'Recusar, sem energia para isso', { energy: 3 },
        'Preferiu preservar a sanidade dessa vez.', { variance: 2 }),
    ],
    { weight: 10 }
  ),

  ev(
    'pinheiros-bar-lotado',
    'pinheiros',
    'Fila para entrar num bar badalado',
    'A fila do bar da moda está enorme e um segurança decide quem entra por "critérios próprios".',
    [
      c('esperar-fila', 'Esperar educadamente na fila', { energy: -6, mental: -2 },
        'Entrou depois de quase uma hora, mas entrou.', { variance: 3 }),
      c('tentar-lista', 'Tentar entrar dizendo que está na lista', { reputation: -3 },
        'O blefe não colou e ainda rendeu um olhar feio do segurança.', {
          variance: 4,
          luckyChance: 0.2,
          luckyBonus: { reputation: 5, energy: 4 },
          luckyText: 'Coincidência: alguém da lista real confirmou seu nome por engano.',
        }),
      c('outro-bar', 'Desistir e ir a outro lugar', { energy: -2 },
        'Achou um lugar mais tranquilo duas quadras depois.', { variance: 2 }),
    ],
    { weight: 8 }
  ),

  ev(
    'pinheiros-coworking',
    'pinheiros',
    'Dia de trabalho num coworking chique',
    'Um coworking badalado oferece um day pass caro, mas com café ilimitado e boa internet.',
    [
      c('pagar-day-pass', 'Pagar pelo day pass', { money: -20, reputation: 3, energy: 5 },
        'Trabalhou produtivo e ainda trocou cartão com dois potenciais clientes.', { variance: 4 }),
      c('trabalhar-cafe', 'Trabalhar num café comum', { money: -8, energy: 2 },
        'Menos chique, mas resolveu o que precisava.', { variance: 3 }),
      c('trabalhar-rua', 'Trabalhar num banco de praça', { energy: -4, mental: -2 },
        'Economizou tudo, mas o notebook quase superaqueceu no sol.', { variance: 3 }),
    ],
    { weight: 8 }
  ),

  ev(
    'pinheiros-aula-experimental',
    'pinheiros',
    'Aula experimental de yoga urbano',
    'Um estúdio boutique oferece uma aula experimental gratuita para atrair novos alunos.',
    [
      c('participar', 'Participar da aula', { mental: 10, energy: -4 },
        'Uma hora de respiração consciente no meio da correria. Precisava disso.', { variance: 3 }),
      c('so-observar', 'Observar da porta, sem entrar', { mental: 2 },
        'Achou bonito, mas não se sentiu à vontade para entrar.', { variance: 2 }),
      c('ignorar', 'Ignorar e seguir', {}, 'Yoga vai ter que esperar outra semana.', { variance: 1 }),
    ],
    { weight: 6 }
  ),

  ev(
    'pinheiros-vazamento-cano',
    'pinheiros',
    'Vazamento de cano alaga a calçada',
    'Um cano estourado transforma a calçada num pequeno rio, pegando pedestres desavisados.',
    [
      c('desviar', 'Desviar pela rua', { energy: -3, mental: -2 },
        'Andou pela rua mesmo, torcendo para nenhum carro passar rápido demais.', { variance: 3 }),
      c('atravessar', 'Atravessar mesmo assim', { mental: -4 },
        'Chegou com os pés molhados e o dia começou torto.', {
          variance: 4,
          unluckyChance: 0.2,
          unluckyPenalty: { mental: -6 },
          unluckyText: 'Um carro passou na poça e completou a molhadela.',
        }),
      c('ajudar-avisar', 'Ajudar a avisar outros pedestres', { contacts: 3, mental: 3 },
        'Virou o "guarda" informal da esquina por alguns minutos.', { variance: 2 }),
    ],
    { weight: 7 }
  ),

  ev(
    'pinheiros-startup-pitch',
    'pinheiros',
    'Convite de última hora para ouvir um pitch de startup',
    'Um conhecido te convida para assistir à apresentação de uma startup em busca de investidores — e talvez de gente boa para contratar.',
    [
      c('ir', 'Ir prestigiar o evento', { contacts: 9, reputation: 4, energy: -5 },
        'Boas conversas, cartões trocados e um contato promissor para o futuro.', { variance: 4 }),
      c('recusar', 'Recusar, sem tempo agora', { mental: -1 },
        'Ficou sabendo depois que rolaram boas oportunidades por lá.', { variance: 2 }),
      c('ir-so-pelo-drink', 'Ir só pelo open bar do evento', { mental: 4, energy: -3 },
        'Aproveitou o open bar e escapou antes das perguntas difíceis.', { variance: 3 }),
    ],
    { weight: 8 }
  ),

  ev(
    'pinheiros-ciclofaixa',
    'pinheiros',
    'Ciclofaixa de domingo fecha a avenida',
    'Aos domingos, a avenida vira um corredor só para pedestres e ciclistas, cheia de gente e bicicletas.',
    [
      c('aproveitar', 'Aproveitar o espaço livre de carros', { mental: 6, energy: -4 },
        'Um raro momento de rua sem buzina em São Paulo.', { variance: 3 }),
      c('evitar', 'Evitar a região por causa do movimento', { energy: -2 },
        'Preferiu contornar todo aquele fluxo de gente e bike.', { variance: 2 }),
      c('vender-algo', 'Aproveitar o movimento para vender algo informal', { money: 12, energy: -6 },
        'A multidão de domingo rendeu uma graninha extra e inesperada.', { variance: 4 }),
    ],
    { weight: 7, compatibleTransports: ['bike'] }
  ),
];
