import { useQuery } from '@tanstack/react-query';
import { getTopSellingProducts } from '@/api/home';

interface UseTopSellingProps {
  limit?: number;
  page?: number;
  pageSize?: number;
}

export default function useTopSelling({
  limit = 10,
  page = 1,
  pageSize = 10,
}: UseTopSellingProps = {}) {
  return useQuery({
    queryKey: ['topSelling', { limit, page, pageSize }],
    queryFn: () => getTopSellingProducts({ limit, page, pageSize }),
  });
}
