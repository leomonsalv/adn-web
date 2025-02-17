import {
  fetchProductById,
  fetchProductsByIds,
  fetchRecommendedProducts,
  fetchTopSellingProducts,
  getDeliveryPrice,
} from '@/api/products';
import { RecommendedProductsPayload, TopSellingProductsPayload } from '@/types/product';
import { useQuery } from '@tanstack/react-query';

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

  return { useGetProductById, useGetRecommendedProducts, useGetTopSellingProducts, useGetDelivery };
}
