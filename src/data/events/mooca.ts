import { c, ev } from './helpers';
import type { GameEvent } from '../../types';

export const MOOCA_EVENTS: GameEvent[] = [
  ev(
    'mooca-colega-antigo',
    'mooca',
    'Você encontrou um antigo colega na Mooca',
    'Sentado numa cantina tradicional, um rosto conhecido de anos atrás te reconhece na rua.',
    [
      c('conversar', 'Parar para colocar o papo em dia', { contacts: 8, mental: 6, energy: -3 },
        'Relembraram histórias antigas e trocaram contatos atualizados.', { variance: 4 }),
      c('cafe-rapido', 'Tomar só um café rápido juntos', { contacts: 4, mental: 3 },
        'Um encontro breve, mas de coração cheio.', { variance: 2 }),
      c('so-cumprimentar', 'Só cumprimentar e seguir', { contacts: 1 },
        'Um aceno rápido, sem tempo para mais.', { variance: 1 }),
    ],
    { weight: 10 }
  ),

  ev(
    'mooca-cantina-domingo',
    'mooca',
    'Almoço de domingo numa cantina tradicional',
    'O cheiro de molho de tomate e talharim caseiro toma a rua inteira num domingo típico da Mooca.',
    [
      c('almocar-bem', 'Almoçar à vontade', { money: -25, mental: 10, energy: 5 },
        'Comeu como há tempos não comia. Valeu cada centavo.', { variance: 4 }),
      c('marmita-rapida', 'Pedir algo mais simples e rápido', { money: -10, mental: 4 },
        'Simples, gostoso e no orçamento.', { variance: 2 }),
      c('so-cheirar', 'Só sentir o cheiro e seguir sem gastar', { mental: -3 },
        'A vontade ficou, mas o bolso agradeceu.', { variance: 2 }),
    ],
    { weight: 10 }
  ),

  ev(
    'mooca-imovel-antigo',
    'mooca',
    'Sobrado antigo à venda com história pra contar',
    'Um corretor de bairro comenta sobre um sobrado centenário à venda, cheio de histórias de imigrantes.',
    [
      c('visitar', 'Visitar por curiosidade', { mental: 5, energy: -4 },
        'Andar por aqueles cômodos foi como viajar no tempo.', { variance: 2 }),
      c('perguntar-preco', 'Perguntar o preço só de curiosidade', { mental: -2 },
        'O valor te lembrou que ainda está longe de comprar qualquer imóvel.', { variance: 2 }),
      c('ignorar', 'Ignorar e seguir seu caminho', {}, 'Sonhar com imóvel fica para outra fase da vida.', { variance: 1 }),
    ],
    { weight: 6 }
  ),

  ev(
    'mooca-industria-bico',
    'mooca',
    'Pequena indústria precisa de ajuda temporária',
    'Uma fábrica de pequeno porte oferece um bico de meio período organizando estoque.',
    [
      c('aceitar', 'Aceitar o bico', { money: 18, energy: -12 },
        'Trabalho braçal, mas o pagamento saiu no mesmo dia.', { variance: 4 }),
      c('negociar', 'Negociar um valor melhor', { money: 12, mental: 1 },
        'Conseguiu um acordo justo depois de conversar com o dono.', { variance: 3 }),
      c('recusar', 'Recusar, sem disposição hoje', { energy: 3 },
        'Preferiu guardar energia para outro compromisso.', { variance: 2 }),
    ],
    { weight: 8 }
  ),

  ev(
    'mooca-bar-tradicional',
    'mooca',
    'Bar tradicional com clientes fiéis há décadas',
    'Um bar de esquina, dos que resistem ao tempo, está cheio de frequentadores antigos jogando conversa fora.',
    [
      c('entrar', 'Entrar e puxar assunto', { contacts: 6, mental: 5, money: -8 },
        'Ouviu histórias do bairro que nenhum guia turístico contaria.', { variance: 3 }),
      c('so-passar', 'Só passar em frente', { mental: 1 },
        'Achou o clima acolhedor, mas seguiu seu caminho.', { variance: 1 }),
      c('perguntar-info', 'Só entrar para pedir uma informação', { contacts: 2 },
        'Saiu com a informação e um "volte sempre" sincero.', { variance: 2 }),
    ],
    { weight: 7 }
  ),

  ev(
    'mooca-festa-familia',
    'mooca',
    'Festa de família tradicional na rua',
    'Uma família italiana comemora um aniversário com mesas na calçada e comida sobrando para os vizinhos.',
    [
      c('participar', 'Aceitar o convite espontâneo', { mental: 8, contacts: 5, money: -3 },
        'Foi tratado como parte da família por uma tarde inteira.', { variance: 3 }),
      c('cumprimentar', 'Só parabenizar e seguir', { contacts: 2 },
        'Um gesto pequeno que rendeu um sorriso largo.', { variance: 1 }),
      c('ignorar', 'Ignorar e seguir apressado', {}, 'Passou reto, sem tempo para festa alheia.', { variance: 1 }),
    ],
    { weight: 7 }
  ),

  ev(
    'mooca-vazamento-gas',
    'mooca',
    'Cheiro forte de gás numa rua residencial',
    'Um vazamento leve é detectado por moradores, que se organizam rapidamente para isolar a área.',
    [
      c('ajudar', 'Ajudar a avisar os vizinhos', { contacts: 5, mental: -2 },
        'Fez parte da corrente que evitou um problema maior.', { variance: 3 }),
      c('desviar', 'Desviar da rua e seguir', { energy: -3 },
        'Preferiu não se meter e contornar o quarteirão.', { variance: 2 }),
      c('filmar', 'Parar para filmar a cena', { reputation: -2 },
        'Ficou mais tempo que devia só para gravar um vídeo.', { variance: 2 }),
    ],
    { weight: 5 }
  ),

  ev(
    'mooca-feira-antiguidades',
    'mooca',
    'Feira de antiguidades e velharias',
    'Um bazar de móveis e objetos antigos toma conta da praça, atraindo colecionadores e curiosos.',
    [
      c('garimpar', 'Garimpar algo interessante', { money: -12, mental: 4 },
        'Achou um objeto curioso que virou peça de decoração.', {
          variance: 4,
          luckyChance: 0.2,
          luckyBonus: { money: 25 },
          luckyText: 'Descobriu depois que a peça valia bem mais do que pagou.',
        }),
      c('so-olhar', 'Só passear e olhar', { mental: 3 },
        'Uma tarde agradável sem gastar nada.', { variance: 2 }),
      c('vender-algo', 'Aproveitar para vender algo próprio', { money: 15, energy: -5 },
        'Conseguiu se desfazer de umas coisas e ainda lucrar.', { variance: 3 }),
    ],
    { weight: 7 }
  ),

  ev(
    'mooca-aula-italiano',
    'mooca',
    'Aula gratuita de italiano num centro cultural',
    'Um centro cultural local oferece uma aula introdutória de italiano para descendentes e curiosos.',
    [
      c('participar', 'Participar da aula', { mental: 7, contacts: 4, energy: -3 },
        'Aprendeu frases novas e fez amizade com outros alunos.', { variance: 3 }),
      c('so_observar', 'Só observar de fora', { mental: 1 },
        'Achou interessante, mas não se sentiu parte daquilo ainda.', { variance: 1 }),
      c('ignorar', 'Ignorar e seguir', {}, 'Talvez em outra vida você aprenda italiano.', { variance: 1 }),
    ],
    { weight: 6 }
  ),
];
