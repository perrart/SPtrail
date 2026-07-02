import { useGame } from './hooks/useGame';
import { HomeScreen } from './screens/HomeScreen';
import { HowToPlayScreen } from './screens/HowToPlayScreen';
import { CharacterSelectScreen } from './screens/CharacterSelectScreen';
import { MainGameScreen } from './screens/MainGameScreen';
import { TurnResultScreen } from './screens/TurnResultScreen';
import { EndScreen } from './screens/EndScreen';

export default function App() {
  const {
    state,
    goToCharacterSelect,
    goToHowToPlay,
    goHome,
    beginGame,
    chooseDistrict,
    chooseTransport,
    chooseEventOption,
    continueTurn,
    restart,
  } = useGame();

  return (
    <div className="app-shell">
      {state.screen === 'home' && (
        <HomeScreen onNewGame={goToCharacterSelect} onHowToPlay={goToHowToPlay} />
      )}

      {state.screen === 'howToPlay' && <HowToPlayScreen onBack={goHome} />}

      {state.screen === 'character' && <CharacterSelectScreen onSelect={beginGame} />}

      {state.screen === 'main' && (
        <MainGameScreen
          state={state}
          onSelectDistrict={chooseDistrict}
          onSelectTransport={chooseTransport}
          onChooseEvent={chooseEventOption}
        />
      )}

      {state.screen === 'turnResult' && (
        <TurnResultScreen state={state} onContinue={continueTurn} />
      )}

      {state.screen === 'end' && <EndScreen state={state} onRestart={restart} />}
    </div>
  );
}
