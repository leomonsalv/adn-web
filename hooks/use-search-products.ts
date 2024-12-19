import { fetchProducts, fetchProductsSuggestions } from '@/api/products';
import { useQuery } from '@tanstack/react-query';

interface SearchFormType {
  query: string;
  filters?: Record<string, string[]>;
}

export default function useSearchProduct() {
  const searchProducts = (params: SearchFormType) => {
    return useQuery({
      queryKey: ['search-products', ...Object.values(params)],
      queryFn: async () => fetchProducts(params),
      staleTime: 1000 * 60,
    });
  };

  const searchSuggestions = (query: string) => {
    return useQuery({
      queryKey: ['search-suggestions', query],
      queryFn: () => fetchProductsSuggestions(query),
      enabled: query.length > 2,
    });
  };

  return { searchProducts, searchSuggestions };
}
