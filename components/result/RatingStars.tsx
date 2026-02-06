'use client';

import { Star } from 'lucide-react';
import { useState } from 'react';

interface RatingStarsProps {
  rating: number;
  onRate: (rating: number) => void;
  size?: number;
}

export default function RatingStars({ rating, onRate, size = 16 }: RatingStarsProps) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= (hovered || rating);
        return (
          <button
            key={star}
            onClick={() => onRate(star === rating ? 0 : star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className="p-0.5 transition-transform hover:scale-110"
          >
            <Star
              size={size}
              fill={isActive ? 'var(--accent-warning)' : 'none'}
              style={{
                color: isActive ? 'var(--accent-warning)' : 'var(--text-muted)',
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
