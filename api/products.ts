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
  categories?: string[];
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
  categories = [],
}: SearchParams): Promise<ProductResponse> => {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      saveExcel: saveExcel,
    });

    if (search) queryParams.append('search', search);
    if (categories.length > 0)
      categories.forEach((category) => queryParams.append('categories', category));
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
      // type: 'product',
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

export const getDeliveryPrice = async (): Promise<Product> => {
  try {
    const response = await fetch(
      `${API_URL}/product?type=product&id=${process.env.NEXT_PUBLIC_DELIVERY_PRODUCT_ID}`,
    );
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

export const fetchRecommendations = async (payload: any): Promise<any> => {
  try {
    const userId = payload.productId;
    if (!userId) {
      throw new Error('User ID is required for fetching recommended products');
    }

    const response = await fetch(`${API_URL}/api/users/recommendations/${userId}`);
    // UNCOMMENT THIS LINE FOR TESTING PURPOSES
    // const response = await fetch(
    //   `${API_URL}/api/users/recommendations/0Efs5MaRi1QgFht1CRWkf4ZHrKu2`,
    // );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching recommended products:', error.message);
      throw error;
    }
    throw new Error('An unknown error occurred while fetching recommended products');
  }
};

export const fetchSuggestions = async (payload: any): Promise<any> => {
  try {
    const productId = payload.productId;
    if (!productId) {
      throw new Error('Product ID is required for fetching suggestions');
    }

    const response = await fetch(`${API_URL}/api/suggestions/${productId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching product suggestions:', error.message);
      throw error;
    }
    throw new Error('An unknown error occurred while fetching product suggestions');
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
