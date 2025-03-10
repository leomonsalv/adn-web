import { fetchBanners } from '@/api/banners';
import { Banner, BannerResponse } from '@/types/banner';
import { useQuery } from '@tanstack/react-query';

interface UseBannersParams {
  active?: boolean;
}

export default function useBanners() {
  /**
   * Hook to fetch banners with optional filtering by active status
   * @param params - Optional parameters for filtering banners
   * @returns Query result with banners data, loading state, and error handling
   */
  const useGetBanners = (params: UseBannersParams = {}) => {
    return useQuery<BannerResponse, Error>({
      queryKey: ['banners', params],
      queryFn: () => fetchBanners(params),
      select: (data) => data,
      staleTime: 1000 * 60 * 5, // 5 minutes cache
    });
  };

  return { useGetBanners };
}
