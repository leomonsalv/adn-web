import { functions } from '@/lib/firebaseConfig';
import { httpsCallable, HttpsCallableResult } from 'firebase/functions';
import { GetSearchCateroriesResponse } from '@/types/categories';
import { Product } from '@/types/product';
import { SearchFormType } from '@/types/search';

export const fetchProducts = async (
  params: SearchFormType,
): Promise<GetSearchCateroriesResponse> => {
  try {
    const response = await httpsCallable<SearchFormType, GetSearchCateroriesResponse>(
      functions,
      'es-search',
    )(params);

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching products:', error.message);
      throw error;
    }
    throw new Error('An unknown error occurred while fetching products');
  }
};

export const fetchProductsByIds = async (ids: number[]): Promise<{ data: Product[] }> => {
  try {
    const response: HttpsCallableResult<{ data: Product[] }> = await httpsCallable<
      { ids: number[] },
      { data: Product[] }
    >(
      functions,
      'es-searchById',
    )({ ids });

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching products by IDs:', error.message);
      throw error;
    }
    throw new Error('An unknown error occurred while fetching products by IDs');
  }
};
