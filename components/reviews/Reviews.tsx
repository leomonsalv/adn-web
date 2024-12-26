import { classNames } from '@/lib/utils';
import { StarIcon } from '@heroicons/react/24/solid';

interface ReviewsProps {
  rating: number;
  reviewCount: number;
  showAllReviews?: boolean;
}

export default function Reviews({ rating, reviewCount, showAllReviews = true }: ReviewsProps) {
  return (
    <div className="mt-4">
      <h2 className="sr-only">Reviews</h2>
      <div className="flex items-center">
        <p className="text-sm text-gray-700">
          {rating}
          <span className="sr-only"> out of 5 stars</span>
        </p>
        <div className="ml-1 flex items-center">
          {[0, 1, 2, 3, 4].map((stars) => (
            <StarIcon
              key={stars}
              aria-hidden="true"
              className={classNames(
                rating > stars ? 'text-yellow-400' : 'text-gray-200',
                'size-5 shrink-0',
              )}
            />
          ))}
        </div>
        {showAllReviews && (
          <>
            <div aria-hidden="true" className="ml-4 text-sm text-gray-300">
              ·
            </div>
            <div className="ml-4 flex">
              <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                See all {reviewCount} reviews
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
