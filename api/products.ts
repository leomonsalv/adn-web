// api/products.ts
import axiosInstance from './axios';
import { SearchFormType, SearchResponse, SearchSuggestionsResponse } from '@/types/search';
import {
  SearchResponseSchema,
  SearchSuggestionsResponseSchema,
  searchFormSchema,
} from '@/schemas/search-form';
import {
  Product,
  RecommendedProductsPayload,
  RecommendedProductsResponseElement,
  TopSellingProductsPayload,
  TopSellingProductsResponse,
} from '@/types/product';
import { GET_RECOMMENDED_PRODUCTS, GET_TOP_SELLERS_PRODUCTS } from '@/lib/urls';
import { httpsCallable } from 'firebase/functions';
import { functions } from '@/lib/firebaseConfig';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://backend.tests.adanenlinea.com';

export const fetchProducts = async (params: SearchFormType): Promise<SearchResponse> => {
  console.log('🚀 ~ fetchProducts ~ params:', params);
  try {
    // Validar los parámetros de entrada
    const validatedParams = searchFormSchema.parse(params);

    const queryParams = new URLSearchParams();

    // Manejar la búsqueda principal
    if (validatedParams.query) {
      queryParams.append('q', validatedParams.query);
    }

    // Manejar categorías
    if (validatedParams.categoryPath) {
      const [category, subCategory, niche] = validatedParams.categoryPath.split('/');
      if (category) queryParams.append('category', category);
      if (subCategory) queryParams.append('subcategory', subCategory);
      if (niche) queryParams.append('niche', niche);
    }

    // Parámetros de paginación y ordenamiento
    if (validatedParams.actualPage)
      queryParams.append('page', validatedParams.actualPage.toString());
    if (validatedParams.pageSize) queryParams.append('limit', validatedParams.pageSize.toString());
    if (validatedParams.sort) queryParams.append('sort', validatedParams.sort);

    // Filtros adicionales
    if (validatedParams.facets) {
      Object.entries(validatedParams.facets).forEach(([key, values]) => {
        if (values && values.length > 0) {
          values.forEach((value) => queryParams.append(key, value));
        }
      });
    }

    // Rango de precios
    if (validatedParams.priceRange) {
      if (validatedParams.priceRange.min !== undefined) {
        queryParams.append('minPrice', validatedParams.priceRange.min.toString());
      }
      if (validatedParams.priceRange.max !== undefined) {
        queryParams.append('maxPrice', validatedParams.priceRange.max.toString());
      }
    }

    // Construir la URL base dependiendo si es búsqueda o navegación por categoría
    const baseEndpoint = validatedParams.query ? '/b' : '/products';
    const response = await axiosInstance.get(`${API_URL}${baseEndpoint}?${queryParams.toString()}`);

    // Validar y transformar la respuesta usando el schema
    const validatedResponse = SearchResponseSchema.parse({
      data: response.data.products,
      pagination: {
        current: response.data.currentPage,
        total_pages: response.data.totalPages,
        total: response.data.total,
      },
      facets: response.data.categories || [],
      aggregations: response.data.aggregations || {},
      suggest: response.data.suggestions || [],
    });

    return validatedResponse;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching products:', error.message);
      throw error;
    }
    throw new Error('An unknown error occurred while fetching products');
  }
};

// export const fetchProducts = async (
//   params: SearchFormType,
// ): Promise<GetSearchCateroriesResponse> => {
//   try {
//     const response = await httpsCallable<SearchFormType, SearchResponse>(
//       functions,
//       'es-search',
//     )(params);

//     return response.data;
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.error('Error fetching products:', error.message);
//       throw error;
//     }
//     throw new Error('An unknown error occurred while fetching products');
//   }
// };

export const fetchProductsByIds = async (ids: number[]): Promise<{ data: Product[] }> => {
  try {
    const promises = ids.map((id) => axiosInstance.get(`${API_URL}/product/${id}`));

    const responses = await Promise.all(promises);
    const products = responses.map((response) => response.data);

    return { data: products };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching products by IDs:', error.message);
      throw error;
    }
    throw new Error('An unknown error occurred while fetching products by IDs');
  }
};

// export const fetchProductsByIds = async (ids: number[]): Promise<{ data: Product[] }> => {
//   try {
//     const response: HttpsCallableResult<{ data: Product[] }> = await httpsCallable<
//       { ids: number[] },
//       { data: Product[] }
//     >(
//       functions,
//       'es-searchById',
//     )({ ids });

//     return response.data;
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.error('Error fetching products by IDs:', error.message);
//       throw error;
//     }
//     throw new Error('An unknown error occurred while fetching products by IDs');
//   }
// };

export const fetchProductsSuggestions = async (
  query: string,
): Promise<SearchSuggestionsResponse> => {
  try {
    const response = await axiosInstance.get(
      `${API_URL}/b/suggestions?q=${encodeURIComponent(query)}`,
    );

    // Validar y transformar la respuesta usando el schema
    const validatedResponse = SearchSuggestionsResponseSchema.parse({
      results: {
        documents: response.data.suggestions.map((suggestion: string) => ({
          suggestion,
        })),
      },
    });

    return validatedResponse;
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    throw error;
  }
};

// export const fetchProductsSuggestions = async (
//   query: string,
// ): Promise<{ results: { documents: { suggestion: string }[] } }> => {
//   const response = await httpsCallable<
//     SearchFormType,
//     { results: { documents: { suggestion: string }[] } }
//   >(
//     functions,
//     'es-search',
//   )({ query, pageSize: 5, suggest: true });
//   return response.data;
// };

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

export const fetchTopSellingProducts = async (
  payload: any,
): Promise<TopSellingProductsResponse> => {
  const response = await httpsCallable<TopSellingProductsPayload, TopSellingProductsResponse>(
    functions,
    GET_TOP_SELLERS_PRODUCTS,
  )(payload);
  return response.data;
};
