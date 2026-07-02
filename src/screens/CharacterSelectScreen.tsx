import { CHARACTERS } from '../data/characters';
import { RESOURCE_META } from '../types';
import type { Character, Resources } from '../types';
import { Card } from '../components/Card';
import './CharacterSelectScreen.css';

interface CharacterSelectScreenProps {
  onSelect: (character: Character) => void;
}

function ModifierChips({ modifiers }: { modifiers: Partial<Resources> }) {
  return (
    <div className="char-card__mods">
      {(Object.keys(modifiers) as (keyof Resources)[]).map((key) => {
        const value = modifiers[key] ?? 0;
        const positive = value > 0;
        return (
          <span key={key} className={`char-chip ${positive ? 'char-chip--pos' : 'char-chip--neg'}`}>
            {RESOURCE_META[key].icon} {positive ? '+' : ''}
            {value}
          </span>
        );
      })}
    </div>
  );
}

export function CharacterSelectScreen({ onSelect }: CharacterSelectScreenProps) {
  return (
    <div className="char-select">
      <div className="eyebrow">ESCOLHA SEU PERSONAGEM</div>
      <h2 className="char-select__title">Quem chegou em São Paulo?</h2>
      <p className="char-select__subtitle">Cada ponto de partida muda como a semana começa.</p>

      <div className="char-select__grid">
        {CHARACTERS.map((character) => (
          <Card key={character.id} className="char-card">
            <div className="char-card__emoji">{character.emoji}</div>
            <h3 className="char-card__name">{character.name}</h3>
            <p className="char-card__tagline">{character.tagline}</p>
            <p className="char-card__desc">{character.description}</p>
            <ModifierChips modifiers={character.modifiers} />
            <button className="btn btn-primary btn-block" onClick={() => onSelect(character)}>
              Escolher {character.name}
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
