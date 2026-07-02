import { c, ev } from './helpers';
import type { GameEvent } from '../../types';

export const LIBERDADE_EVENTS: GameEvent[] = [
  ev(
    'liberdade-festival',
    'liberdade',
    'Festival na Liberdade',
    'A praça está tomada por barracas, comida de rua e uma apresentação de taiko que ecoa pelas lanternas vermelhas.',
    [
      c('curtir', 'Aproveitar o festival', { mental: 10, energy: -6, money: -10 },
        'Comeu bem, viu uma apresentação incrível e esqueceu por um instante os boletos.', { variance: 4 }),
      c('trabalhar-evento', 'Oferecer ajuda numa das barracas', { money: 12, energy: -8 },
        'Vendeu lámen por algumas horas e ainda ganhou um prato de cortesia.', { variance: 4 }),
      c('so-passar', 'Só passar batido, sem tempo para festa', { mental: -2 },
        'Viu tudo de relance, meio arrependido de não ter parado.', { variance: 2 }),
    ],
    { weight: 10 }
  ),

  ev(
    'liberdade-feira-domingo',
    'liberdade',
    'Feira de domingo lotada',
    'Barracas de comida, artesanato e roupas tomam as ruas. É difícil andar sem esbarrar em alguém.',
    [
      c('comprar-comida', 'Experimentar comidas típicas', { money: -12, mental: 6 },
        'Comeu coisas que nem sabia pronunciar o nome. Valeu cada centavo.', { variance: 3 }),
      c('trabalhar-feira', 'Ajudar um feirante a organizar a barraca', { money: 10, contacts: 5 },
        'Ganhou uma grana e um convite para voltar sempre que precisar.', { variance: 4 }),
      c('so-passear', 'Só passear e observar', { mental: 4 },
        'Uma tarde tranquila no meio do turbilhão paulistano.', { variance: 2 }),
    ],
    { weight: 10, compatibleTransports: ['metro', 'onibus', 'bike'] }
  ),

  ev(
    'liberdade-curso-rapido',
    'liberdade',
    'Curso relâmpago de caligrafia japonesa',
    'Um pequeno espaço cultural oferece uma oficina gratuita de caligrafia por apenas uma hora.',
    [
      c('participar', 'Participar da oficina', { mental: 8, reputation: 2, energy: -3 },
        'Saiu com um pincel novo e uma paz estranha na cabeça.', { variance: 3 }),
      c('recusar', 'Recusar, sem paciência hoje', {}, 'Passou reto. Talvez outra hora.', { variance: 1 }),
      c('fotografar', 'Só fotografar para postar depois', { reputation: 3, mental: -1 },
        'Conseguiu boas fotos, mesmo sem aprender nada de verdade.', { variance: 2 }),
    ],
    { weight: 7 }
  ),

  ev(
    'liberdade-restaurante-fila',
    'liberdade',
    'Fila enorme num restaurante badalado',
    'Todo mundo fala desse lugar. A fila dá volta no quarteirão e o estômago já ronca.',
    [
      c('esperar', 'Encarar a fila', { energy: -8, mental: -3 },
        'Depois de quarenta minutos, a comida chegou. Valeu a espera.', {
          variance: 4,
          luckyChance: 0.2,
          luckyBonus: { mental: 8 },
          luckyText: 'Um casal ao lado puxou assunto e a espera passou voando.',
        }),
      c('outro-lugar', 'Desistir e comer em outro lugar', { money: -8 },
        'Achou uma opção mais simples duas ruas depois. Resolveu.', { variance: 3 }),
      c('furar-fila', 'Tentar dar um jeitinho para furar a fila', { reputation: -6 },
        'Tentou a sorte, mas todo mundo notou e reclamou alto.', {
          variance: 5,
          luckyChance: 0.15,
          luckyBonus: { reputation: 0, energy: 4 },
          luckyText: 'Um conhecido no local te ajudou a entrar sem ninguém perceber.',
        }),
    ],
    { weight: 8 }
  ),

  ev(
    'liberdade-templo',
    'liberdade',
    'Momento de silêncio num templo budista',
    'No meio do barulho da cidade, um pequeno templo oferece um raro instante de silêncio.',
    [
      c('entrar', 'Entrar e meditar por alguns minutos', { mental: 12, energy: 3 },
        'Saiu mais leve do que entrou. A cidade lá fora parecia menos ameaçadora.', { variance: 3 }),
      c('respeitar-de-fora', 'Respeitar o espaço, mas não entrar', { mental: 2 },
        'Ficou só observando a fachada, sem perturbar ninguém.', { variance: 2 }),
      c('seguir', 'Seguir direto, sem tempo para pausas', { mental: -3 },
        'A correria não deu trégua nem para um respiro.', { variance: 2 }),
    ],
    { weight: 6 }
  ),

  ev(
    'liberdade-cambio-paralelo',
    'liberdade',
    'Casa de câmbio oferece uma "cotação especial"',
    'Alguém te aborda oferecendo trocar dinheiro com uma cotação boa demais para ser verdade.',
    [
      c('recusar', 'Recusar educadamente', {}, 'Boa demais para ser verdade geralmente é.', { variance: 1 }),
      c('negociar', 'Tentar entender a proposta', { mental: -2 },
        'Perdeu um tempo ouvindo, mas identificou a armadilha a tempo.', { variance: 3 }),
      c('aceitar', 'Aceitar a "vantagem"', { money: -20 },
        'Câmbio irregular, dinheiro trocado, arrependimento imediato.', {
          variance: 5,
          luckyChance: 0.1,
          luckyBonus: { money: 20 },
          luckyText: 'Por sorte grande, a transação foi legítima dessa vez.',
        }),
    ],
    { weight: 7 }
  ),

  ev(
    'liberdade-artista-rua',
    'liberdade',
    'Artista de rua faz um retrato seu de graça',
    'Um caricaturista talentoso está treinando o traço e oferece um desenho seu sem custo.',
    [
      c('aceitar', 'Aceitar e posar por alguns minutos', { mental: 6, energy: -2 },
        'Ganhou uma lembrança única do bairro e um sorriso à toa.', { variance: 2 }),
      c('pagar-gorjeta', 'Aceitar e ainda pagar uma gorjeta', { money: -10, contacts: 4 },
        'O artista ficou tão feliz que trocaram contatos para futuras parcerias.', { variance: 3 }),
      c('recusar', 'Recusar, sem tempo para posar', {}, 'Seguiu andando, meio sem graça.', { variance: 1 }),
    ],
    { weight: 6 }
  ),

  ev(
    'liberdade-metro-lotado',
    'liberdade',
    'Estação lotada por causa do festival',
    'A estação Liberdade está cheia de gente saindo do festival ao mesmo tempo que você tenta entrar.',
    [
      c('esperar-proximo', 'Esperar o próximo trem', { energy: -4 },
        'Deixou passar dois trens até caber num com folga.', { variance: 3 }),
      c('entrar-espremido', 'Entrar mesmo espremido', { energy: -8, mental: -4 },
        'Sobreviveu à viagem mais apertada da semana.', { variance: 4 }),
      c('sair-a-pe', 'Desistir e seguir a pé', { energy: -10 },
        'Preferiu andar a virar sardinha em lata.', { variance: 3 }),
    ],
    { weight: 8, compatibleTransports: ['metro'] }
  ),
];
