import './Bar.css';

interface BarProps {
  label: string;
  icon: string;
  value: number;
  max?: number;
  tone?: 'default' | 'danger';
  compact?: boolean;
}

export function Bar({ label, icon, value, max = 100, tone, compact }: BarProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const isCritical = value <= 15;
  const resolvedTone = tone ?? (isCritical ? 'danger' : 'default');

  return (
    <div className={`bar ${compact ? 'bar--compact' : ''}`}>
      <div className="bar__head">
        <span className="bar__label">
          <span aria-hidden="true">{icon}</span> {label}
        </span>
        <span className="bar__value">{Math.round(value)}</span>
      </div>
      <div className="bar__track">
        <div
          className={`bar__fill bar__fill--${resolvedTone}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
