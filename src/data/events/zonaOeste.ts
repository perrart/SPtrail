import { c, ev } from './helpers';
import type { GameEvent } from '../../types';

export const ZONA_OESTE_EVENTS: GameEvent[] = [
  // ------------------------------------------------------------- Vila Madalena
  ev(
    'vilamadalena-grafite-encomenda',
    'vila-madalena',
    'Loja pede um grafite personalizado na fachada',
    'Uma loja nova quer pagar por uma intervenção artística rápida na parede lateral.',
    [
      c('aceitar', 'Aceitar fazer o grafite', { money: 30, reputation: 8, energy: -14 },
        'O resultado ficou tão bom que virou ponto de foto no bairro.', {
          variance: 5,
          luckyChance: 0.15,
          luckyBonus: { contacts: 8 },
          luckyText: 'O dono adorou e já te indicou pra outros comerciantes da rua.',
        }),
      c('recusar', 'Recusar, prazo curto demais', {}, 'Preferiu não se comprometer com pressa.', {
        variance: 1,
      }),
      c('parceria', 'Chamar outro artista pra dividir o trabalho', { money: 18, contacts: 6, energy: -8 },
        'Dividiu o trabalho e o crédito, mas também o cansaço.', { variance: 3 }),
    ],
    { weight: 8 }
  ),
  ev(
    'vilamadalena-aluguel-caro',
    'vila-madalena',
    'Bar badalado cobra caríssimo até pela água',
    'Você para num bar cheio de turistas e descobre que até um copo d\'água sai caro aqui.',
    [
      c('pagar', 'Pagar mesmo assim', { money: -18, mental: 4 },
        'Caro, mas o ambiente valeu a experiência.', { variance: 2 }),
      c('sair', 'Sair e procurar outro lugar mais em conta', { energy: -4 },
        'Andou mais um pouco até achar algo mais barato.', { variance: 2 }),
      c('so-observar', 'Ficar só de olho no movimento, sem consumir', { mental: 2 },
        'Aproveitou o clima do bairro sem gastar nada.', { variance: 2 }),
    ],
    { weight: 6 }
  ),

  // ------------------------------------------------------------------ Butantã
  ev(
    'butanta-monitoria',
    'butanta',
    'Vaga de monitoria surge no mural da faculdade',
    'Um professor está procurando um monitor remunerado pra uma disciplina que você domina.',
    [
      c('candidatar', 'Se candidatar à vaga', { money: 20, reputation: 6, energy: -6 },
        'Foi aceito e agora tem uma renda fixa extra por semana.', { variance: 3 }),
      c('ignorar', 'Ignorar, sem tempo disponível', {}, 'Preferiu focar nas próprias matérias.', {
        variance: 1,
      }),
      c('indicar-colega', 'Indicar um colega pra vaga', { contacts: 6 },
        'Fez um favor que fortalece a rede de contatos da faculdade.', { variance: 2 }),
    ],
    { weight: 8 }
  ),
  ev(
    'butanta-cobaia-pesquisa',
    'butanta',
    'Pesquisa acadêmica paga por voluntários',
    'Um laboratório da universidade está recrutando voluntários pagos para um estudo simples.',
    [
      c('participar', 'Participar da pesquisa', { money: 16, energy: -6 },
        'Levou um tempo, mas foi tranquilo e rendeu uma graninha.', { variance: 3 }),
      c('recusar', 'Recusar, prefere não se envolver', {}, 'Preferiu manter distância.', {
        variance: 1,
      }),
      c('perguntar-riscos', 'Perguntar mais sobre os riscos antes de decidir', { mental: 2 },
        'Ficou mais tranquilo depois de entender do que se tratava, mas decidiu não participar dessa vez.', {
          variance: 2,
        }),
    ],
    { weight: 5 }
  ),

  // ------------------------------------------------------------------ Jaguaré
  ev(
    'jaguare-obra-vizinha',
    'jaguare',
    'Obra vizinha faz um barulho absurdo o dia todo',
    'Um prédio comercial novo está sendo erguido bem ao lado de onde você precisa ficar.',
    [
      c('aguentar', 'Aguentar o barulho e seguir o plano', { mental: -8 },
        'Foi difícil se concentrar, mas deu pra terminar o que precisava.', { variance: 3 }),
      c('mudar-lugar', 'Procurar outro lugar mais silencioso', { energy: -4 },
        'Andou um pouco mais, mas conseguiu sossego.', { variance: 2 }),
      c('fone-ouvido', 'Colocar fone de ouvido e abafar o som', { money: -5, mental: -2 },
        'Ajudou bastante, mesmo sem resolver de vez.', { variance: 2 }),
    ],
    { weight: 7 }
  ),
  ev(
    'jaguare-vaga-construcao',
    'jaguare',
    'Canteiro de obras oferece diária para ajudante geral',
    'Com tantos prédios novos subindo, sempre falta gente pra ajudar na obra por um dia.',
    [
      c('trabalhar', 'Aceitar a diária de ajudante', { money: 26, energy: -16 },
        'Serviço pesado, mas pagou bem no fim do dia.', { variance: 4 }),
      c('recusar', 'Recusar, trabalho puxado demais', {}, 'Preferiu poupar o corpo hoje.', {
        variance: 1,
      }),
      c('meio-turno', 'Negociar fazer só meio turno', { money: 14, energy: -8 },
        'Um meio-termo mais leve, mas ainda rendeu algo.', { variance: 2 }),
    ],
    { weight: 6 }
  ),
];
