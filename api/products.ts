import { functions } from '@/lib/firebaseConfig';
import { httpsCallable } from 'firebase/functions';
import { SearchFormType, SearchResponse } from '@/types/search';
import { Product } from '@/types/product';
import { GetSearchCateroriesResponse } from '@/types/categories';

export const fetchProducts = async (
  params: SearchFormType,
  signal?: AbortSignal,
): Promise<GetSearchCateroriesResponse> => {
  try {
    const response = await httpsCallable<SearchFormType, GetSearchCateroriesResponse>(
      functions,
      'es-search',
      { signal },
    )(params);

    return response.data;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Request was cancelled');
      throw error;
    }
    throw error;
  }
};

export const fetchProductsByIds = async (ids: number[]): Promise<{ data: Product[] }> => {
  const response = await httpsCallable<{ ids: number[] }, { data: Product[] }>(
    functions,
    'es-searchById',
  )({ ids });

  return response.data;
};

export const fetchProductsSuggestions = async (
  query: string,
): Promise<{ results: { documents: { suggestion: string }[] } }> => {
  const response = await httpsCallable<
    SearchFormType,
    { results: { documents: { suggestion: string }[] } }
  >(
    functions,
    'es-search',
  )({ query, pageSize: 5, suggest: true });
  return response.data;
};
