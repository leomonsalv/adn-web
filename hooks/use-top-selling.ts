import { useQuery } from '@tanstack/react-query';
import { getTopSellingProducts, getHero } from '@/api/home';
import { GetTopSellingProductsResponse, GetHeroResponse } from '@/types/home';

interface UseTopSellingProps {
  limit?: number;
  page?: number;
  pageSize?: number;
}

interface UseTopSellingResult {
  topProducts: GetTopSellingProductsResponse | undefined;
  heroData: GetHeroResponse | undefined;
  isLoading: boolean;
  error: Error | null;
}

export default function useTopSelling({
  limit = 10,
  page = 1,
  pageSize = 10,
}: UseTopSellingProps = {}): UseTopSellingResult {
  const topSellingQuery = useQuery({
    queryKey: ['topSelling', { limit, page, pageSize }],
    queryFn: () => getTopSellingProducts({ limit, page, pageSize }),
  });

  const heroQuery = useQuery({
    queryKey: ['hero'],
    queryFn: () => getHero(),
  });

  return {
    topProducts: topSellingQuery.data,
    heroData: heroQuery.data,
    isLoading: topSellingQuery.isLoading || heroQuery.isLoading,
    error: topSellingQuery.error || heroQuery.error,
  };
}
