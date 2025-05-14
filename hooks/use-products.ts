import {
  fetchProductById,
  fetchProductsBatch,
  fetchProductsByIds,
  fetchProductsList,
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
  const useGetProductsList = (productIds: string[]) => {
    return useQuery({
      queryKey: ['productsList', productIds],
      queryFn: () => {
        if (!Array.isArray(productIds) || productIds.length === 0) {
          // No realizar la llamada API si no hay IDs de productos
          return Promise.reject(new Error('Se requiere un array de IDs de productos no vacío'));
        }
        return fetchProductsList(productIds);
      },
      select: (data) => data,
      // No reintentar si el error se debe a un array de IDs vacío
      retry: (failureCount, error) => {
        if (
          error instanceof Error &&
          error.message === 'Se requiere un array de IDs de productos no vacío'
        ) {
          return false;
        }
        return failureCount < 3;
      },
      placeholderData: (previousData: any) => previousData, // Mantener los datos anteriores mientras se recargan
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
      placeholderData: (previousData: any) => previousData, // Mantener los datos anteriores mientras se recargan
    });
  };

  const useGetProductsBatch = (cartProducts: { id: number; quantity: number }[]) => {
    return useQuery({
      queryKey: ['productsBatch', cartProducts],
      queryFn: () => {
        if (!Array.isArray(cartProducts) || cartProducts.length === 0) {
          // No realizar la llamada API si no hay productos en el carrito
          return Promise.reject(new Error('Se requiere un array de productos no vacío'));
        }
        // Transformar los productos del carrito al formato requerido por la API
        const cartItems = cartProducts.map((product) => ({
          id: product.id.toString(),
          quantity: product.quantity,
        }));
        return fetchProductsBatch(cartItems);
      },
      select: (data) => data,
      // No reintentar si el error se debe a un array vacío
      retry: (failureCount, error) => {
        if (
          error instanceof Error &&
          error.message === 'Se requiere un array de productos no vacío'
        ) {
          return false;
        }
        return failureCount < 3;
      },
      placeholderData: (previousData: any) => previousData, // Mantener los datos anteriores mientras se recargan
    });
  };
  return {
    useGetProductById,
    useGetRecommendations,
    useGetSuggestions,
    useGetDelivery,
    useGetProductsList,
    useGetProductsBatch,
  };
}
