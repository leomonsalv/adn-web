import { fetchProducts, fetchProductsSuggestions } from '@/api/products';
import { useQuery } from '@tanstack/react-query';
import { useState, useCallback, useRef } from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { GetSearchCateroriesResponse } from '@/types/categories';
import { useDebounce } from '@/hooks/use-debounce';

interface SortOption {
  field: 'price' | 'price_extra' | 'name' | 'qty_available' | 'x_studio_laboratory';
  order: 'asc' | 'desc';
}

interface PriceRange {
  from: number;
  to: number;
}

interface SearchFormType {
  query: string;
  pageSize?: number;
  actualPage?: number;
  stock?: boolean;
  category?: string | string[];
  carousel?: boolean;
  type?: 'libre' | 'prescripcion' | 'tienda';
  sort?: SortOption;
  priceRange?: PriceRange;
  facets?: {
    x_studio_laboratory?: string[];
    x_studio_active_ingredient?: string[];
    [key: string]: string[] | undefined;
  };
  suggest?: boolean;
}

export default function useSearchProduct() {
  const queryClient = useQueryClient();
  const abortControllerRef = useRef<AbortController | null>(null);

  const [searchOptions, setSearchOptions] = useState<SearchFormType>({
    query: '',
    pageSize: 10,
    sort: undefined,
    priceRange: undefined,
  });

  const debouncedOptions = useDebounce(searchOptions, 500);

  // Función para cancelar la petición anterior
  const cancelPreviousRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
  }, []);

  const searchProducts = (params: SearchFormType) => {
    return useInfiniteQuery<GetSearchCateroriesResponse>({
      queryKey: ['search-products', debouncedOptions],
      queryFn: async ({ pageParam = 1 }) => {
        cancelPreviousRequest();

        const searchParams: SearchFormType = {
          ...debouncedOptions,
          ...params,
          actualPage: pageParam,
        };

        try {
          const response = await fetchProducts(searchParams, abortControllerRef.current?.signal);
          return response;
        } catch (error) {
          if (error.name === 'AbortError') {
            console.log('Request cancelled');
          }
          throw error;
        }
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.pagination.current >= lastPage.pagination.total_pages) {
          return undefined;
        }
        return lastPage.pagination.current + 1;
      },
      staleTime: 1000 * 60,
      gcTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    });
  };

  const updateSort = useCallback(
    (sortOption: SortOption) => {
      setSearchOptions((prev) => ({ ...prev, sort: sortOption }));
      queryClient.resetQueries({ queryKey: ['search-products'] });
    },
    [queryClient],
  );

  const updatePriceRange = useCallback(
    (range: PriceRange) => {
      setSearchOptions((prev) => ({ ...prev, priceRange: range }));
      queryClient.resetQueries({ queryKey: ['search-products'] });
    },
    [queryClient],
  );

  const updateFilters = useCallback(
    (newFilters: SearchFormType['facets']) => {
      setSearchOptions((prev) => ({ ...prev, facets: newFilters }));
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

export type { SearchFormType, SortOption, PriceRange };
