import { fetchProductsByIds, fetchRecommendedProducts } from '@/api/products';
import { RecommendedProductsPayload } from '@/types/product';
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
    console.log('🚀 ~ useGetRecommendedProducts ~ payload:', payload);
    return useQuery({
      queryKey: ['product', payload],
      queryFn: () => fetchRecommendedProducts(payload),
      select: (data) => data,
    });
  };

  return { useGetProductById, useGetRecommendedProducts };
}
