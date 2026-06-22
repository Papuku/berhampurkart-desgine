import { Star } from 'lucide-react';

export default function StarRating({ rating, size = 16, showValue = false }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={
            star <= Math.round(rating)
              ? 'fill-brand-orange text-brand-orange'
              : 'fill-gray-200 text-gray-200'
          }
        />
      ))}
      {showValue && (
        <span className="ml-1 text-sm font-medium text-gray-600">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
