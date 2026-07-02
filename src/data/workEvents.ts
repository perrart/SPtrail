import { c, ev } from './events/helpers';
import type { GameEvent } from '../types';
import { CHARACTERS } from './characters';

function salaryOf(characterId: string): number {
  return CHARACTERS.find((ch) => ch.id === characterId)?.salaryPerShift ?? 0;
}

function energyCostOf(characterId: string): number {
  return CHARACTERS.find((ch) => ch.id === characterId)?.workEnergyCost ?? 8;
}

function mentalCostOf(characterId: string): number {
  return CHARACTERS.find((ch) => ch.id === characterId)?.workMentalCost ?? -6;
}

const WORK_EVENTS: Record<string, GameEvent> = {
  estudante: ev(
    'work-estudante-aula',
    'butanta',
    'Mais uma aula na USP',
    'Você chega ao campus do Butantã pra mais um dia de aula. A escolha é sobre como encarar o dia hoje.',
    [
      c(
        'aula-normal',
        'Assistir à aula normalmente',
        {
          money: salaryOf('estudante'),
          mental: mentalCostOf('estudante'),
          energy: -energyCostOf('estudante'),
        },
        'Aula tranquila, sem grandes novidades, mas você acompanhou tudo — e ainda recebeu a bolsa de monitoria do mês.',
        { variance: 1 }
      ),
      c(
        'estudar-grupo',
        'Ficar depois da aula pra estudar em grupo',
        {
          money: salaryOf('estudante'),
          mental: mentalCostOf('estudante') + 4,
          energy: -energyCostOf('estudante') - 3,
          contacts: 6,
        },
        'Cansou mais, mas fortaleceu o grupo de estudos — a bolsa caiu na conta normalmente.',
        { variance: 1 }
      ),
      c(
        'monitoria-extra',
        'Aproveitar pra dar uma monitoria remunerada extra',
        {
          money: salaryOf('estudante') + 10,
          mental: mentalCostOf('estudante') + 2,
          energy: -energyCostOf('estudante') - 1,
          reputation: 3,
        },
        'Deu uma força pros calouros e ainda ganhou um extra por isso.',
        { variance: 2 }
      ),
    ],
    { weight: 10 }
  ),
  estagiario: ev(
    'work-estagiario-expediente',
    'pinheiros',
    'Expediente no estágio',
    'Mais um turno no escritório em Pinheiros. Reuniões, planilhas e um café que nunca esfria.',
    [
      c(
        'turno-normal',
        'Cumprir o turno normalmente',
        { money: salaryOf('estagiario'), mental: mentalCostOf('estagiario'), energy: -energyCostOf('estagiario') },
        'Cumpriu suas tarefas dentro do esperado.',
        { variance: 3 }
      ),
      c(
        'hora-extra',
        'Ficar até mais tarde ajudando num projeto',
        {
          money: salaryOf('estagiario') + 12,
          mental: mentalCostOf('estagiario') - 6,
          energy: -energyCostOf('estagiario') - 6,
          reputation: 5,
        },
        'Cansou mais, mas chamou atenção dos superiores.',
        {
          variance: 3,
          luckyChance: 0.15,
          luckyBonus: { contacts: 6 },
          luckyText: 'Um gerente sênior elogiou seu empenho na frente de todo mundo.',
        }
      ),
      c(
        'sair-cedo',
        'Pedir pra sair um pouco mais cedo hoje',
        { money: Math.max(0, salaryOf('estagiario') - 8), mental: mentalCostOf('estagiario') + 6, energy: -energyCostOf('estagiario') + 4 },
        'Ganhou menos, mas o corpo agradeceu o descanso extra.',
        { variance: 2 }
      ),
    ],
    { weight: 10 }
  ),
  callcenter: ev(
    'work-callcenter-turno',
    'se',
    'Turno na central de atendimento',
    'Fone de ouvido, script na tela e uma fila de ligações que não acaba nunca, ali na Sé.',
    [
      c(
        'turno-normal',
        'Seguir o turno normalmente',
        { money: salaryOf('callcenter'), mental: mentalCostOf('callcenter'), energy: -energyCostOf('callcenter') },
        'Bateu a meta de ligações do dia, dentro do script.',
        { variance: 3 }
      ),
      c(
        'bater-meta',
        'Se esforçar pra bater a meta e ganhar bônus',
        {
          money: salaryOf('callcenter') + 15,
          mental: mentalCostOf('callcenter') - 8,
          energy: -energyCostOf('callcenter') - 4,
        },
        'Bateu a meta com folga e o bônus caiu ainda esse mês.',
        { variance: 3 }
      ),
      c(
        'pausa-extra',
        'Fazer uma pausa extra pra respirar entre as ligações',
        { money: Math.max(0, salaryOf('callcenter') - 6), mental: mentalCostOf('callcenter') + 8, energy: -energyCostOf('callcenter') + 2 },
        'Rendeu um pouco menos, mas evitou o esgotamento total.',
        { variance: 2 }
      ),
    ],
    { weight: 10 }
  ),
};

export function getWorkEvent(characterId: string): GameEvent | null {
  return WORK_EVENTS[characterId] ?? null;
}
