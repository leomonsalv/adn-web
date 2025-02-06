import { useCallback } from 'react';
import { fetchProducts, fetchProductsSuggestions } from '@/api/products';
import { useQuery } from '@tanstack/react-query';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { SearchFormType, SearchResponse } from '@/types/search';

export default function useSearchProduct() {
  const queryClient = useQueryClient();

  const searchProducts = (params: SearchFormType) => {
    return useInfiniteQuery({
      queryKey: ['search-products', params],
      queryFn: async ({ pageParam = 1 }) => {
        const searchParams = {
          category: params.category || '',
          search: params.search || '',
          page: pageParam,
          pageSize: params.pageSize || 10,
          sort: params.sort || '',
          attack: params.attack || '',
          ingredients: params.ingredients || '',
          laboratories: params.laboratories || '',
          saveExcel: 'false', //FIXME: ADD saveExcel to SearchFormType
        };
        console.log('🚀 ~ SEARCH OARMARMASMDAMS:', searchParams);

        try {
          const response = await fetchProducts({
            ...searchParams,
            // attack:
            //   typeof searchParams.attack === 'string'
            //     ? searchParams.attack
            //     : searchParams.attack?.join(',') || '',
          });
          return {
            items: response.data,
            nextPage:
              response.page < Math.ceil(response.totalItems / response.pageSize)
                ? response.page + 1
                : undefined,
            totalPages: Math.ceil(response.totalItems / response.pageSize),
            currentPage: response.page,
            totalItems: response.totalItems,
            metadata: response.metadata,
          };
        } catch (error) {
          console.error('Search error:', error);
          throw error;
        }
      },
      getNextPageParam: (lastPage) => lastPage.nextPage,
      initialPageParam: 1,
      staleTime: 1000 * 60,
      gcTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    });
  };

  const updateCategory = useCallback(
    (category: string) => {
      setSearchOptions((prev) => ({ ...prev, category }));
      queryClient.resetQueries({ queryKey: ['search-products'] });
    },
    [queryClient],
  );

  // Actualizadores con tipos correctos de Zod
  const updateSort = useCallback(
    (sort: NonNullable<SearchFormType['sort']>) => {
      queryClient.resetQueries({ queryKey: ['search-products'] });
    },
    [queryClient],
  );

  const updatePriceRange = useCallback(
    (priceRange: NonNullable<SearchFormType['priceRange']>) => {
      queryClient.resetQueries({ queryKey: ['search-products'] });
    },
    [queryClient],
  );

  const updateFilters = useCallback(
    (facets: NonNullable<SearchFormType['facets']>) => {
      queryClient.resetQueries({ queryKey: ['search-products'] });
    },
    [queryClient],
  );

  const updateQuery = useCallback(
    (query: string) => {
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
    searchSuggestions,
    updateCategory,
  };
}

export type { SearchFormType, SearchResponse };
