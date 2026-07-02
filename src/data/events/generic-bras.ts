import { c, ev } from './helpers';
import type { GameEvent } from '../../types';

export const GENERIC_BRAS_EVENTS: GameEvent[] = [
  ev(
    'bras-liquidacao',
    'generic',
    'Liquidação no Brás',
    'Uma loja de atacado está esvaziando o estoque com descontos absurdos. A fila de compradores já dá volta no quarteirão.',
    [
      c('comprar-revender', 'Comprar peças para revender depois', { money: -25 },
        'Encheu duas sacolas apostando que vai lucrar depois.', {
          variance: 6,
          luckyChance: 0.3,
          luckyBonus: { money: 45 },
          luckyText: 'Revendeu tudo em dois dias com uma margem gorda.',
          unluckyChance: 0.2,
          unluckyPenalty: { money: -10 },
          unluckyText: 'As peças encalharam e você teve que baixar ainda mais o preço.',
        }),
      c('comprar-para-si', 'Comprar só o que precisa usar', { money: -12, mental: 4 },
        'Renovou o guarda-roupa gastando pouco. Sensação boa.', { variance: 3 }),
      c('so-olhar', 'Só olhar, sem comprar nada', { mental: -2 },
        'Resistiu à tentação, mas saiu com aquela pontinha de arrependimento.', { variance: 2 }),
    ],
    { weight: 11 }
  ),

  ev(
    'bras-carga-descarga',
    'generic',
    'Ajudante de carga e descarga por um dia',
    'Um lojista precisa de mão extra para descarregar um caminhão de mercadorias antes do horário de pico.',
    [
      c('ajudar', 'Aceitar ajudar por um bom pagamento', { money: 22, energy: -15 },
        'Suou a camisa, mas o dinheiro caiu na hora.', { variance: 5 }),
      c('recusar', 'Recusar, corpo já está cansado', { energy: 3 },
        'Preservou a energia para o resto do dia.', { variance: 2 }),
      c('indicar-alguem', 'Indicar um conhecido para o serviço', { contacts: 5 },
        'Não ganhou nada, mas fez um favor que pode voltar como network.', { variance: 2 }),
    ],
    { weight: 9, compatibleTransports: ['onibus', 'metro', 'bike'] }
  ),

  ev(
    'bras-nota-fiscal',
    'generic',
    'Vendedor oferece desconto "sem nota"',
    'Uma loja oferece um preço bem menor se a compra for feita sem emitir nota fiscal.',
    [
      c('aceitar', 'Aceitar o combinado', { money: -8 },
        'Economizou uns trocados, mas ficou sem nenhuma garantia sobre o produto.', { variance: 3 }),
      c('recusar', 'Recusar e pagar o preço cheio', { money: -15, reputation: 2 },
        'Preferiu manter tudo em ordem, mesmo pagando mais.', { variance: 2 }),
      c('negociar-nota', 'Negociar desconto mantendo a nota', { money: -10, mental: 2 },
        'Depois de insistir, conseguiu um meio-termo justo.', { variance: 3 }),
    ],
    { weight: 8 }
  ),

  ev(
    'bras-transito-caminhoes',
    'generic',
    'Rua interditada por causa da carga e descarga',
    'Caminhões ocupam a rua inteira descarregando mercadoria. O trânsito trava e a paciência também.',
    [
      c('esperar', 'Esperar liberar a passagem', { energy: -6, mental: -3 },
        'Ficou parado vendo a cena por vinte minutos.', { variance: 3 }),
      c('desviar', 'Desviar por uma rua paralela', { energy: -8 },
        'Andou mais, mas chegou sem perder tanto tempo.', { variance: 3 }),
      c('conversar-motorista', 'Puxar assunto com um dos motoristas', { contacts: 4, mental: 2 },
        'Trocou histórias de estrada e aprendeu um atalho novo.', { variance: 3 }),
    ],
    { weight: 8, compatibleTransports: ['onibus', 'uber', 'bike'] }
  ),

  ev(
    'bras-imigrante-costureira',
    'generic',
    'Costureira imigrante oferece ajuste rápido de roupa',
    'Numa pequena oficina de costura, uma senhora boliviana oferece consertar sua roupa na hora por um preço simbólico.',
    [
      c('aceitar', 'Aceitar o serviço', { money: -6, mental: 3 },
        'A roupa ficou impecável e a conversa foi ainda melhor.', { variance: 2 }),
      c('conversar', 'Só conversar sobre a trajetória dela', { mental: 6, contacts: 3 },
        'Ouviu uma história de migração e recomeço que ficou na memória.', { variance: 3 }),
      c('seguir', 'Agradecer e seguir apressado', {}, 'Sem tempo hoje, mas anotou o endereço mentalmente.', { variance: 1 }),
    ],
    { weight: 7 }
  ),

  ev(
    'bras-fiscalizacao',
    'generic',
    'Fiscalização surpresa no comércio local',
    'Uma blitz de fiscalização fecha temporariamente o quarteirão para vistoria de lojas irregulares.',
    [
      c('esperar-liberar', 'Esperar a fiscalização terminar', { energy: -5, mental: -2 },
        'Ficou parado observando o corre corre dos lojistas.', { variance: 3 }),
      c('ir-embora', 'Desistir e ir embora', { energy: -3 },
        'Preferiu não se meter e resolver aquilo outro dia.', { variance: 2 }),
      c('ajudar-lojista', 'Ajudar um lojista conhecido a organizar as coisas', { contacts: 6, energy: -8 },
        'Rendeu gratidão e uma amizade nova no bairro.', { variance: 3 }),
    ],
    { weight: 6 }
  ),

  ev(
    'bras-achado-tecido',
    'generic',
    'Retalho de tecido raro achado por acaso',
    'Numa pilha de retalhos descartados, você encontra um tecido que parece valer bem mais do que o preço de saldo.',
    [
      c('comprar', 'Comprar o retalho', { money: -8 },
        'Levou por curiosidade, sem saber ainda o que fazer com ele.', {
          variance: 3,
          luckyChance: 0.25,
          luckyBonus: { money: 20 },
          luckyText: 'Um estilista local pagou bem por aquele tecido específico.',
        }),
      c('ignorar', 'Ignorar e seguir andando', {}, 'Só mais um retalho entre tantos outros.', { variance: 1 }),
      c('perguntar-preco', 'Perguntar o preço e regatear', { money: -4, mental: 1 },
        'Conseguiu um desconto extra só de perguntar com jeitinho.', { variance: 2 }),
    ],
    { weight: 6 }
  ),

  ev(
    'bras-calor-galpao',
    'generic',
    'Calor sufocante dentro de um galpão de vendas',
    'O sol bate direto na cobertura de zinco e a temperatura lá dentro parece de outro planeta.',
    [
      c('aguentar', 'Aguentar firme e continuar comprando', { energy: -10, mental: -4 },
        'Saiu suado, mas com as compras resolvidas.', { variance: 4 }),
      c('comprar-agua', 'Parar para comprar água gelada', { money: -5, energy: 4 },
        'Um respiro gelado no meio do forno paulistano.', { variance: 2 }),
      c('sair', 'Desistir e sair para respirar', { energy: 2, mental: 2 },
        'Preferiu a saúde à economia dessa vez.', { variance: 2 }),
    ],
    { weight: 7 }
  ),

  ev(
    'bras-parceria-comercial',
    'generic',
    'Proposta de parceria com pequeno fornecedor',
    'Um fornecedor de confecções propõe uma parceria informal para revenda contínua.',
    [
      c('aceitar', 'Aceitar a parceria', { contacts: 8, reputation: 3, energy: -4 },
        'Fechou um acordo que pode render frutos nas próximas semanas.', { variance: 4 }),
      c('pensar', 'Pedir um tempo para pensar', { mental: 1 },
        'Preferiu não decidir por impulso.', { variance: 2 }),
      c('recusar', 'Recusar de cara', {}, 'Não é hora de assumir mais compromissos.', { variance: 1 }),
    ],
    { weight: 7 }
  ),
];
