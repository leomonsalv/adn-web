import { getCategories } from '@/api/categories';
import { useQuery } from '@tanstack/react-query';

export default function useCategories() {
  const useGetCategories = () => {
    return useQuery({
      queryKey: ['categories'],
      queryFn: () => getCategories(),
      select: (data) => data,
    });
  };

  return { useGetCategories };
}
