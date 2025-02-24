import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchProductReviews,
  createProductReview,
  updateProductReview,
  deleteProductReview,
  markReviewAsHelpful,
  type ReviewPayload,
  type ReviewUpdatePayload,
  type ReviewsParams,
  markReviewAsNotHelpful,
} from '@/api/reviews';

export function useReviews() {
  const queryClient = useQueryClient();

  const useGetProductReviews = (params: ReviewsParams) => {
    return useQuery({
      queryKey: ['reviews', params.productId, params.page, params.pageSize, params.sort],
      queryFn: () => fetchProductReviews(params),
    });
  };

  const useCreateReview = () => {
    return useMutation({
      mutationFn: ({ userToken, ...review }: ReviewPayload & { userToken: string }) =>
        createProductReview(review, userToken),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['reviews'] });
      },
    });
  };

  const useUpdateReview = () => {
    return useMutation({
      mutationFn: ({ reviewId, updates }: { reviewId: string; updates: ReviewUpdatePayload }) =>
        updateProductReview(reviewId, updates),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['reviews'] });
      },
    });
  };

  const useDeleteReview = () => {
    return useMutation({
      mutationFn: (reviewId: string) => deleteProductReview(reviewId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['reviews'] });
      },
    });
  };

  const useMarkHelpful = () => {
    return useMutation({
      mutationFn: ({
        reviewId,
        isHelpful,
        token,
      }: {
        reviewId: string;
        isHelpful: boolean;
        token: string;
      }) => {
        return isHelpful
          ? markReviewAsHelpful(reviewId, token)
          : markReviewAsNotHelpful(reviewId, token);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['reviews'] });
      },
    });
  };

  return {
    useGetProductReviews,
    useCreateReview,
    useUpdateReview,
    useDeleteReview,
    useMarkHelpful,
  };
}

export default useReviews;
