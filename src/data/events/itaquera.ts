import { c, ev } from './helpers';
import type { GameEvent } from '../../types';

export const ITAQUERA_EVENTS: GameEvent[] = [
  ev(
    'itaquera-dia-jogo',
    'itaquera',
    'Dia de jogo na arena esportiva',
    'A cidade inteira parece ter vindo torcer hoje. Vendedores ambulantes se multiplicam nas ruas ao redor.',
    [
      c('vender-algo', 'Aproveitar para vender algo aos torcedores', { money: 20, energy: -10 },
        'A torcida animada comprou tudo rapidinho.', { variance: 5 }),
      c('assistir', 'Aproveitar para assistir ao jogo', { mental: 10, money: -15, energy: -5 },
        'Gritou, comemorou e esqueceu os problemas por duas horas.', { variance: 4 }),
      c('evitar', 'Evitar a região por causa do movimento', { energy: -3 },
        'Preferiu contornar toda aquela multidão animada.', { variance: 2 }),
    ],
    { weight: 10 }
  ),

  ev(
    'itaquera-feira-bairro',
    'itaquera',
    'Feira de bairro tradicional',
    'A feira semanal enche a rua de barracas de frutas, verduras e conversa fiada entre vizinhos.',
    [
      c('comprar', 'Fazer compras da semana', { money: -15, mental: 5 },
        'Voltou com as sacolas cheias e o clima de bairro no peito.', { variance: 3 }),
      c('ajudar-feirante', 'Ajudar um feirante conhecido', { money: 10, contacts: 5 },
        'Trocou favor por uma graninha e mais uma amizade no bairro.', { variance: 3 }),
      c('so-passear', 'Só passear e cumprimentar vizinhos', { contacts: 6, mental: 3 },
        'A sensação de pertencer a algum lugar valeu a manhã inteira.', { variance: 3 }),
    ],
    { weight: 10 }
  ),

  ev(
    'itaquera-trem-atrasado',
    'itaquera',
    'Atraso na linha até o centro',
    'Um problema técnico atrasa os trens e a plataforma vira um mar de gente esperando.',
    [
      c('esperar', 'Esperar pacientemente', { energy: -5, mental: -3 },
        'Chegou atrasado, mas chegou inteiro.', { variance: 3 }),
      c('via-alternativa', 'Buscar um caminho alternativo', { money: -10, energy: -4 },
        'Gastou um pouco mais, mas driblou o atraso.', { variance: 3 }),
      c('conversar-espera', 'Puxar conversa com quem espera junto', { contacts: 4, mental: 3 },
        'A espera rendeu boas risadas com desconhecidos no mesmo barco.', { variance: 3 }),
    ],
    { weight: 9, compatibleTransports: ['metro'] }
  ),

  ev(
    'itaquera-churrasco-vizinhanca',
    'itaquera',
    'Churrasco de vizinhança no fim de semana',
    'Os vizinhos organizam um churrasco coletivo na laje e todo mundo é bem-vindo a contribuir com algo.',
    [
      c('participar', 'Participar levando algo', { money: -8, contacts: 8, mental: 6 },
        'Boas risadas, boa carne e uma sensação rara de comunidade.', { variance: 4 }),
      c('so-cumprimentar', 'Só passar para cumprimentar', { contacts: 3 },
        'Deu um alô rápido e seguiu para resolver outras coisas.', { variance: 2 }),
      c('nao-ir', 'Não ir, sem tempo hoje', { mental: -2 },
        'Ficou sabendo depois que foi um dos melhores churrascos do ano.', { variance: 2 }),
    ],
    { weight: 8 }
  ),

  ev(
    'itaquera-obra-publica',
    'itaquera',
    'Obra pública interdita a calçada há meses',
    'Uma obra que "deveria terminar em 3 meses" já dura mais de um ano e ainda bloqueia a passagem.',
    [
      c('desviar', 'Desviar pela rua sem calçada', { energy: -6, mental: -2 },
        'Andou na beira da rua torcendo para nenhum carro passar perto demais.', { variance: 3 }),
      c('reclamar-app', 'Registrar reclamação num aplicativo da prefeitura', { mental: 2 },
        'Não resolveu nada imediato, mas aliviou a frustração.', { variance: 2 }),
      c('atravessar-obra', 'Atravessar por dentro da obra mesmo', { mental: -4 },
        'Passou correndo entre tapumes e um "cuidado" tarde demais.', {
          variance: 4,
          unluckyChance: 0.2,
          unluckyPenalty: { energy: -6 },
          unluckyText: 'Torceu o pé numa pedra solta e mancou o resto do trajeto.',
        }),
    ],
    { weight: 7 }
  ),

  ev(
    'itaquera-bico-eletricista',
    'itaquera',
    'Vizinho pede ajuda com um conserto elétrico',
    'Um vizinho está com um problema elétrico simples e pergunta se você entende alguma coisa disso.',
    [
      c('ajudar', 'Ajudar com o que sabe', { money: 15, contacts: 4, energy: -6 },
        'Resolveu o problema e ainda ganhou uma grana e um agradecimento caloroso.', { variance: 4 }),
      c('indicar', 'Indicar um profissional de confiança', { contacts: 3 },
        'Não ganhou nada direto, mas o favor rendeu gratidão.', { variance: 2 }),
      c('recusar', 'Recusar, sem tempo hoje', {}, 'Deixou para uma próxima oportunidade.', { variance: 1 }),
    ],
    { weight: 7 }
  ),

  ev(
    'itaquera-fila-banco',
    'itaquera',
    'Fila enorme na única agência bancária da região',
    'A fila do banco dá volta no quarteirão logo cedo, com aposentados e trabalhadores dividindo a espera.',
    [
      c('esperar', 'Encarar a fila', { energy: -8, mental: -4 },
        'Uma hora e meia depois, resolveu o que precisava.', { variance: 4 }),
      c('usar-app', 'Tentar resolver pelo aplicativo', { mental: 2 },
        'Resolveu em cinco minutos, sem pisar na fila.', { variance: 2 }),
      c('desistir', 'Desistir e tentar outro dia', { mental: -3 },
        'Adiou o problema, mas ele ainda vai estar lá amanhã.', { variance: 2 }),
    ],
    { weight: 7 }
  ),

  ev(
    'itaquera-som-alto',
    'itaquera',
    'Som alto na praça atrapalha até pensar',
    'Um evento comunitário improvisado toma a praça com caixas de som gigantes.',
    [
      c('curtir', 'Aproveitar e dançar um pouco', { mental: 6, energy: -4 },
        'Entrou no clima e esqueceu por um instante as contas a pagar.', { variance: 3 }),
      c('sair', 'Sair da região em busca de silêncio', { energy: -3 },
        'Preferiu paz a festa hoje.', { variance: 2 }),
      c('vender-algo', 'Aproveitar o público para vender algo', { money: 12, energy: -6 },
        'A multidão animada rendeu boas vendas rápidas.', { variance: 3 }),
    ],
    { weight: 6 }
  ),
];
