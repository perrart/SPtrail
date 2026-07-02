import type { ReactNode } from 'react';
import './Card.css';

interface CardProps {
  children: ReactNode;
  onClick?: () => void;
  selected?: boolean;
  as?: 'div' | 'button';
  className?: string;
}

export function Card({ children, onClick, selected, as = 'div', className = '' }: CardProps) {
  const classes = `card ${selected ? 'card--selected' : ''} ${onClick ? 'card--interactive' : ''} ${className}`;

  if (as === 'button' || onClick) {
    return (
      <button type="button" className={classes} onClick={onClick}>
        {children}
      </button>
    );
  }
  return <div className={classes}>{children}</div>;
}
