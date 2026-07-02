import { c, ev } from './helpers';
import type { GameEvent } from '../../types';

export const ZONA_LESTE_EVENTS: GameEvent[] = [
  // ------------------------------------------------------------------ Tatuapé
  ev(
    'tatuape-shopping-emprego',
    'tatuape',
    'Vaga temporária numa loja do shopping',
    'Uma loja de departamento precisa de reforço temporário para o fim de semana de promoção.',
    [
      c('aceitar', 'Aceitar o turno temporário', { money: 20, energy: -10 },
        'Trabalho corrido, mas pagou bem pelo dia.', { variance: 4 }),
      c('recusar', 'Recusar, prefere não trabalhar no fim de semana', {}, 'Guardou o fim de semana pra si.', {
        variance: 1,
      }),
      c('indicar-amigo', 'Indicar um amigo pra vaga', { contacts: 5 },
        'Não ganhou nada direto, mas fez um favor que pode voltar depois.', { variance: 2 }),
    ],
    { weight: 8 }
  ),
  ev(
    'tatuape-happy-hour',
    'tatuape',
    'Happy hour animado num bar de bairro',
    'Colegas de trabalho ou vizinhos organizam um happy hour informal numa sexta-feira.',
    [
      c('ir', 'Ir e socializar', { contacts: 8, mental: 8, money: -20 },
        'Boa noite, boas conversas, e o bolso sentiu um pouco.', { variance: 3 }),
      c('passar-rapido', 'Aparecer rapidinho e ir embora cedo', { contacts: 4, money: -8, mental: 4 },
        'Fez ato de presença sem gastar nem se cansar muito.', { variance: 2 }),
      c('nao-ir', 'Não ir dessa vez', { mental: -2 },
        'Preferiu economizar e descansar em casa.', { variance: 1 }),
    ],
    { weight: 7 }
  ),

  // --------------------------------------------------------------- São Mateus
  ev(
    'saomateus-universidade-publica',
    'sao-mateus',
    'Palestra gratuita na universidade pública local',
    'O campus está com uma semana de eventos abertos ao público, com palestras e oficinas gratuitas.',
    [
      c('participar', 'Participar de uma oficina', { contacts: 8, reputation: 4, energy: -5 },
        'Aprendeu algo novo e ainda conheceu gente da área.', { variance: 3 }),
      c('so-passar', 'Só passar pra ver do que se trata', { contacts: 3 },
        'Deu uma olhada rápida e seguiu seu caminho.', { variance: 2 }),
      c('ignorar', 'Ignorar, sem tempo hoje', {}, 'Tinha outras prioridades.', { variance: 1 }),
    ],
    { weight: 7 }
  ),
  ev(
    'saomateus-entrega-informal',
    'sao-mateus',
    'Vizinho pede ajuda pra fazer uma entrega urgente',
    'Um vizinho com um comércio pequeno precisa que algo seja entregue do outro lado do bairro ainda hoje.',
    [
      c('ajudar', 'Ajudar com a entrega', { money: 14, energy: -8 },
        'Entrega feita, dinheiro no bolso e um vizinho satisfeito.', { variance: 3 }),
      c('recusar', 'Recusar, sem tempo disponível', {}, 'Preferiu manter o próprio ritmo.', {
        variance: 1,
      }),
      c('negociar-preco', 'Negociar um valor maior antes de aceitar', { money: 18, energy: -8 },
        'Conseguiu um valor melhor pelo esforço extra.', { variance: 3 }),
    ],
    { weight: 6 }
  ),
];
