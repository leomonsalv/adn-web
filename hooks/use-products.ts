import { fetchProductsByIds } from '@/api/products'
import { useQuery } from '@tanstack/react-query'

export default function useProducts() {
  const useGetProductById = (id: number) => {
    return useQuery({
      queryKey: ['product', id],
      queryFn: () => fetchProductsByIds([id]),
      select: (data) => data.data[0],
    })
  }

  return { useGetProductById }
}
