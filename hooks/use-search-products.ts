import { fetchProducts } from '@/api/products';
import { useQuery } from '@tanstack/react-query';
import { GetSearchCateroriesResponse } from '@/types/categories';

interface SearchFormType {
  query: string;
  filters?: Record<string, string[]>;
}

export default function useSearchProduct() {
  const searchProducts = (params: SearchFormType) => {
    return useQuery<GetSearchCateroriesResponse>({
      queryKey: ['search-products', params.query, params.filters],
      queryFn: async () => {
        const response = await fetchProducts(params);
        return response as GetSearchCateroriesResponse;
      },
      placeholderData: (prevData) => prevData,
      staleTime: 1000 * 60,
    });
  };

  return { searchProducts };
}

export type { SearchFormType };
