import { getCategories } from '@/api/categories';
import { Category } from '@/types/categories';
import { useQuery } from '@tanstack/react-query';

interface UseCategoriesProps {
  slug?: string;
}

export default function useCategories({ slug }: UseCategoriesProps = {}) {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['categories', slug],
    queryFn: () => getCategories({ slug }),
    select: (data) => data,
  });

  const getCategoryBySlug = (searchSlug: string) => {
    return useQuery({
      queryKey: ['category', searchSlug],
      queryFn: () => getCategories({ slug: searchSlug }),
      select: (data) => data[0],
      enabled: !!searchSlug,
    });
  };

  return {
    categories,
    isLoading,
    error,
    getCategoryBySlug,
  };
}
