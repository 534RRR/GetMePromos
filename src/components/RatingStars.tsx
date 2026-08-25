import React from 'react';
import { Star, StarHalf } from 'lucide-react';

interface RatingStarsProps {
  score: number; // 0 to 5
  count?: number;
  showScore?: boolean;
  size?: number;
}

export default function RatingStars({
  score,
  count,
  showScore = true,
  size = 16,
}: RatingStarsProps) {
  const roundedScore = Math.round(score * 10) / 10;
  const fullStars = Math.floor(roundedScore);
  const hasHalfStar = roundedScore - fullStars >= 0.3 && roundedScore - fullStars <= 0.7;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.15rem', color: '#eab308' }}>
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} size={size} fill="#eab308" stroke="#eab308" />
        ))}
        {hasHalfStar && (
          <StarHalf size={size} fill="#eab308" stroke="#eab308" />
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} size={size} stroke="#cbd5e1" color="#cbd5e1" />
        ))}
      </div>

      {showScore && (
        <span style={{ fontWeight: 700, fontSize: `${size * 0.9}px`, color: 'var(--text-main)' }}>
          {roundedScore.toFixed(1)}
        </span>
      )}

      {count !== undefined && (
        <span style={{ fontSize: `${size * 0.8}px`, color: 'var(--text-muted)' }}>
          ({count.toLocaleString()} {count === 1 ? 'review' : 'reviews'})
        </span>
      )}
    </div>
  );
}
