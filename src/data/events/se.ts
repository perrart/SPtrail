import { c, ev } from './helpers';
import type { GameEvent } from '../../types';

export const SE_EVENTS: GameEvent[] = [
  ev(
    'centro-golpe-celular',
    'se',
    'Seu celular ficou com 3% de bateria',
    'No meio da Praça da Sé, a tela pisca o aviso de bateria fraca bem na hora em que você mais precisa do mapa.',
    [
      c('carregador-portatil', 'Comprar um carregador portátil de camelô', { money: -15, energy: 5 },
        'Funcionou. Por enquanto.', { variance: 3 }),
      c('procurar-tomada', 'Procurar uma tomada em algum estabelecimento', { energy: -8, mental: -4 },
        'Andou vinte minutos até achar uma padaria receptiva.', { variance: 3 }),
      c('deixar-morrer', 'Deixar o celular morrer e seguir no instinto', { mental: -6 },
        'Sem GPS, sem rede social, só você e a cidade.', {
          variance: 4,
          unluckyChance: 0.3,
          unluckyPenalty: { mental: -10 },
          unluckyText: 'Se perdeu feio e chegou uma hora atrasado no que quer que fosse.',
        }),
    ],
    { weight: 12 }
  ),

  ev(
    'centro-golpe-do-bilhete',
    'se',
    'Um estranho oferece um "bilhete premiado"',
    'Um senhor bem vestido diz que achou um bilhete premiado e precisa dividir com alguém de confiança — você.',
    [
      c('ignorar', 'Ignorar e seguir andando', {}, 'Você já ouviu essa história antes. Seguiu em frente.', {
        variance: 1,
      }),
      c('escutar', 'Parar para escutar por curiosidade', { mental: -3 },
        'Perdeu dez minutos e um pouco de paciência com a lábia do golpista.', { variance: 3 }),
      c('cair', 'Topar participar da "divisão"', { money: -25 },
        'Era golpe. Óbvio que era golpe.', {
          variance: 5,
          luckyChance: 0.1,
          luckyBonus: { money: 25 },
          luckyText: 'Por algum milagre, você percebeu a tempo e não perdeu nada.',
        }),
    ],
    { weight: 9 }
  ),

  ev(
    'centro-vendedor-ambulante',
    'se',
    'Vaga relâmpago de vendedor ambulante',
    'Um camelô precisa de ajuda para vender guarda-chuvas antes da chuva começar. Paga na hora.',
    [
      c('ajudar', 'Ajudar a vender por algumas horas', { money: 18, energy: -10 },
        'Vendeu bem. A cidade estava mesmo precisando de guarda-chuva.', { variance: 5 }),
      c('recusar', 'Recusar e seguir seu caminho', {}, 'Não era hoje o dia de virar vendedor.', { variance: 1 }),
      c('negociar', 'Negociar uma comissão maior antes de aceitar', { money: 10, energy: -8 },
        'Depois de um regateio, conseguiu condições melhores.', {
          variance: 4,
          luckyChance: 0.25,
          luckyBonus: { money: 15, reputation: 3 },
          luckyText: 'Vendeu tudo em recorde e ainda fez um contato para o futuro.',
        }
      ),
    ],
    { weight: 10, compatibleTransports: ['onibus', 'metro', 'bike'] }
  ),

  ev(
    'centro-chuva-sem-guardachuva',
    'se',
    'A chuva começou exatamente quando você saiu sem guarda-chuva',
    'O céu abriu bem em cima do Vale do Anhangabaú. Você está a quinze minutos do abrigo mais próximo.',
    [
      c('correr', 'Correr até um abrigo', { energy: -8, mental: -3 },
        'Chegou ensopado, mas chegou.', { variance: 4 }),
      c('comprar-capa', 'Comprar uma capa de chuva de ambulante', { money: -10 },
        'Um camelô sempre aparece bem na hora certa em São Paulo.', { variance: 2 }),
      c('esperar', 'Esperar embaixo de uma marquise', { energy: -3, mental: 2 },
        'Ficou observando a cidade correr. Meio filosófico, meio molhado.', { variance: 3 }),
    ],
    { weight: 11 }
  ),

  ev(
    'centro-recrutador-horario-pico',
    'se',
    'O recrutador marcou uma call em pleno horário de pico',
    'Ligação importante marcada para às 18h15, bem no auge do rush na região central.',
    [
      c('achar-canto', 'Achar um canto silencioso para atender', { energy: -6, mental: -2 },
        'Falou de dentro de uma loja fechada, sussurrando as respostas.', { variance: 3 }),
      c('remarcar', 'Pedir para remarcar', { reputation: -5 },
        'Profissional, mas talvez tenha soado menos disponível do que gostaria.', { variance: 3 }),
      c('atender-andando', 'Atender andando mesmo, no meio do caos', { mental: -8, reputation: 3 },
        'A ligação foi um teste de multitarefa. Você passou raspando.', {
          variance: 5,
          luckyChance: 0.2,
          luckyBonus: { reputation: 8, contacts: 5 },
          luckyText: 'Impressionou o recrutador com a capacidade de manter a calma no caos.',
        }),
    ],
    { weight: 9 }
  ),

  ev(
    'centro-manifestacao',
    'se',
    'Manifestação toma a Avenida Ipiranga',
    'Um protesto pacífico fecha a via principal. Buzinas, cartazes e um desvio e tanto pela frente.',
    [
      c('desviar', 'Fazer um desvio grande a pé', { energy: -10 },
        'Andou o dobro do previsto, mas evitou qualquer confusão.', { variance: 4 }),
      c('atravessar', 'Atravessar pela lateral da manifestação', { mental: -3 },
        'Passou rente à multidão, sentindo a energia coletiva da rua.', {
          variance: 4,
          unluckyChance: 0.2,
          unluckyPenalty: { energy: -8, mental: -5 },
          unluckyText: 'Ficou preso num cordão de isolamento por vinte minutos.',
        }),
      c('observar', 'Parar para observar e entender a pauta', { mental: 5, contacts: 3 },
        'Puxou conversa com alguns manifestantes e saiu com uma visão nova da cidade.', { variance: 3 }),
    ],
    { weight: 8 }
  ),

  ev(
    'centro-achado-sebo',
    'se',
    'Sebo de livros com preços de outro século',
    'Entre a poeira e as pilhas de livros usados, você encontra uma edição rara por preço de banana.',
    [
      c('comprar', 'Comprar mesmo sem saber se vale a pena', { money: -12, mental: 6 },
        'Levou o livro sem culpa. Autocuidado tem forma de capa dura também.', { variance: 3 }),
      c('ignorar', 'Admirar e seguir sem comprar', { mental: 2 },
        'Nem tudo precisa ser levado para casa.', { variance: 2 }),
      c('revender', 'Comprar para revender depois', { money: -10 },
        'Apostou que aquele exemplar valeria mais em outro lugar.', {
          variance: 4,
          luckyChance: 0.3,
          luckyBonus: { money: 30 },
          luckyText: 'Um colecionador pagou o triplo por ele on-line ainda naquela noite.',
        }),
    ],
    { weight: 8 }
  ),

  ev(
    'centro-flanelinha',
    'se',
    'Flanelinha "cuida" de uma vaga que nem existe',
    'Um flanelinha insiste em cobrar por um espaço onde você nem estacionou nada.',
    [
      c('pagar', 'Pagar para evitar confusão', { money: -8, mental: -2 },
        'Preferiu economizar energia mental e seguir seu dia.', { variance: 2 }),
      c('discutir', 'Discutir e se recusar a pagar', { mental: -6 },
        'Ganhou a discussão, mas perdeu a paz por uns bons minutos.', {
          variance: 4,
          unluckyChance: 0.15,
          unluckyPenalty: { reputation: -5 },
          unluckyText: 'A cena virou espetáculo e algumas pessoas acharam que você era o errado.',
        }),
      c('rir-junto', 'Rir da audácia e conversar', { contacts: 4 },
        'Vocês acabaram trocando ideia sobre a vida no Centro por dez minutos.', { variance: 3 }),
    ],
    { weight: 8 }
  ),

  ev(
    'centro-happy-hour-improviso',
    'se',
    'Roda de conversa improvisada na Galeria do Rock',
    'Um grupo de músicos de rua puxa papo com quem passa, formando uma roda espontânea de conversa e som.',
    [
      c('participar', 'Entrar na roda e conversar', { contacts: 8, mental: 5, energy: -4 },
        'Fez amizades rápidas ao som de um violão desafinado, mas sincero.', { variance: 4 }),
      c('so-assistir', 'Assistir de longe, sem se envolver', { mental: 3 },
        'Curtiu a cena como espectador e seguiu sem compromisso.', { variance: 2 }),
      c('ir-embora', 'Ir embora, sem tempo para isso', { energy: 2 },
        'Preferiu poupar energia para o resto do dia.', { variance: 2 }),
    ],
    { weight: 7 }
  ),
];
