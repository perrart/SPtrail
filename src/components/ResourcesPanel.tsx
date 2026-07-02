import type { Resources } from '../types';
import { RESOURCE_META } from '../types';
import { Bar } from './Bar';
import './ResourcesPanel.css';

interface ResourcesPanelProps {
  resources: Resources;
  compact?: boolean;
}

const ORDER: (keyof Resources)[] = ['money', 'energy', 'mental', 'contacts', 'reputation'];

export function ResourcesPanel({ resources, compact }: ResourcesPanelProps) {
  return (
    <div className={`resources-panel ${compact ? 'resources-panel--compact' : ''}`}>
      {ORDER.map((key) => (
        <Bar
          key={key}
          label={RESOURCE_META[key].label}
          icon={RESOURCE_META[key].icon}
          value={resources[key]}
          compact={compact}
        />
      ))}
    </div>
  );
}
