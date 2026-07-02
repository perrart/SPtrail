import { c, ev } from './helpers';
import type { GameEvent } from '../../types';
import { GENERIC_BRAS_EVENTS } from './generic-bras';
import { GENERIC_FARIALIMA_EVENTS } from './generic-farialima';

// Eventos que podem acontecer em QUALQUER bairro — completam o sorteio
// junto com os eventos exclusivos de cada bairro, para que os 20 bairros
// tenham densidade de conteúdo sem precisar de dezenas de eventos únicos cada.
const NEW_GENERIC_EVENTS: GameEvent[] = [
  ev(
    'generic-chuva-repentina',
    'generic',
    'Chuva de verão pega todo mundo desprevenido',
    'O céu escurece em cinco minutos e a cidade inteira vira um caos de guarda-chuvas de camelô.',
    [
      c('guarda-chuva', 'Comprar um guarda-chuva de camelô na hora', { money: -12 },
        'Resolveu na correria, mas ao menos ficou seco.', { variance: 2 }),
      c('abrigar', 'Se abrigar num beiral até passar', { energy: -6, mental: -3 },
        'Perdeu um tempo, mas não gastou nada.', { variance: 3 }),
      c('encarar', 'Encarar a chuva e seguir andando', { mental: -8, energy: -4 },
        'Chegou pingando no próximo compromisso.', {
          variance: 3,
          unluckyChance: 0.25,
          unluckyPenalty: { mental: -6 },
          unluckyText: 'E ainda gripou um pouco no dia seguinte.',
        }),
    ],
    { weight: 8 }
  ),
  ev(
    'generic-carteira-achada',
    'generic',
    'Você encontra uma carteira caída na calçada',
    'Tem dinheiro, documento e um cartão de crédito lá dentro. Ninguém por perto parece ter notado.',
    [
      c('devolver', 'Tentar devolver pelo documento', { reputation: 8, energy: -4 },
        'Achou o dono numa rede social e devolveu tudo. Ele ficou muito grato.', {
          variance: 2,
          luckyChance: 0.3,
          luckyBonus: { money: 20, contacts: 5 },
          luckyText: 'Como agradecimento, ele te pagou uma recompensa e trocou contato.',
        }),
      c('entregar-policia', 'Entregar numa delegacia próxima', { energy: -8, mental: 3 },
        'Ficou de consciência tranquila, mesmo perdendo a manhã com burocracia.', { variance: 2 }),
      c('ficar-dinheiro', 'Ficar só com o dinheiro e jogar o resto fora', { money: 30, mental: -12 },
        'O bolso agradeceu, a consciência cobrou a conta depois.', {
          variance: 5,
          unluckyChance: 0.2,
          unluckyPenalty: { reputation: -10 },
          unluckyText: 'Alguém viu você mexendo na carteira e comentou por aí.',
        }),
    ],
    { weight: 6 }
  ),
  ev(
    'generic-conexao-lenta',
    'generic',
    'O wi-fi público está uma tragédia',
    'Você precisava resolver algo urgente online e a conexão do bairro parece ter voltado pro dial-up.',
    [
      c('dados-moveis', 'Usar seus próprios dados móveis', { money: -8 },
        'Resolveu rápido, mas o pacote de internet vai sofrer no fim do mês.', { variance: 2 }),
      c('procurar-cafe', 'Procurar um café com wi-fi decente', { money: -10, energy: -4 },
        'Achou um lugar tranquilo, tomou um café e resolveu tudo com calma.', { variance: 2 }),
      c('esperar', 'Esperar melhorar sozinho', { mental: -6 },
        'Perdeu a paciência antes da conexão voltar ao normal.', { variance: 3 }),
    ],
    { weight: 6 }
  ),
  ev(
    'generic-conhecido-antigo',
    'generic',
    'Você esbarra com um conhecido de outros tempos',
    'Alguém que você não via há tempos te reconhece no meio da rua e puxa conversa.',
    [
      c('trocar-contato', 'Trocar contato e marcar de se ver depois', { contacts: 10, energy: -3 },
        'Pode ser só educação, pode ser uma porta se abrindo.', {
          variance: 2,
          luckyChance: 0.2,
          luckyBonus: { contacts: 8, reputation: 4 },
          luckyText: 'Essa pessoa conhece muita gente — e falou bem de você por aí.',
        }),
      c('conversa-rapida', 'Conversar rapidamente e seguir', { mental: 3 },
        'Foi uma pausa boa no meio da correria do dia.', { variance: 2 }),
      c('evitar', 'Fingir que não viu e seguir andando', { mental: -4 },
        'Evitou o papo, mas ficou remoendo se foi falta de educação.', { variance: 2 }),
    ],
    { weight: 5 }
  ),
  ev(
    'generic-fiscalizacao-transporte',
    'generic',
    'Fiscalização no transporte público',
    'Um blitz de fiscalização para os passageiros para checar passagem e documentos.',
    [
      c('esperar-fila', 'Esperar a fila andar normalmente', { energy: -4, mental: -3 },
        'Perdeu tempo, mas não teve problema nenhum.', { variance: 2 }),
      c('caminho-alternativo', 'Sair e procurar um caminho alternativo', { money: -10, energy: -6 },
        'Gastou mais pra evitar a demora, mas chegou sem estresse extra.', { variance: 3 }),
      c('reclamar', 'Reclamar da demora com a fiscalização', { mental: -6 },
        'Discutir não adiantou muita coisa, só consumiu paciência.', {
          variance: 3,
          unluckyChance: 0.2,
          unluckyPenalty: { reputation: -5 },
          unluckyText: 'Um fiscal anotou seu nome só por chatice.',
        }),
    ],
    { weight: 5, compatibleTransports: ['metro', 'onibus'] }
  ),
  ev(
    'generic-oportunidade-bico',
    'generic',
    'Bico de última hora aparece num grupo de WhatsApp',
    'Alguém posta uma vaga urgente de meio período pagando na hora, perto de onde você está.',
    [
      c('aceitar', 'Topar o bico na hora', { money: 22, energy: -12 },
        'Trabalho puxado, mas o dinheiro caiu na conta ainda hoje.', { variance: 5 }),
      c('avaliar', 'Perguntar mais detalhes antes de decidir', { mental: 2 },
        'No fim, o bico já tinha sido preenchido por outra pessoa mais rápida.', { variance: 2 }),
      c('ignorar', 'Ignorar e seguir seu dia normal', {}, 'Preferiu manter o plano original.', {
        variance: 1,
      }),
    ],
    { weight: 7 }
  ),
  ev(
    'generic-assedio-rua',
    'generic',
    'Uma cantada inconveniente na rua',
    'Alguém insiste em puxar assunto de um jeito que passa longe de ser gentil.',
    [
      c('ignorar-seguir', 'Ignorar completamente e seguir andando', { mental: -4 },
        'Não valeu a pena gastar energia respondendo.', { variance: 2 }),
      c('responder-firme', 'Responder firme e cortar o papo', { mental: -2, reputation: 2 },
        'Deixou claro que não era bem-vindo e seguiu em frente.', { variance: 2 }),
      c('mudar-caminho', 'Atravessar a rua para evitar a situação', { energy: -3, mental: -3 },
        'Preferiu não arriscar e desviou do caminho original.', { variance: 2 }),
    ],
    { weight: 5 }
  ),
];

export const GENERIC_EVENTS: GameEvent[] = [
  ...GENERIC_BRAS_EVENTS,
  ...GENERIC_FARIALIMA_EVENTS,
  ...NEW_GENERIC_EVENTS,
];
