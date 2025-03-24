import {
  fetchSpecialCategories,
  fetchClientSpecialCategories,
  fetchSpecialCategoryById,
  fetchSpecialCategoryBySlug,
} from '@/api/special-categories';
import { SpecialCategoryDetailResponse, SpecialCategoryResponse } from '@/types/special-category';
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

  /**
   * Hook to fetch special categories for client display
   * @returns Query result with special categories data, loading state, and error handling
   */
  const useGetClientSpecialCategories = () => {
    return useQuery<SpecialCategoryResponse, Error>({
      queryKey: ['client-special-categories'],
      queryFn: () => fetchClientSpecialCategories(),
      select: (data) => data,
      staleTime: 1000 * 60 * 5, // 5 minutes cache
    });
  };

  /**
   * Hook to fetch a specific special category by ID
   * @param id - The ID of the special category to fetch
   * @returns Query result with special category details, loading state, and error handling
   */
  const useGetSpecialCategoryById = (id: string) => {
    return useQuery<SpecialCategoryDetailResponse, Error>({
      queryKey: ['special-category', id],
      queryFn: () => fetchSpecialCategoryById(id),
      select: (data) => data,
      staleTime: 1000 * 60 * 5, // 5 minutes cache
      enabled: !!id, // Only run the query if an ID is provided
    });
  };

  /**
   * Hook to fetch a specific special category by slug
   * @param slug - The slug of the special category to fetch
   * @returns Query result with special category details, loading state, and error handling
   */
  const useGetSpecialCategoryBySlug = (slug: string) => {
    return useQuery<SpecialCategoryDetailResponse, Error>({
      queryKey: ['special-category-slug', slug],
      queryFn: () => fetchSpecialCategoryBySlug(slug),
      select: (data) => data,
      staleTime: 1000 * 60 * 5, // 5 minutes cache
      enabled: !!slug, // Only run the query if a slug is provided
    });
  };

  return {
    useGetSpecialCategories,
    useGetClientSpecialCategories,
    useGetSpecialCategoryById,
    useGetSpecialCategoryBySlug,
  };
}
