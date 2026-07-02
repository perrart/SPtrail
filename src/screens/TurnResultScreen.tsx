import type { GameState, Resources } from '../types';
import { RESOURCE_META } from '../types';
import { Card } from '../components/Card';
import { getDistrictById, getTransportById } from '../engine/gameEngine';
import './TurnResultScreen.css';

interface TurnResultScreenProps {
  state: GameState;
  onContinue: () => void;
}

function DeltaRow({ resKey, value }: { resKey: keyof Resources; value: number }) {
  if (!value) return null;
  const positive = value > 0;
  return (
    <li className={`delta-row ${positive ? 'delta-row--pos' : 'delta-row--neg'}`}>
      <span>
        {RESOURCE_META[resKey].icon} {RESOURCE_META[resKey].label}
      </span>
      <span className="delta-row__value">
        {positive ? '+' : ''}
        {value}
      </span>
    </li>
  );
}

export function TurnResultScreen({ state, onContinue }: TurnResultScreenProps) {
  const turn = state.lastTurn;
  if (!turn) return null;
  const district = getDistrictById(turn.districtId);
  const transport = getTransportById(turn.transportId);

  return (
    <div className="turn-result">
      <div className="eyebrow">
        DIA {turn.day} · {turn.period.toUpperCase()} · {district?.emoji} {district?.name}
      </div>

      <Card className="turn-result__card">
        <h2 className="turn-result__title">{turn.eventTitle}</h2>
        <p className="turn-result__choice">
          Você escolheu: <strong>{turn.choiceLabel}</strong>
        </p>
        <p className="turn-result__text">{turn.resultText}</p>

        <hr className="hairline" />

        <ul className="delta-list">
          {(Object.keys(turn.delta) as (keyof Resources)[]).map((key) => (
            <DeltaRow key={key} resKey={key} value={turn.delta[key] ?? 0} />
          ))}
        </ul>

        {transport && (
          <p className="turn-result__transport-note">
            {transport.emoji} Deslocamento de {transport.name.toLowerCase()} já descontado.
          </p>
        )}
      </Card>

      {state.gameOverEarly && (
        <div className="turn-result__warning">
          Um dos seus recursos vitais chegou a zero. A semana termina aqui.
        </div>
      )}

      <button className="btn btn-primary btn-block" onClick={onContinue}>
        {state.gameOverEarly || state.turnHistory.length >= 21 ? 'Ver resultado final' : 'Continuar'}
      </button>
    </div>
  );
}
