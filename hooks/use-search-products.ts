import { useState, useCallback } from 'react';
import { fetchProducts, fetchProductsSuggestions } from '@/api/products';
import { useQuery } from '@tanstack/react-query';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useDebounce } from '@/hooks/use-debounce';
import { SearchFormType, SearchResponse } from '@/types/search';

export default function useSearchProduct() {
  const queryClient = useQueryClient();

  const [searchOptions, setSearchOptions] = useState<SearchFormType>({
    query: '',
    pageSize: 10,
  });

  const debouncedOptions = useDebounce(searchOptions, 500);

  const searchProducts = (params: SearchFormType) => {
    return useInfiniteQuery({
      queryKey: ['search-products', debouncedOptions],
      queryFn: async ({ pageParam }) => {
        const currentPage = typeof pageParam === 'number' ? pageParam : 1;

        const searchParams = {
          search: params.search || '',
          page: currentPage,
          pageSize: params.pageSize || 10,
          sort: params.sort || '',
          lab: params.lab || '',
          saveExcel: 'false',
        };

        try {
          const response = await fetchProducts(searchParams);
          console.log('🚀 ~ queryFn: ~ response:', response);
          // Transform the response to match expected structure
          return {
            data: response,
            pagination: {
              current: currentPage,
              total_pages: response.pagination?.totalPages || 1,
              total: response.pagination?.total || 0,
            },
          };
        } catch (error) {
          console.error('Search error:', error);
          throw error;
        }
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (
          !lastPage.pagination ||
          lastPage.pagination.current >= lastPage.pagination.total_pages
        ) {
          return undefined;
        }
        return lastPage.pagination.current + 1;
      },
      staleTime: 1000 * 60,
      gcTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    });
  };

  // Actualizadores con tipos correctos de Zod
  const updateSort = useCallback(
    (sort: NonNullable<SearchFormType['sort']>) => {
      setSearchOptions((prev) => ({ ...prev, sort }));
      queryClient.resetQueries({ queryKey: ['search-products'] });
    },
    [queryClient],
  );

  const updatePriceRange = useCallback(
    (priceRange: NonNullable<SearchFormType['priceRange']>) => {
      setSearchOptions((prev) => ({ ...prev, priceRange }));
      queryClient.resetQueries({ queryKey: ['search-products'] });
    },
    [queryClient],
  );

  const updateFilters = useCallback(
    (facets: NonNullable<SearchFormType['facets']>) => {
      setSearchOptions((prev) => ({ ...prev, facets }));
      queryClient.resetQueries({ queryKey: ['search-products'] });
    },
    [queryClient],
  );

  const updateQuery = useCallback(
    (query: string) => {
      setSearchOptions((prev) => ({ ...prev, query }));
      queryClient.resetQueries({ queryKey: ['search-products'] });
    },
    [queryClient],
  );

  const searchSuggestions = (query: string) => {
    return useQuery({
      queryKey: ['search-suggestions', query],
      queryFn: () => fetchProductsSuggestions(query),
      enabled: query.length > 2,
    });
  };

  return {
    searchProducts,
    updateSort,
    updatePriceRange,
    updateFilters,
    updateQuery,
    searchOptions: debouncedOptions,
    searchSuggestions,
  };
}

export type { SearchFormType, SearchResponse };
