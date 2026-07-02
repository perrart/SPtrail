import { c, ev } from './helpers';
import type { GameEvent } from '../../types';

export const ZONA_NORTE_EVENTS: GameEvent[] = [
  // ------------------------------------------------------------------ Santana
  ev(
    'santana-liquidacao-loja',
    'santana',
    'Liquidação relâmpago numa loja de departamento',
    'A loja tradicional do bairro está com liquidação de troca de coleção, filas na porta.',
    [
      c('aproveitar', 'Entrar na fila e aproveitar', { money: -20, mental: 6 },
        'Comprou coisas que precisava por um preço bom.', { variance: 4 }),
      c('so-olhar', 'Só dar uma olhada sem comprar nada', { mental: 3 },
        'Passeou, olhou preços, saiu sem gastar.', { variance: 2 }),
      c('trabalho-temporario', 'Perguntar se precisam de ajuda temporária no caixa', { money: 15, energy: -10 },
        'Ajudou no movimento da liquidação e ainda ganhou uma diária.', { variance: 3 }),
    ],
    { weight: 9 }
  ),
  ev(
    'santana-transito-caotico',
    'santana',
    'Trânsito trava tudo na avenida principal',
    'Um acidente mais cedo deixou o trânsito de Santana parado por quarteirões.',
    [
      c('caminhar', 'Descer e seguir a pé o resto do caminho', { energy: -10 },
        'Chegou suado, mas no horário.', { variance: 2 }),
      c('esperar', 'Esperar o trânsito desafogar', { mental: -6 },
        'Perdeu tempo precioso parado no mesmo lugar.', { variance: 3 }),
      c('app-transito', 'Usar um app pra achar rota alternativa', { money: -5, energy: -3 },
        'Desviou por ruas menores e ganhou tempo.', { variance: 2 }),
    ],
    { weight: 8 }
  ),

  // ----------------------------------------------------------------- Tucuruvi
  ev(
    'tucuruvi-fim-de-linha',
    'tucuruvi',
    'Metrô lotado no fim de linha',
    'Todo mundo quer embarcar ao mesmo tempo na estação, e o vagão já sai cheio.',
    [
      c('espremer', 'Se espremer e entrar assim mesmo', { energy: -8, mental: -4 },
        'Foi incômodo, mas chegou no horário certo.', { variance: 3 }),
      c('esperar-proximo', 'Esperar o próximo trem, menos cheio', { energy: -2 },
        'Perdeu uns minutos, mas viajou com mais conforto.', { variance: 2 }),
      c('conversar-desconhecido', 'Puxar conversa com quem está do lado', { contacts: 5, mental: 3 },
        'Foi uma conversa boa pra distrair da lotação.', { variance: 2 }),
    ],
    { weight: 8 }
  ),
  ev(
    'tucuruvi-feira-bairro',
    'tucuruvi',
    'Feira de bairro no fim de semana',
    'Barracas de comida, roupa e artesanato tomam a rua principal perto da estação.',
    [
      c('comer', 'Parar pra comer algo na feira', { money: -10, mental: 5 },
        'Comida boa e barata ajudou a recarregar o ânimo.', { variance: 2 }),
      c('vender', 'Perguntar se pode montar uma barraquinha improvisada', { money: 18, energy: -10 },
        'Vendeu umas coisas que já não usava mais e ainda lucrou.', { variance: 4 }),
      c('passar-direto', 'Passar direto sem parar', {}, 'Sem tempo pra feira hoje.', {
        variance: 1,
      }),
    ],
    { weight: 6 }
  ),

  // -------------------------------------------------------------- Brasilândia
  ev(
    'brasilandia-ladeira',
    'brasilandia',
    'A ladeira de sempre está sem transporte',
    'A perua que sobe a ladeira quebrou hoje e a fila de gente esperando outra alternativa é grande.',
    [
      c('subir-a-pe', 'Subir a ladeira a pé mesmo', { energy: -14 },
        'Chegou cansado, mas sem gastar nada.', { variance: 3 }),
      c('carona', 'Pedir carona com um vizinho', { contacts: 4, energy: -4 },
        'A vizinhança se ajuda — conseguiu carona rapidinho.', { variance: 2 }),
      c('moto-taxi', 'Pagar um mototáxi informal', { money: -8, energy: -2 },
        'Mais rápido e menos cansativo, por um preço justo.', { variance: 2 }),
    ],
    { weight: 9 }
  ),
  ev(
    'brasilandia-mutirao',
    'brasilandia',
    'Mutirão comunitário no bairro',
    'Moradores organizam um mutirão para limpar um terreno baldio e transformar numa horta coletiva.',
    [
      c('ajudar', 'Ajudar no mutirão', { contacts: 10, mental: 8, energy: -10 },
        'Fez parte de algo bom pro bairro e ganhou respeito da vizinhança.', { variance: 3 }),
      c('doar', 'Doar algum material em vez de trabalhar', { money: -10, reputation: 5 },
        'Contribuiu à sua maneira, sem gastar energia física.', { variance: 2 }),
      c('nao-participar', 'Não participar dessa vez', {}, 'Preferiu cuidar da própria vida hoje.', {
        variance: 1,
      }),
    ],
    { weight: 6 }
  ),

  // ------------------------------------------------------------------ Vila Maria
  ev(
    'vilamaria-galpao-antigo',
    'vila-maria',
    'Galpão antigo contrata para bico de organização',
    'Uma pequena indústria da região precisa de mão de obra extra por um dia para organizar estoque.',
    [
      c('trabalhar', 'Aceitar o bico de um dia', { money: 24, energy: -14 },
        'Trabalho puxado, mas pagou bem pelo dia inteiro.', { variance: 4 }),
      c('recusar', 'Recusar por ser trabalho braçal demais', {}, 'Preferiu poupar o corpo.', {
        variance: 1,
      }),
      c('negociar-meio-periodo', 'Negociar fazer só meio período', { money: 12, energy: -6 },
        'Conseguiu um meio-termo razoável.', { variance: 2 }),
    ],
    { weight: 8 }
  ),
  ev(
    'vilamaria-marginal',
    'vila-maria',
    'Atalho pela Marginal Tietê',
    'Alguém sugere um atalho por baixo do viaduto pra economizar tempo, mas a área é deserta.',
    [
      c('atalho', 'Arriscar o atalho', { energy: -4 },
        'Economizou tempo e chegou bem mais rápido.', {
          variance: 2,
          unluckyChance: 0.2,
          unluckyPenalty: { mental: -10, money: -15 },
          unluckyText: 'Foi abordado no meio do caminho e perdeu algum dinheiro do bolso.',
        }),
      c('caminho-normal', 'Seguir pelo caminho normal, mais longo', { energy: -8 },
        'Demorou mais, mas sem sustos.', { variance: 2 }),
      c('transporte-app', 'Chamar um transporte por app pra esse trecho', { money: -12 },
        'Preferiu pagar pela segurança.', { variance: 2 }),
    ],
    { weight: 6 }
  ),
];
