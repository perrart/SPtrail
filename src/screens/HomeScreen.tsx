import './HomeScreen.css';

interface HomeScreenProps {
  onNewGame: () => void;
  onHowToPlay: () => void;
}

export function HomeScreen({ onNewGame, onHowToPlay }: HomeScreenProps) {
  return (
    <div className="home">
      <div className="home__badge eyebrow">UMA SEMANA. TRÊS TURNOS POR DIA. ZERO GARANTIAS.</div>
      <h1 className="home__title">
        THE <span className="home__title-accent">SÃO PAULO</span> TRAIL
      </h1>
      <p className="home__subtitle">
        Você acabou de chegar na maior cidade do hemisfério sul tentando "dar certo".
        Sete dias. Vinte e um turnos. Uma cidade que não pede licença para te testar.
      </p>

      <div className="home__actions">
        <button className="btn btn-primary btn-block" onClick={onNewGame}>
          Novo Jogo
        </button>
        <button className="btn btn-block" onClick={onHowToPlay}>
          Como Jogar
        </button>
      </div>

      <div className="home__footer eyebrow">SÃO PAULO É UM PERSONAGEM. TRATE-A COM RESPEITO.</div>
    </div>
  );
}
