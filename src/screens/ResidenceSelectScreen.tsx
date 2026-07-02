import { DISTRICTS } from '../data/districts';
import type { Zone } from '../types';
import { Card } from '../components/Card';
import { FallbackImage } from '../components/FallbackImage';
import { districtImagePath } from '../utils/images';
import './ResidenceSelectScreen.css';

interface ResidenceSelectScreenProps {
  onSelect: (districtId: string) => void;
}

const ZONE_ORDER: Zone[] = ['Centro', 'Norte', 'Sul', 'Leste', 'Oeste'];

export function ResidenceSelectScreen({ onSelect }: ResidenceSelectScreenProps) {
  return (
    <div className="residence-select">
      <div className="eyebrow">ONDE VOCÊ VAI MORAR?</div>
      <h2 className="residence-select__title">Escolha seu bairro</h2>
      <p className="residence-select__subtitle">
        O aluguel é descontado uma vez, no meio da semana. Bairros mais centrais e badalados custam mais caro.
      </p>

      {ZONE_ORDER.map((zone) => (
        <section key={zone} className="residence-select__zone">
          <h3 className="residence-select__zone-title">Zona {zone}</h3>
          <div className="residence-select__grid">
            {DISTRICTS.filter((d) => d.zone === zone).map((district) => (
              <Card
                key={district.id}
                onClick={() => onSelect(district.id)}
                className="residence-card"
              >
                <FallbackImage
                  src={districtImagePath(district, 'Manhã')}
                  alt={district.name}
                  fallbackEmoji={district.emoji}
                  className="residence-card__img"
                />
                <div className="residence-card__name">{district.name}</div>
                <div className="residence-card__rent">Aluguel: R$ {district.rent}/semana</div>
                <p className="residence-card__desc">{district.description}</p>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
