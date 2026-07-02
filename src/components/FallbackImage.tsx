import { useState } from 'react';
import './FallbackImage.css';

interface FallbackImageProps {
  src: string;
  alt: string;
  fallbackEmoji: string;
  className?: string;
}

export function FallbackImage({ src, alt, fallbackEmoji, className = '' }: FallbackImageProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className={`fallback-image fallback-image--emoji ${className}`} aria-label={alt}>
        <span>{fallbackEmoji}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`fallback-image ${className}`}
      onError={() => setErrored(true)}
      loading="lazy"
    />
  );
}
