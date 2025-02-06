import { functions } from '@/lib/firebaseConfig';
import { httpsCallable } from 'firebase/functions';
import { API_URL, GET_CATEGORIES } from '@/lib/urls';
import { GetCategoriesResponse } from '@/types/categories';
import { Category } from '@/types/categories';

// export const getCategories = async (): Promise<GetCategoriesResponse> => {
//   const response = await httpsCallable<string, GetCategoriesResponse>(functions, GET_CATEGORIES)();
//   return response.data;
// };

interface GetCategoryProps {
  slug?: string;
}

export const getCategories = async ({ slug = '' }: GetCategoryProps = {}): Promise<Category[]> => {
  try {
    const queryParams = new URLSearchParams();
    if (slug) queryParams.append('slug', slug);

    const response = await fetch(
      `${API_URL}/category${queryParams.toString() ? `?${queryParams.toString()}` : ''}`,
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
