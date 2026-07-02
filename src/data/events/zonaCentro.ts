import { c, ev } from './helpers';
import type { GameEvent } from '../../types';

export const ZONA_CENTRO_EVENTS: GameEvent[] = [
  // --------------------------------------------------------------- República
  ev(
    'republica-camelo-eletronico',
    'republica',
    'Camelô vende celular "novo" suspeito de barato',
    'Na praça, um vendedor jura que o smartphone lacrado é original e está com defeito de fábrica.',
    [
      c('comprar', 'Arriscar e comprar', { money: -40 },
        'Chegou em casa e o aparelho nem ligava direito.', {
          variance: 8,
          luckyChance: 0.15,
          luckyBonus: { money: 60 },
          luckyText: 'Surpresa: era bom mesmo, e ainda deu pra revender com lucro.',
        }),
      c('regatear', 'Regatear o preço e desconfiar', { mental: -2 },
        'Não fechou negócio, mas aprendeu a reconhecer o discurso de venda.', { variance: 2 }),
      c('ignorar', 'Ignorar e seguir andando', {}, 'Melhor não arriscar o dinheiro suado.', {
        variance: 1,
      }),
    ],
    { weight: 10 }
  ),
  ev(
    'republica-roda-de-samba',
    'republica',
    'Roda de samba improvisada na praça',
    'Um grupo começa a tocar samba de raiz e junta gente de todo tipo ao redor.',
    [
      c('entrar', 'Entrar na roda e curtir', { mental: 10, contacts: 6 },
        'Fez amizade com gente completamente diferente da sua rotina.', { variance: 3 }),
      c('assistir', 'Assistir de longe, sem se misturar', { mental: 5 },
        'Curtiu a música sem se comprometer com nada.', { variance: 2 }),
      c('seguir', 'Seguir direto pro seu compromisso', {}, 'Não tinha tempo pra distração hoje.', {
        variance: 1,
      }),
    ],
    { weight: 8 }
  ),

  // ---------------------------------------------------------------- Sta. Cecília
  ev(
    'stacecilia-aula-particular',
    'sta-cecilia',
    'Uma república de estudantes procura reforço',
    'Um grupo de universitários cola um cartaz pedindo aulas particulares pagas por hora.',
    [
      c('dar-aula', 'Se candidatar e dar a aula', { money: 20, energy: -8 },
        'Explicou bem e ainda ganhou indicação pra outros colegas.', {
          variance: 4,
          luckyChance: 0.2,
          luckyBonus: { contacts: 8 },
          luckyText: 'Um dos alunos te apresentou pra um grupo de estudos maior.',
        }),
      c('recusar', 'Recusar, sem tempo disponível', {}, 'Preferiu manter a agenda livre.', {
        variance: 1,
      }),
      c('indicar', 'Indicar um amigo e ganhar uma comissão', { money: 8, contacts: 4 },
        'Não deu a aula, mas ainda saiu ganhando algo.', { variance: 2 }),
    ],
    { weight: 9 }
  ),
  ev(
    'stacecilia-sarau',
    'sta-cecilia',
    'Sarau de poesia num bar da esquina',
    'Um bar pequeno promove um sarau aberto ao público, com microfone livre para quem quiser participar.',
    [
      c('participar', 'Subir no microfone e se arriscar', { reputation: 8, mental: 6 },
        'O público gostou e você saiu com a autoestima lá em cima.', {
          variance: 4,
          unluckyChance: 0.15,
          unluckyPenalty: { mental: -6 },
          unluckyText: 'Travou no meio e ficou remoendo por um tempo.',
        }),
      c('assistir', 'Só assistir e aplaudir', { mental: 4 },
        'Boa noite cultural, sem pressão nenhuma.', { variance: 2 }),
      c('nao-ir', 'Preferir não ir hoje', {}, 'Ficou em casa descansando.', { variance: 1 }),
    ],
    { weight: 7 }
  ),
];
