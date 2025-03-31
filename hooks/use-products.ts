import {
  fetchProductById,
  fetchProductsByIds,
  fetchRecommendations,
  fetchSuggestions,
  getDeliveryPrice,
} from '@/api/products';
import { SuggestionsProductsPayload, RecommendedForUserPayload } from '@/types/product';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/use-auth';

export default function useProducts() {
  const useGetProductById = (id: string) => {
    return useQuery({
      queryKey: ['product', id],
      queryFn: () => fetchProductById(id),
      select: (data) => data,
    });
  };
  const useGetDelivery = () => {
    return useQuery({
      queryKey: ['deliveryProduct'],
      queryFn: () => getDeliveryPrice(),
      select: (data) => data,
      staleTime: 1000 * 60 * 5, // Cache de 5 minutos
    });
  };
  const useGetRecommendations = (payload: SuggestionsProductsPayload) => {
    return useQuery({
      queryKey: ['product', payload],
      queryFn: () => {
        const productId = payload.products?.[0];
        if (!productId) {
          // Don't make the API call if productId is not available
          return Promise.reject(new Error('Product ID is required for fetching suggestions'));
        }
        return fetchRecommendations({
          ...payload,
          productId,
        });
      },
      select: (data) => data,
    });
  };

  const useGetSuggestions = (payload: RecommendedForUserPayload) => {
    return useQuery({
      queryKey: ['recommendedForUser', payload],
      queryFn: () => {
        const productId = payload.productId || payload.products?.[0];
        if (!productId) {
          // Don't make the API call if productId is not available
          return Promise.reject(new Error('Product ID is required for fetching suggestions'));
        }
        return fetchSuggestions({
          ...payload,
          productId,
        });
      },
      select: (data) => data,
      // Don't retry if the error is due to missing productId
      retry: (failureCount, error) => {
        if (
          error instanceof Error &&
          error.message === 'Product ID is required for fetching suggestions'
        ) {
          return false;
        }
        return failureCount < 3;
      },
    });
  };

  return { useGetProductById, useGetRecommendations, useGetSuggestions, useGetDelivery };
}
