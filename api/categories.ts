import { functions } from '@/lib/firebaseConfig';
import { httpsCallable } from 'firebase/functions';
import { GET_CATEGORIES } from '@/lib/urls';
import { GetCategoriesResponse } from '@/types/categories';

export const getCategories = async (): Promise<GetCategoriesResponse> => {
  const response = await httpsCallable<string, GetCategoriesResponse>(functions, GET_CATEGORIES)();
  return response.data;
};
