import { useMemo } from 'react';
import type { GameState } from '../types';
import { ENDINGS } from '../data/endings';
import { getDistrictById } from '../engine/gameEngine';
import { ResourcesPanel } from '../components/ResourcesPanel';
import { Card } from '../components/Card';
import './EndScreen.css';

interface EndScreenProps {
  state: GameState;
  onRestart: () => void;
}

export function EndScreen({ state, onRestart }: EndScreenProps) {
  const ending = ENDINGS.find((e) => e.id === state.endingId) ?? ENDINGS[ENDINGS.length - 1];

  const stats = useMemo(() => {
    const districtCounts: Record<string, number> = {};
    state.turnHistory.forEach((t) => {
      districtCounts[t.districtId] = (districtCounts[t.districtId] ?? 0) + 1;
    });
    const favoriteDistrictId = Object.entries(districtCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
    const favoriteDistrict = favoriteDistrictId ? getDistrictById(favoriteDistrictId) : null;

    const survivedTurns = state.turnHistory.length;
    const survivedDays = Math.min(7, Math.ceil(survivedTurns / 3));

    return { favoriteDistrict, survivedTurns, survivedDays };
  }, [state.turnHistory]);

  return (
    <div className="end-screen">
      <div className="eyebrow">FIM DE JOGO</div>
      <div className="end-screen__ending-emoji">{ending.emoji}</div>
      <h1 className="end-screen__title">{ending.title}</h1>
      <p className="end-screen__desc">{ending.description}</p>

      <Card className="end-screen__stats">
        <div className="end-screen__stat-row">
          <span>Dias sobrevividos</span>
          <strong>{stats.survivedDays} / 7</strong>
        </div>
        <div className="end-screen__stat-row">
          <span>Turnos jogados</span>
          <strong>{stats.survivedTurns} / 21</strong>
        </div>
        {stats.favoriteDistrict && (
          <div className="end-screen__stat-row">
            <span>Bairro mais visitado</span>
            <strong>
              {stats.favoriteDistrict.emoji} {stats.favoriteDistrict.name}
            </strong>
          </div>
        )}
        {state.character && (
          <div className="end-screen__stat-row">
            <span>Personagem</span>
            <strong>
              {state.character.emoji} {state.character.name}
            </strong>
          </div>
        )}
      </Card>

      <div className="eyebrow">RECURSOS FINAIS</div>
      <ResourcesPanel resources={state.resources} />

      <button className="btn btn-primary btn-block" onClick={onRestart}>
        Jogar Novamente
      </button>
    </div>
  );
}
