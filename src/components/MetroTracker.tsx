import './MetroTracker.css';
import { PERIODS, TOTAL_TURNS } from '../types';

interface MetroTrackerProps {
  day: number;
  periodIndex: number;
  turnsCompleted: number;
}

export function MetroTracker({ day, periodIndex, turnsCompleted }: MetroTrackerProps) {
  const currentIndex = turnsCompleted; // 0-based index of the upcoming/current stop

  return (
    <div className="metro" role="img" aria-label={`Dia ${day} de 7, período ${PERIODS[periodIndex]}. Estação ${currentIndex + 1} de ${TOTAL_TURNS}.`}>
      <div className="metro__scroll">
        <div className="metro__line" />
        <div className="metro__stops">
          {Array.from({ length: TOTAL_TURNS }, (_, i) => {
            const stopDay = Math.floor(i / 3) + 1;
            const stopPeriod = i % 3;
            const isFirstOfDay = stopPeriod === 0;
            const state = i < currentIndex ? 'done' : i === currentIndex ? 'current' : 'upcoming';
            return (
              <div className="metro__stop-wrap" key={i}>
                {isFirstOfDay && <span className="metro__day-label">DIA {stopDay}</span>}
                <div className={`metro__stop metro__stop--${state}`} title={`Dia ${stopDay} · ${PERIODS[stopPeriod]}`}>
                  {state === 'current' && <span className="metro__pulse" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
