import { functions } from '@/lib/firebaseConfig';
import { SearchFormType, SearchResponse } from '@/types/search';
import {
  Product,
  RecommendedProductsPayload,
  RecommendedProductsResponseElement,
} from '@/types/product';
import { GET_RECOMMENDED_PRODUCTS } from '@/lib/urls';
import { httpsCallable, HttpsCallableResult } from 'firebase/functions';
import { GetSearchCateroriesResponse } from '@/types/categories';

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

export const fetchRecommendedProducts = async (
  payload: RecommendedProductsPayload,
): Promise<RecommendedProductsResponseElement> => {
  const response = await httpsCallable<
    RecommendedProductsPayload,
    RecommendedProductsResponseElement
  >(
    functions,
    GET_RECOMMENDED_PRODUCTS,
  )(payload);
  return response.data;
};
