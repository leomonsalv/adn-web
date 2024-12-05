import { functions } from '@/lib/firebaseConfig'
import { httpsCallable } from 'firebase/functions'
import { SearchFormType, SearchResponse } from '@/types/search'
import { Product } from '@/types/product'

export const fetchProducts = async (params: SearchFormType): Promise<SearchResponse> => {
  const response = await httpsCallable<SearchFormType, SearchResponse>(
    functions,
    'es-search',
  )(params)
  return response.data
}

export const fetchProductsByIds = async (ids: number[]): Promise<{ data: Product[] }> => {
  const response = await httpsCallable<{ ids: number[] }, { data: Product[] }>(
    functions,
    'es-searchById',
  )({ ids })

  return response.data
}
