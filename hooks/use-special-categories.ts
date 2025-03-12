import { fetchSpecialCategories } from '@/api/special-categories';
import { SpecialCategory, SpecialCategoryResponse } from '@/types/special-category';
import { useQuery } from '@tanstack/react-query';

interface UseSpecialCategoriesParams {
  active?: boolean;
}

export default function useSpecialCategories() {
  /**
   * Hook to fetch special categories with optional filtering by active status
   * @param params - Optional parameters for filtering special categories
   * @returns Query result with special categories data, loading state, and error handling
   */
  const useGetSpecialCategories = (params: UseSpecialCategoriesParams = {}) => {
    return useQuery<SpecialCategoryResponse, Error>({
      queryKey: ['special-categories', params],
      queryFn: () => fetchSpecialCategories(params),
      select: (data) => data,
      staleTime: 1000 * 60 * 5, // 5 minutes cache
    });
  };

  return { useGetSpecialCategories };
}
