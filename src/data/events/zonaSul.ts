import { c, ev } from './helpers';
import type { GameEvent } from '../../types';

export const ZONA_SUL_EVENTS: GameEvent[] = [
  // -------------------------------------------------------------- Santo Amaro
  ev(
    'santoamaro-represa',
    'santo-amaro',
    'Convite pra dar uma volta na represa',
    'Um colega sugere caminhar na beira da represa Guarapiranga pra espairecer no fim do dia.',
    [
      c('caminhar', 'Ir caminhar', { mental: 12, energy: -5 },
        'O ar livre fez muito bem pra cabeça.', { variance: 2 }),
      c('recusar', 'Recusar, tempo é curto', {}, 'Preferiu focar em outras prioridades.', {
        variance: 1,
      }),
      c('correr', 'Aproveitar e fazer uma corrida', { mental: 8, energy: -12 },
        'Cansou o corpo, mas a cabeça agradeceu.', { variance: 3 }),
    ],
    { weight: 7 }
  ),
  ev(
    'santoamaro-shopping-evento',
    'santo-amaro',
    'Evento de contratação num shopping da região',
    'Um shopping local promove um mutirão de vagas de emprego temporário para o fim de semana.',
    [
      c('participar', 'Participar do mutirão de vagas', { money: 15, contacts: 8, energy: -8 },
        'Conseguiu um bico temporário e ainda trocou contatos.', {
          variance: 3,
          luckyChance: 0.15,
          luckyBonus: { reputation: 6 },
          luckyText: 'O recrutador ficou impressionado e guardou seu contato pra depois.',
        }),
      c('so-observar', 'Só circular e observar as oportunidades', { contacts: 3 },
        'Não se candidatou a nada, mas anotou onde procurar depois.', { variance: 2 }),
      c('ignorar', 'Ignorar e seguir seu caminho', {}, 'Não era o momento certo.', { variance: 1 }),
    ],
    { weight: 8 }
  ),

  // ------------------------------------------------------------- Vila Mariana
  ev(
    'vilamariana-consulta-gratuita',
    'vila-mariana',
    'Clínica-escola oferece atendimento gratuito',
    'Uma faculdade de saúde da região oferece consultas gratuitas com estudantes supervisionados.',
    [
      c('agendar', 'Agendar uma consulta', { mental: 10, energy: -4 },
        'Cuidar de si mesmo de vez em quando faz diferença.', { variance: 2 }),
      c('ignorar', 'Ignorar, não tem tempo', { mental: -3 },
        'Deixou pra depois, como sempre.', { variance: 2 }),
      c('indicar', 'Indicar pra um amigo que precisa mais', { contacts: 5, mental: 4 },
        'Ajudar alguém também faz bem.', { variance: 2 }),
    ],
    { weight: 6 }
  ),
  ev(
    'vilamariana-cafe-caro',
    'vila-mariana',
    'Aquele café artesanal charmoso da esquina',
    'O cheiro de café especial invade a rua, mas o preço não é nada popular.',
    [
      c('pagar', 'Pagar e aproveitar o momento', { money: -22, mental: 8 },
        'Caro, mas valeu o gostinho de luxo no meio da semana.', { variance: 2 }),
      c('recusar', 'Recusar e seguir com o café de casa mesmo', { mental: -2 },
        'Economizou, mas ficou com vontade.', { variance: 1 }),
      c('dividir', 'Chamar alguém pra dividir a conta', { money: -10, contacts: 4, mental: 5 },
        'Boa desculpa pra colocar o papo em dia com alguém.', { variance: 2 }),
    ],
    { weight: 6 }
  ),

  // -------------------------------------------------------------- Campo Limpo
  ev(
    'campolimpo-terminal-lotado',
    'campo-limpo',
    'Terminal de ônibus lotado na hora do rush',
    'A fila pro seu ônibus dá volta no quarteirão inteiro e o calor não ajuda.',
    [
      c('esperar-fila', 'Encarar a fila até o fim', { energy: -12, mental: -6 },
        'Demorou, mas conseguiu embarcar.', { variance: 3 }),
      c('linha-alternativa', 'Procurar uma linha alternativa', { money: -5, energy: -4 },
        'Deu uma volta maior, mas evitou a fila enorme.', { variance: 2 }),
      c('vender-agua', 'Aproveitar a fila parada pra vender água gelada', { money: 14, energy: -6 },
        'Enquanto esperava, ainda fez uma grana extra vendendo pros vizinhos de fila.', { variance: 3 }),
    ],
    { weight: 9 }
  ),
  ev(
    'campolimpo-comercio-informal',
    'campo-limpo',
    'Feira de comércio popular na saída do terminal',
    'Barracas vendem de tudo um pouco, com preços que só a periferia consegue oferecer.',
    [
      c('comprar-roupa', 'Comprar roupa barata pra semana', { money: -15, mental: 4 },
        'Renovou o guarda-roupa gastando pouco.', { variance: 2 }),
      c('vender-algo', 'Vender algumas coisas que não usa mais', { money: 16, energy: -6 },
        'Fez um dinheirinho extra tirando coisas velhas de casa.', { variance: 3 }),
      c('so-passar', 'Só passar e ir embora', {}, 'Sem tempo pra feira hoje.', { variance: 1 }),
    ],
    { weight: 7 }
  ),

  // ------------------------------------------------------------ Capão Redondo
  ev(
    'capaoredondo-batalha-rima',
    'capao-redondo',
    'Batalha de rima na praça à noite',
    'Um grupo organiza uma batalha de improviso que já é tradição no bairro.',
    [
      c('participar', 'Entrar na batalha', { reputation: 12, mental: 8, energy: -10 },
        'Mandou bem e o público reconheceu na hora.', {
          variance: 4,
          unluckyChance: 0.15,
          unluckyPenalty: { mental: -8 },
          unluckyText: 'Travou na hora H e ficou incomodado com isso.',
        }),
      c('assistir', 'Só assistir e curtir o som', { mental: 6 },
        'Boa forma de relaxar sem se expor.', { variance: 2 }),
      c('ir-embora', 'Ir embora, dia cansativo demais', {}, 'Preferiu descansar.', { variance: 1 }),
    ],
    { weight: 8 }
  ),
  ev(
    'capaoredondo-estudio-caseiro',
    'capao-redondo',
    'Amigo convida pra gravar num estúdio caseiro',
    'Um conhecido montou um estúdio simples na laje de casa e está gravando um projeto novo.',
    [
      c('participar', 'Participar da gravação', { contacts: 10, reputation: 6, energy: -8 },
        'Fez parte de um projeto que pode render bastante visibilidade depois.', { variance: 3 }),
      c('so-visitar', 'Só visitar e apoiar de fora', { contacts: 4 },
        'Curtiu o processo sem se comprometer com nada.', { variance: 2 }),
      c('recusar', 'Recusar o convite', {}, 'Preferiu focar em outra coisa hoje.', { variance: 1 }),
    ],
    { weight: 6 }
  ),
];
