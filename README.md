# THE SÃO PAULO TRAIL

Um jogo de sobrevivência urbana inspirado em *Oregon Trail*, ambientado em São Paulo. Você tem uma semana (7 dias, 3 turnos por dia = 21 decisões) para tentar "dar certo" na maior cidade do hemisfério sul.

Demo 100% front-end: React + TypeScript + Vite, sem backend, sem banco de dados, todo o estado em memória.

## Rodando o projeto

```bash
npm install
npm run dev
```

Abra o endereço mostrado no terminal (normalmente `http://localhost:5173`).

Para gerar a build de produção:

```bash
npm run build
npm run preview
```

## Como jogar

A cada turno você:

1. Escolhe um **bairro** para ir.
2. Escolhe um **meio de transporte**.
3. O jogo sorteia um **evento** compatível com o bairro e o transporte.
4. Você escolhe como **reagir**.
5. Seus recursos são atualizados e você vê o resumo da consequência.

Se **Dinheiro**, **Energia** ou **Saúde Mental** chegarem a zero, a partida acaba imediatamente. No fim da semana (ou do jogo), você recebe um dos vários finais possíveis, calculado a partir da combinação final dos seus recursos.

## Arquitetura

```
src/
  components/   # UI reutilizável (Card, Bar, MetroTracker, ResourcesPanel)
  screens/      # As 6 telas do jogo (Home, Como Jogar, Personagem, Principal, Resultado, Final)
  engine/       # Motor do jogo — lógica pura, sem JSX (gameEngine.ts)
  data/         # Bairros, transportes, personagens, finais e ~60 eventos (por bairro)
  types/        # Interfaces TypeScript centrais
  hooks/        # useGame — liga o motor de jogo ao React
  utils/        # random.ts, clamp.ts
  styles/       # Design tokens (variables.css) e estilos globais
```

O motor de jogo (`engine/gameEngine.ts`) é completamente separado da interface: recebe um `GameState` e retorna um novo `GameState`. Isso facilita testes, expansão e até uma futura reescrita de interface sem tocar nas regras do jogo.

## Expandindo o jogo

- **Novo bairro:** adicione um objeto em `src/data/districts.ts` e crie `src/data/events/<bairro>.ts` com eventos usando os helpers `c()` e `ev()` de `src/data/events/helpers.ts`. Depois inclua o array no `src/data/events/index.ts`.
- **Novo personagem:** adicione um objeto em `src/data/characters.ts`.
- **Novo transporte:** adicione um objeto em `src/data/transports.ts` e, se quiser, referencie o `id` dele em `compatibleTransports` de eventos específicos.
- **Novo final:** adicione um objeto em `src/data/endings.ts` com uma `condition` e uma `priority` (finais mais específicos devem ter prioridade mais alta).
- **Novo recurso:** estenda o tipo `ResourceKey` e `RESOURCE_META` em `src/types/index.ts`.

Nenhuma dessas expansões exige alterar o loop principal do motor de jogo.

## Sobre o visual

Sem imagens ou assets externos — só tipografia, cor e CSS moderno. A identidade visual bebe da sinalização do Metrô de São Paulo (linha azul, amarela), do concreto urbano e da luz de sódio noturna. O elemento de assinatura é o rastreador de turnos no topo da tela principal, desenhado como uma linha de metrô com 21 estações (uma por turno).
