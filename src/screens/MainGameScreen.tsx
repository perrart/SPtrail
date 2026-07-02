import { DISTRICTS } from '../data/districts';
import { TRANSPORTS } from '../data/transports';
import type { GameState } from '../types';
import { PERIODS } from '../types';
import { Card } from '../components/Card';
import { MetroTracker } from '../components/MetroTracker';
import { ResourcesPanel } from '../components/ResourcesPanel';
import { getDistrictById, getTransportById } from '../engine/gameEngine';
import './MainGameScreen.css';

interface MainGameScreenProps {
  state: GameState;
  onSelectDistrict: (id: string) => void;
  onSelectTransport: (id: string) => void;
  onChooseEvent: (choiceId: string) => void;
}

export function MainGameScreen({
  state,
  onSelectDistrict,
  onSelectTransport,
  onChooseEvent,
}: MainGameScreenProps) {
  const currentDistrict = state.currentDistrictId ? getDistrictById(state.currentDistrictId) : null;
  const currentTransport = state.currentTransportId ? getTransportById(state.currentTransportId) : null;
  const recentHistory = [...state.turnHistory].slice(-3).reverse();

  return (
    <div className="main-game">
      <MetroTracker
        day={state.day}
        periodIndex={state.periodIndex}
        turnsCompleted={state.turnHistory.length}
      />

      <div className="main-game__headline">
        <span className="eyebrow">
          DIA {state.day} DE 7 · {PERIODS[state.periodIndex].toUpperCase()}
        </span>
        {state.character && (
          <span className="main-game__char">
            {state.character.emoji} {state.character.name}
          </span>
        )}
      </div>

      <ResourcesPanel resources={state.resources} compact />

      {state.turnStep === 'district' && (
        <section className="main-game__section">
          <h2 className="main-game__section-title">Para onde você vai agora?</h2>
          <div className="main-game__grid">
            {DISTRICTS.map((district) => (
              <Card key={district.id} onClick={() => onSelectDistrict(district.id)} className="district-card">
                <div className="district-card__head">
                  <span className="district-card__emoji">{district.emoji}</span>
                  <span className="district-card__name">{district.name}</span>
                </div>
                <p className="district-card__desc">{district.description}</p>
                <div className="district-card__meta">
                  <span>Dificuldade {'●'.repeat(district.difficulty)}{'○'.repeat(5 - district.difficulty)}</span>
                  <span>~R$ {district.avgCost}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {state.turnStep === 'transport' && currentDistrict && (
        <section className="main-game__section">
          <h2 className="main-game__section-title">
            Como você vai até {currentDistrict.name}?
          </h2>
          <div className="main-game__grid main-game__grid--transport">
            {TRANSPORTS.map((transport) => (
              <Card key={transport.id} onClick={() => onSelectTransport(transport.id)} className="transport-card">
                <div className="transport-card__emoji">{transport.emoji}</div>
                <div className="transport-card__name">{transport.name}</div>
                <p className="transport-card__desc">{transport.description}</p>
                <div className="transport-card__meta">
                  <span>💰 -{transport.moneyCost}</span>
                  <span>⚡ -{transport.energyCost}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {state.turnStep === 'event' && state.currentEvent && currentDistrict && currentTransport && (
        <section className="main-game__section">
          <div className="event-context eyebrow">
            {currentDistrict.emoji} {currentDistrict.name} · {currentTransport.emoji} {currentTransport.name}
          </div>
          <Card className="event-card">
            <h2 className="event-card__title">{state.currentEvent.title}</h2>
            <p className="event-card__desc">{state.currentEvent.description}</p>
            <div className="event-card__choices">
              {state.currentEvent.choices.map((choice) => (
                <button
                  key={choice.id}
                  className="btn btn-block event-choice"
                  onClick={() => onChooseEvent(choice.id)}
                >
                  {choice.label}
                </button>
              ))}
            </div>
          </Card>
        </section>
      )}

      {recentHistory.length > 0 && (
        <section className="main-game__history">
          <div className="eyebrow">ÚLTIMAS DECISÕES</div>
          <ul>
            {recentHistory.map((turn, i) => (
              <li key={i}>
                <span className="main-game__history-tag">
                  D{turn.day} {turn.period.slice(0, 3)}
                </span>
                {turn.eventTitle} — {turn.choiceLabel}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
