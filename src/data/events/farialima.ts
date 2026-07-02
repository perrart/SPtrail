import { c, ev } from './helpers';
import type { GameEvent } from '../../types';

export const FARIA_LIMA_EVENTS: GameEvent[] = [
  ev(
    'farialima-cafe-caro',
    'farialima',
    'Café de vinte reais',
    'A cafeteria mais próxima do escritório cobra um preço que faria seu avô desmaiar por um café.',
    [
      c('pagar', 'Pagar mesmo assim', { money: -20, mental: 4 },
        'Caro, mas foi o melhor café da semana.', { variance: 3 }),
      c('procurar-alternativa', 'Procurar uma padaria mais barata', { energy: -4, money: -6 },
        'Andou mais, mas economizou uma boa grana.', { variance: 3 }),
      c('sem-cafe', 'Seguir sem café mesmo', { mental: -6, energy: -3 },
        'A manhã ficou mais longa sem a dose de cafeína.', { variance: 3 }),
    ],
    { weight: 10 }
  ),

  ev(
    'farialima-networking',
    'farialima',
    'Evento de networking corporativo',
    'Um evento badalado reúne executivos, investidores e gente "importante" trocando cartões de visita.',
    [
      c('participar', 'Participar ativamente, puxando conversa', { contacts: 12, reputation: 5, energy: -8 },
        'Trocou contatos valiosos e ainda ouviu boas dicas de mercado.', { variance: 5 }),
      c('ficar-timido', 'Ficar mais na dele, observando', { contacts: 3, mental: -2 },
        'Ficou no canto, sentindo o peso da própria timidez.', { variance: 3 }),
      c('ir-embora-cedo', 'Ir embora mais cedo', { energy: 3 },
        'Preferiu poupar energia para outro compromisso.', { variance: 2 }),
    ],
    { weight: 11 }
  ),

  ev(
    'farialima-vaga-tech',
    'farialima',
    'Recrutador de startup te aborda na rua',
    'Alguém com crachá de recrutador te aborda perto de um prédio espelhado, curioso sobre sua experiência.',
    [
      c('conversar', 'Parar para conversar', { reputation: 5, contacts: 6, energy: -3 },
        'A conversa rendeu um convite para um processo seletivo.', {
          variance: 4,
          luckyChance: 0.2,
          luckyBonus: { money: 20 },
          luckyText: 'Terminou a conversa já com uma proposta de bico bem remunerado.',
        }),
      c('recusar', 'Recusar educadamente e seguir', {}, 'Sem tempo para elevator pitch hoje.', { variance: 1 }),
      c('exagerar-curriculo', 'Exagerar um pouco na conversa', { reputation: 3 },
        'Vendeu seu peixe com brilho nos olhos. Funcionou, por enquanto.', {
          variance: 4,
          unluckyChance: 0.2,
          unluckyPenalty: { reputation: -8 },
          unluckyText: 'O recrutador percebeu o exagero e anotou isso mentalmente.',
        }),
    ],
    { weight: 9 }
  ),

  ev(
    'farialima-vr-acabou',
    'farialima',
    'Seu VR acabou dois dias antes do pagamento',
    'O saldo do vale-refeição chegou a zero e o almoço na região não sai por menos de trinta reais.',
    [
      c('almoco-caro', 'Pagar do próprio bolso mesmo', { money: -25, mental: 2 },
        'Almoçou bem, mas sentiu o rombo no orçamento da semana.', { variance: 4 }),
      c('marmita', 'Improvisar com o que tinha em casa', { money: -3, mental: -2 },
        'Um sanduíche apressado no meio dos executivos de terno.', { variance: 2 }),
      c('pular-almoco', 'Pular o almoço', { energy: -10, mental: -8 },
        'A tarde rendeu, mas o estômago cobrou a conta depois.', { variance: 4 }),
    ],
    { weight: 10 }
  ),

  ev(
    'farialima-uber-caro',
    'farialima',
    'Tarifa dinâmica dispara na região',
    'Um grande evento na região fez a demanda por corridas explodir. O app mostra um valor absurdo.',
    [
      c('pagar', 'Pagar o valor mesmo assim', { money: -35, energy: 5 },
        'Caro, mas chegou rápido e descansado.', { variance: 4 }),
      c('esperar-baixar', 'Esperar a tarifa baixar', { energy: -6, mental: -3 },
        'Esperou vinte minutos até o preço ficar razoável.', { variance: 4 }),
      c('ir-outro-meio', 'Desistir e ir de outro jeito', { energy: -8 },
        'Trocou o conforto pela economia. A caminhada rendeu reflexão.', { variance: 3 }),
    ],
    { weight: 9, compatibleTransports: ['uber'] }
  ),

  ev(
    'farialima-terno-emprestado',
    'farialima',
    'Reunião importante e a roupa não ajuda',
    'Uma reunião de última hora exige postura formal, mas seu look de hoje está longe do dress code local.',
    [
      c('comprar-peca', 'Comprar uma peça rápida numa loja da região', { money: -30, reputation: 4 },
        'Caro, mas passou despercebido entre os ternos ao redor.', { variance: 4 }),
      c('ir-assim-mesmo', 'Ir assim mesmo, sem se importar', { reputation: -5 },
        'Alguns olhares tortos, mas a reunião rendeu de qualquer forma.', { variance: 3 }),
      c('pedir-emprestado', 'Pedir uma peça emprestada a um conhecido', { contacts: 3 },
        'Resolveu na base do jeitinho e ainda fortaleceu uma amizade.', { variance: 3 }),
    ],
    { weight: 7 }
  ),

  ev(
    'farialima-palestra-gratuita',
    'farialima',
    'Palestra gratuita sobre mercado financeiro',
    'Um auditório badalado oferece uma palestra aberta sobre tendências de investimento.',
    [
      c('assistir', 'Assistir à palestra inteira', { reputation: 3, mental: 4, energy: -3 },
        'Aprendeu conceitos novos e ainda fez uma boa pergunta ao final.', { variance: 3 }),
      c('sair-no-meio', 'Sair no meio, sem paciência', { energy: 2 },
        'Achou o assunto denso demais para o momento.', { variance: 2 }),
      c('networking-pos', 'Ficar para o networking pós-palestra', { contacts: 7 },
        'As conversas de corredor valeram mais que a própria palestra.', { variance: 3 }),
    ],
    { weight: 8 }
  ),

  ev(
    'farialima-predio-espelhado',
    'farialima',
    'Segurança de prédio corporativo pede identificação',
    'Ao tentar atravessar o saguão de um prédio para economizar caminho, um segurança te intercepta.',
    [
      c('explicar', 'Explicar a situação com calma', { mental: -1 },
        'O segurança entendeu e liberou a passagem sem drama.', { variance: 2 }),
      c('dar-volta', 'Desistir e dar a volta', { energy: -5 },
        'Preferiu evitar qualquer atrito e seguir por fora.', { variance: 2 }),
      c('insistir', 'Insistir e tentar convencer', { reputation: -3, mental: -3 },
        'A discussão não rendeu nada além de estresse.', { variance: 3 }),
    ],
    { weight: 6 }
  ),

  ev(
    'farialima-oferta-investimento',
    'farialima',
    'Um "consultor" oferece uma oportunidade infalível',
    'Um homem de terno impecável garante retorno garantido investindo numa "oportunidade exclusiva".',
    [
      c('recusar', 'Recusar de cara', { mental: 2 },
        'Retorno garantido é a primeira bandeira vermelha de qualquer golpe.', { variance: 2 }),
      c('ouvir', 'Ouvir por educação', { mental: -2 },
        'Perdeu dez minutos, mas identificou a pegadinha rapidinho.', { variance: 2 }),
      c('investir', 'Arriscar um pouco', { money: -30 },
        'Nunca mais viu nem o consultor nem o dinheiro.', {
          variance: 6,
          luckyChance: 0.08,
          luckyBonus: { money: 30 },
          luckyText: 'Surpreendentemente, o retorno caiu na conta dias depois.',
        }),
    ],
    { weight: 8 }
  ),
];
