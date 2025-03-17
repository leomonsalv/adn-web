import { API_URL } from '@/lib/urls';
import { GetTopSellingProductsResponse, GetHeroResponse } from '@/types/home';

interface TopSellingParams {
  limit?: number;
  page?: number;
  pageSize?: number;
}

export const getTopSellingProducts = async ({
  limit = 10,
  page = 1,
  pageSize = 10,
}: TopSellingParams = {}): Promise<GetTopSellingProductsResponse> => {
  try {
    const queryParams = new URLSearchParams({
      limit: limit.toString(),
      page: page.toString(),
      pageSize: pageSize.toString(),
    });

    const response = await fetch(`${API_URL}/home?${queryParams.toString()}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const products = await response.json();
    return products;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching top selling products:', error.message);
      throw error;
    }
    throw new Error('An unknown error occurred while fetching top selling products');
  }
};

export const getHero = async (): Promise<GetHeroResponse> => {
  try {
    const response = await fetch(`${API_URL}/home/hero`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const heroData = await response.json();
    return heroData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching hero data:', error.message);
      throw error;
    }
    throw new Error('An unknown error occurred while fetching hero data');
  }
};
