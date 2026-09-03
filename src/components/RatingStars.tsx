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
  size = 15,
}: RatingStarsProps) {
  const roundedScore = Math.round(score * 10) / 10;
  const fullStars = Math.floor(roundedScore);
  const hasHalfStar = roundedScore - fullStars >= 0.3 && roundedScore - fullStars <= 0.7;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.15rem', color: '#d97706' }}>
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} size={size} fill="#d97706" stroke="#d97706" />
        ))}
        {hasHalfStar && (
          <StarHalf size={size} fill="#d97706" stroke="#d97706" />
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} size={size} stroke="var(--slate-300)" color="var(--slate-300)" />
        ))}
      </div>

      {showScore && (
        <span style={{ fontWeight: 800, fontSize: `${size * 0.9}px`, color: 'var(--slate-900)' }}>
          {roundedScore.toFixed(1)}
        </span>
      )}

      {count !== undefined && (
        <span style={{ fontSize: `${size * 0.8}px`, color: 'var(--slate-500)' }}>
          ({count.toLocaleString()} {count === 1 ? 'review' : 'reviews'})
        </span>
      )}
    </div>
  );
}
