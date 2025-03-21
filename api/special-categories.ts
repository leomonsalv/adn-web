// api/special-categories.ts
import { API_URL } from '@/lib/urls';
import { SpecialCategoryDetailResponse, SpecialCategoryResponse } from '@/types/special-category';

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

/**
 * Fetches special categories for client display
 * @returns Promise with special categories array and total count
 */
export const fetchClientSpecialCategories = async (): Promise<SpecialCategoryResponse> => {
  try {
    const response = await fetch(`${API_URL}/api/special-categories/client`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching client special categories:', error.message);
      throw error;
    }
    throw new Error('An unknown error occurred while fetching client special categories');
  }
};

/**
 * Fetches a specific special category by ID
 * @param id - The ID of the special category to fetch
 * @returns Promise with the special category details
 */
export const fetchSpecialCategoryById = async (
  id: string,
): Promise<SpecialCategoryDetailResponse> => {
  if (!id) {
    throw new Error('Special category ID is required');
  }

  try {
    const response = await fetch(`${API_URL}/api/special-categories/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Special category not found');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error fetching special category with ID ${id}:`, error.message);
      throw error;
    }
    throw new Error(`An unknown error occurred while fetching special category with ID ${id}`);
  }
};

/**
 * Fetches a specific special category by slug
 * @param slug - The slug of the special category to fetch
 * @returns Promise with the special category details
 */
export const fetchSpecialCategoryBySlug = async (
  slug: string,
): Promise<SpecialCategoryDetailResponse> => {
  if (!slug) {
    throw new Error('Special category slug is required');
  }

  try {
    // First, get all client special categories
    const { special_categories } = await fetchClientSpecialCategories();

    // Find the category with matching slug
    const category = special_categories?.find(
      (cat) => (cat.slug || cat.title?.toLowerCase().replace(/\s+/g, '-')) === slug,
    );

    if (!category) {
      throw new Error('Special category not found');
    }

    // Use the ID to fetch detailed information
    return fetchSpecialCategoryById(category.id);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error fetching special category with slug ${slug}:`, error.message);
      throw error;
    }
    throw new Error(`An unknown error occurred while fetching special category with slug ${slug}`);
  }
};
