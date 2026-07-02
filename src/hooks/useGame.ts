import { useCallback, useState } from 'react';
import type { Character, GameState } from '../types';
import {
  continueAfterResult,
  createInitialState,
  makeChoice,
  selectDistrict,
  selectTransport,
  startGame,
} from '../engine/gameEngine';

export function useGame() {
  const [state, setState] = useState<GameState>(() => createInitialState());

  const goHome = useCallback(() => setState(createInitialState()), []);

  const goToCharacterSelect = useCallback(
    () => setState((s) => ({ ...s, screen: 'character' })),
    []
  );

  const goToHowToPlay = useCallback(
    () => setState((s) => ({ ...s, screen: 'howToPlay' })),
    []
  );

  const beginGame = useCallback((character: Character) => {
    setState(startGame(character));
  }, []);

  const chooseDistrict = useCallback((districtId: string) => {
    setState((s) => selectDistrict(s, districtId));
  }, []);

  const chooseTransport = useCallback((transportId: string) => {
    setState((s) => selectTransport(s, transportId));
  }, []);

  const chooseEventOption = useCallback((choiceId: string) => {
    setState((s) => makeChoice(s, choiceId));
  }, []);

  const continueTurn = useCallback(() => {
    setState((s) => continueAfterResult(s));
  }, []);

  const restart = useCallback(() => setState(createInitialState()), []);

  return {
    state,
    goHome,
    goToCharacterSelect,
    goToHowToPlay,
    beginGame,
    chooseDistrict,
    chooseTransport,
    chooseEventOption,
    continueTurn,
    restart,
  };
}
