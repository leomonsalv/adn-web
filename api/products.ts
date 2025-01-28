// api/products.ts
import { SearchFormType } from '@/types/search';
import { GET_RECOMMENDED_PRODUCTS, GET_TOP_SELLERS_PRODUCTS } from '@/lib/urls';
import { httpsCallable, HttpsCallableResult } from 'firebase/functions';
import { functions } from '@/lib/firebaseConfig';
import { GetSearchCateroriesResponse } from '@/types/categories';
import { Product } from '@/schemas/orders';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://backend.tests.adanenlinea.com';

export const fetchProducts = async ({
  page = 1,
  pageSize = 10,
  search = '',
  sort = '',
  lab = '',
  saveExcel = 'false',
}: {
  page?: number;
  pageSize?: number;
  search?: string;
  sort?: string;
  lab?: string;
  saveExcel?: string;
}): Promise<GetSearchCateroriesResponse> => {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      saveExcel: saveExcel,
    });

    if (search) queryParams.append('search', search);
    if (sort) queryParams.append('sort', sort);
    if (lab) queryParams.append('lab', lab);

    const response = await fetch(`${API_URL}/products?${queryParams.toString()}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const products = await response.json();
    console.log('🚀 ~ products:', products);
    return products.data;
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

//THIS CALL WILL CHANGE IN THE FUTURE WHEN MOVED TO MONGO
export const fetchRecommendedProducts = async (payload: any): Promise<any> => {
  const response = await httpsCallable<any, any>(functions, GET_RECOMMENDED_PRODUCTS)(payload);
  return response.data;
};

//THIS CALL WILL CHANGE IN THE FUTURE WHEN MOVED TO MONGO
export const fetchTopSellingProducts = async (payload: any): Promise<any> => {
  const response = await httpsCallable<any, any>(functions, GET_TOP_SELLERS_PRODUCTS)(payload);
  return response.data;
};
