// api/special-categories.ts
import { API_URL } from '@/lib/urls';
import { SpecialCategory, SpecialCategoryResponse } from '@/types/special-category';

interface SpecialCategoryParams {
  active?: boolean;
}

/**
 * Fetches special categories with optional filtering by active status
 * @param active - Optional boolean to filter special categories by active status
 * @returns Promise with special categories array and total count
 */
export const fetchSpecialCategories = async ({
  active,
}: SpecialCategoryParams = {}): Promise<SpecialCategoryResponse> => {
  try {
    const queryParams = new URLSearchParams();

    // Add active filter if provided
    if (active !== undefined) {
      queryParams.append('active', active.toString());
    }

    const response = await fetch(
      `${API_URL}/api/special-categories${queryParams.toString() ? `?${queryParams.toString()}` : ''}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching special categories:', error.message);
      throw error;
    }
    throw new Error('An unknown error occurred while fetching special categories');
  }
};
