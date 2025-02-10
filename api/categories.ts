import { API_URL } from '@/lib/urls';
import { GetCategoriesSeoResponse } from '@/types/categories';

interface GetCategoryProps {
  slug?: string;
}

export const getCategories = async ({ slug = '' }: GetCategoryProps = {}): Promise<
  GetCategoriesSeoResponse[]
> => {
  try {
    const queryParams = new URLSearchParams();
    if (slug) queryParams.append('slug', slug);

    const response = await fetch(
      `${API_URL}/api/category${queryParams.toString() ? `?${queryParams.toString()}` : ''}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const categories = await response.json();
    return categories.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};
