import {
  fetchProductsByIds,
  fetchRecommendedProducts,
  fetchTopSellingProducts,
} from '@/api/products';
import { RecommendedProductsPayload, TopSellingProductsPayload } from '@/types/product';
import { useQuery } from '@tanstack/react-query';

export default function useProducts() {
  const useGetProductById = (id: number) => {
    return useQuery({
      queryKey: ['product', id],
      queryFn: () => fetchProductsByIds([id]),
      select: (data) => data.data[0],
    });
  };
  const useGetRecommendedProducts = (payload: RecommendedProductsPayload) => {
    return useQuery({
      queryKey: ['product', payload],
      queryFn: () => fetchRecommendedProducts(payload),
      select: (data) => data,
    });
  };

  const useGetTopSellingProducts = (payload: TopSellingProductsPayload) => {
    return useQuery({
      queryKey: ['topSellersProduct', payload],
      queryFn: () => fetchTopSellingProducts(payload),
      select: (data) => data.data,
    });
  };

  return { useGetProductById, useGetRecommendedProducts, useGetTopSellingProducts };
}
