import { Product } from '@/types/product';
import { StarIcon } from '@heroicons/react/24/solid';
import { Button } from '../ui/button';
import { ReviewFormData, ReviewsResponse } from '@/types/review';
import TopReviews from './TopReviews';
import useReviews from '@/hooks/use-reviews';
import { useState, useEffect } from 'react';
import { CreateReviewDialog } from './CreateReviewDialog';
import { useToast } from '@/hooks/use-toast';
import { getFirebaseAuthUser } from '@/lib/firebaseConfig';
type Props = {
  productData: Product;
  reviews?: ReviewsResponse;
  isLoading?: boolean;
};

function ReviewsSection({ productData, reviews, isLoading }: Props) {
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [userHasReviewed, setUserHasReviewed] = useState<boolean | undefined>(undefined);
  const totalReviews = reviews?.totalItems || 0;
  const averageRating = reviews?.metadata.averageRating || 0;

  const canReview =
    userHasReviewed !== undefined ? !userHasReviewed : !reviews?.hasReviewed || false;

  const { useCreateReview, useMarkHelpful } = useReviews();
  const { mutate: markHelpful } = useMarkHelpful();
  const { mutate: createReview } = useCreateReview();
  const { toast } = useToast();

  useEffect(() => {
    if (reviews) {
      setUserHasReviewed(reviews.hasReviewed || false);
    }

    const checkUserReviewStatus = async () => {
      try {
        const user = await getFirebaseAuthUser();
        if (user && reviews?.data) {
          const userReview = reviews.data.find((review) => review.UserID === user.uid);
          setUserHasReviewed(!!userReview);
        }
      } catch (error) {
        console.error('Error buscando si ya hizo review:', error);
      }
    };

    checkUserReviewStatus();
  }, [reviews]);

  const handleMarkHelpful = (reviewId: string, isHelpful: boolean) => {
    markHelpful(
      {
        reviewId,
        isHelpful,
      },
      {
        onSuccess: () => {
          toast({
            title: 'Review registrada',
            description: 'Gracias por tu review!',
          });
        },
        onError: (error) => {
          console.error('Error marking review:', error);
          toast({
            title: 'Error',
            description: 'No se pudo registrar tu review, intente mas tarde.',
            variant: 'destructive',
          });
        },
      },
    );
  };

  const handleCreateReview = async (data: ReviewFormData) => {
    const reviewPayload = {
      ProductID: data.productId,
      Rating: data.rating,
      Title: data.title,
      Comment: data.comment,
    };
    createReview(reviewPayload, {
      onSuccess: () => {
        setUserHasReviewed(true);
        setIsReviewDialogOpen(false);
      },
      onError: (error) => {
        console.error('Error creando review:', error);
        toast({
          title: 'Error',
          description: 'No se pudo crear tu reseña, intente más tarde.',
          variant: 'destructive',
        });
      },
    });
  };

  // Convert rating counts to percentage
  const ratings = [
    {
      stars: 5,
      percentage: calculatePercentage(reviews?.metadata.ratingCounts.fiveStar || 0, totalReviews),
    },
    {
      stars: 4,
      percentage: calculatePercentage(reviews?.metadata.ratingCounts.fourStar || 0, totalReviews),
    },
    {
      stars: 3,
      percentage: calculatePercentage(reviews?.metadata.ratingCounts.threeStar || 0, totalReviews),
    },
    {
      stars: 2,
      percentage: calculatePercentage(reviews?.metadata.ratingCounts.twoStar || 0, totalReviews),
    },
    {
      stars: 1,
      percentage: calculatePercentage(reviews?.metadata.ratingCounts.oneStar || 0, totalReviews),
    },
  ];

  function calculatePercentage(count: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((count / total) * 100);
  }

  if (isLoading) {
    return <div>Loading reviews...</div>;
  }

  return (
    <div>
      <div className="py-8">
        <h2 className="text-2xl font-bold mb-4">Calificaciones y comentarios</h2>

        <div className="flex items-center gap-2 mb-6">
          <span className="text-lg">{averageRating.toFixed(2)}</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(averageRating) ? 'text-yellow-400' : 'text-gray-200'
                }`}
              />
            ))}
          </div>
          <span className="text-blue-600 ml-2">({totalReviews.toFixed(2)})</span>
        </div>
      </div>

      <section className="py-2 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-8">
        <div className="flex flex-col md:flex-row gap-8 border-b lg:border-b-0 lg:border-r border-gray-200 w-full lg:w-1/2 px-4 lg:px-8 pb-8 lg:pb-0">
          {/* Left side - Average rating */}
          <div className="w-full md:w-64 p-6 bg-gray-50 rounded-lg text-center">
            <div className="text-4xl font-bold mb-1">{averageRating.toFixed(2)}</div>
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(averageRating) ? 'text-yellow-400' : 'text-gray-200'
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-500">Basado en {totalReviews} reseñas</div>
          </div>

          {/* Right side - Rating breakdown */}
          <div className="flex-1">
            {ratings.map(({ stars, percentage }) => (
              <div key={stars} className="flex items-center mb-2">
                <div className="w-8 text-sm">{stars}</div>
                <StarIcon className="h-4 w-4 text-yellow-400 mr-2" />
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-yellow-400 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="w-12 text-sm text-right">{percentage}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Comments Section */}
        {canReview && (
          <section className="w-full lg:w-auto px-4 lg:px-0">
            <div className="max-w-2xl lg:max-w-none mx-auto">
              <h3 className="text-lg font-medium leading-7 mb-2">Comparte tu opinión</h3>
              <p className="text-gray-600 mb-4 font-normal leading-5">
                Si ha utilizado este producto, comparta su opinión con otros clientes.
              </p>
              <Button
                color="white"
                className="w-full bg-black text-white hover:bg-gray-800"
                onClick={() => setIsReviewDialogOpen(true)}
              >
                Escribir una reseña
              </Button>

              <CreateReviewDialog
                isOpen={isReviewDialogOpen}
                onClose={() => setIsReviewDialogOpen(false)}
                onSubmit={handleCreateReview}
                productId={productData.productId}
              />
            </div>
          </section>
        )}
        {!canReview && (
          <section className="w-full lg:w-auto px-4 lg:px-0">
            <div className="max-w-2xl lg:max-w-none mx-auto">
              <h3 className="text-lg font-medium leading-7 mb-2">Gracias por tu opinión</h3>
              <p className="text-gray-600 mb-4 font-normal leading-5">
                Valoramos mucho tu opinión.
              </p>
            </div>
          </section>
        )}
      </section>

      {/* Reviews list */}
      {reviews?.data && reviews.data.length > 0 ? (
        <TopReviews reviews={reviews?.data || []} onMarkHelpful={handleMarkHelpful} />
      ) : (
        <p className="text-center text-gray-500">No hay reseñas todavía.</p>
      )}
    </div>
  );
}

export default ReviewsSection;
