// api/products.ts
import { SearchFormType } from '@/types/search';
import { API_URL, GET_RECOMMENDED_PRODUCTS, GET_TOP_SELLERS_PRODUCTS } from '@/lib/urls';
import { httpsCallable } from 'firebase/functions';
import { functions } from '@/lib/firebaseConfig';
import { Product, ProductResponse } from '@/types/product';

interface SearchParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sort?: string;
  attack?: string;
  category?: string;
  ingredients?: string;
  laboratories?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  saveExcel?: string;
}

export const fetchProducts = async ({
  page = 1,
  pageSize = 10,
  search = '',
  sort = '',
  attack = '',
  ingredients = '',
  laboratories = '',
  priceRange,
  saveExcel = 'false',
  category = '',
}: SearchParams): Promise<ProductResponse> => {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      saveExcel: saveExcel,
    });

    if (search) queryParams.append('search', search);
    if (category) queryParams.append('category', category);
    if (sort) queryParams.append('sort', sort);
    if (attack) queryParams.append('attack', attack);
    if (ingredients) queryParams.append('ingredients', ingredients);
    if (laboratories) queryParams.append('laboratories', laboratories);
    if (priceRange) {
      queryParams.append('minPrice', priceRange.min.toString());
      queryParams.append('maxPrice', priceRange.max.toString());
    }

    const response = await fetch(`${API_URL}/products?${queryParams.toString()}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const products = await response.json();
    return products;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching products:', error.message);
      throw error;
    }
    throw new Error('An unknown error occurred while fetching products');
  }
};

export const fetchProductsByIds = async (
  productIds: number[],
  typeId?: number,
): Promise<{ data: Product[] }> => {
  try {
    const queryParams = new URLSearchParams();

    // Add product IDs to query params
    if (Array.isArray(productIds) && productIds.length > 0) {
      productIds.forEach((id) => queryParams.append('id', id.toString()));
    }

    // Add type ID if provided
    if (typeId !== undefined) {
      queryParams.append('typeId', typeId.toString());
    }

    const response = await fetch(`${API_URL}/product?${queryParams.toString()}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const products = await response.json();

    // Assuming the API returns { data: Product[] }
    return { data: products.data };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching products by IDs:', error.message);
      throw error;
    }
    throw new Error('An unknown error occurred while fetching products by IDs');
  }
};

export const fetchProductById = async (id: string): Promise<Product> => {
  try {
    const queryParams = new URLSearchParams({
      id: id,
    });

    const response = await fetch(`${API_URL}/product?${queryParams.toString()}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const product = await response.json();
    return product;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching product by ID:', error.message);
      throw error;
    }
    throw new Error('An unknown error occurred while fetching the product');
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
