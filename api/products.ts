import { functions } from '@/lib/firebaseConfig';
import { httpsCallable } from 'firebase/functions';
import { SearchFormType, SearchResponse } from '@/types/search';
import {
  Product,
  RecommendedProductsPayload,
  RecommendedProductsResponseElement,
} from '@/types/product';
import { GET_RECOMMENDED_PRODUCTS } from '@/lib/urls';

export const fetchProducts = async (params: SearchFormType): Promise<SearchResponse> => {
  const response = await httpsCallable<SearchFormType, SearchResponse>(
    functions,
    'es-search',
  )(params);
  return response.data;
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
