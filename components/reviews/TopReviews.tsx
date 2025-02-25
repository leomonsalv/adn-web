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

  if (!Array.isArray(reviews) || reviews.length === 0) {
    return (
      <div className="mt-8 text-center">
        <h3 className="text-lg font-semibold mb-4">Top reviews</h3>
        <p className="text-gray-500">No hay reseñas disponibles.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 ">
      <h3 className="text-lg leading-6 font-semibold mb-4">Top reviews</h3>
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.ID} className="border-b border-gray-200 pb-6">
            <div className="flex flex-col lg:flex-row justify-between gap-4">
              <div className="flex-1 lg:max-w-[70%]">
                <h4 className="text-xl font-semibold break-words">{review.Title}</h4>

                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-5 w-5 ${i < review.Rating ? 'text-yellow-400' : 'text-gray-200'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {getTimeAgo(review.created_at.toString())}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span className="text-xs leading-4 font-normal">{review.UserName}</span>
                  {review.VerifiedUser && (
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircleIcon className="h-4 w-4" />
                      <span className="text-sm">Comprador verificado</span>
                    </div>
                  )}
                </div>

                <p className="text-gray-700 mt-3 break-words whitespace-pre-line">
                  {review.Comment}
                </p>
              </div>

              <div className="flex flex-col items-center gap-2 justify-end">
                <span className="text-sm text-gray-600 text-left lg:text-right">
                  {review.Helpful} personas encontraron útil esta reseña. ¿Te ayudó?
                </span>
                <div className="flex gap-2">
                  <Button
                    outline
                    className="rounded-none px-6 py-2 border hover:bg-gray-50"
                    onClick={() => onMarkHelpful?.(review.ID, true)}
                  >
                    Es de utilidad
                  </Button>
                  <Button
                    outline
                    className="rounded-none px-6 py-2 border hover:bg-gray-50"
                    onClick={() => onMarkHelpful?.(review.ID, false)}
                  >
                    No es de utilidad
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
