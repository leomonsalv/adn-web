// api/banners.ts
import { API_URL } from '@/lib/urls';
import { Banner, BannerResponse } from '@/types/banner';

interface BannerParams {
  active?: boolean;
}

/**
 * Fetches banners with optional filtering by active status
 * @param active - Optional boolean to filter banners by active status
 * @returns Promise with banners array and total count
 */
export const fetchBanners = async ({ active }: BannerParams = {}): Promise<BannerResponse> => {
  try {
    const queryParams = new URLSearchParams();

    // Add active filter if provided
    if (active !== undefined) {
      queryParams.append('active', active.toString());
    }

    const response = await fetch(
      `${API_URL}/api/banners/client${queryParams.toString() ? `?${queryParams.toString()}` : ''}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching banners:', error.message);
      throw error;
    }
    throw new Error('An unknown error occurred while fetching banners');
  }
};
