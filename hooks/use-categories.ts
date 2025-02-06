import { getCategories } from '@/api/categories';
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

  return {
    categories,
    isLoading,
    error,
  };
}
