import { Review } from '@/types/review';
import { StarIcon } from '@heroicons/react/24/solid';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/button';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/es';

dayjs.extend(relativeTime);
dayjs.locale('es');

interface TopReviewsProps {
  reviews: Review[];
  onMarkHelpful?: (reviewId: string, isHelpful: boolean) => void;
}

export default function TopReviews({ reviews, onMarkHelpful }: TopReviewsProps) {
  const getTimeAgo = (dateString: string) => {
    return dayjs(dateString).fromNow();
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Top reviews</h3>
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-200'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">{getTimeAgo(review.created_at)}</span>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm font-medium">Usuario {review.userID}</span>
              {review.verified && (
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircleIcon className="h-4 w-4" />
                  <span className="text-sm">Comprador verificado</span>
                </div>
              )}
            </div>

            <h4 className="font-medium mt-2">{review.title}</h4>
            <p className="text-gray-600 mt-1">{review.comment}</p>

            {review.images && review.images.length > 0 && (
              <div className="flex gap-2 mt-3">
                {review.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Imagen de producto ${index + 1}`}
                    className="h-20 w-20 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}

            <div className="mt-4 flex items-center gap-4 justify-between">
              <span className="text-sm text-gray-500">
                {review.helpful} personas encontraron útil esta reseña. ¿Te ayudó?
              </span>
              <div className="flex gap-2">
                <Button
                  color="white"
                  className=" border-0"
                  onClick={() => onMarkHelpful?.(review.id, true)}
                >
                  Es de utilidad
                </Button>
                <Button color="white" onClick={() => onMarkHelpful?.(review.id, false)}>
                  No es de utilidad
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
