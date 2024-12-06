import { getCart, updateCart } from '@/api/cart'
import { auth } from '@/lib/firebaseConfig'
import { useAuth } from '@/providers/auth-provider'
import { useCartStore } from '@/stores/cart-store'
import { CartProduct } from '@/types/cart'
import { Product } from '@/types/product'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

interface CartMutationProps {
  cartId: string
  product: Product
}

export default function useCart() {
  const queryClient = useQueryClient()
  const useGetCart = () => {
    const { isInitialized } = useAuth()
    const user = auth.currentUser

    return useQuery({
      enabled: !!isInitialized && !!user?.uid,
      queryKey: ['cart', user?.uid],
      queryFn: () => getCart(user?.uid || ''),
    })
  }

  const useMutateCart = () => {
    const user = auth.currentUser
    const { cart } = useCartStore()

    const mutation = useMutation<void, Error, CartMutationProps>({
      mutationFn: async ({ cartId, product }) => {
        let newCart = cart
        const existingItem = cart.products.find((item) => item.id === product.id)
        if (existingItem) {
          newCart = {
            id: cartId,
            userId: user?.uid || '',
            products: cart.products.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
            ),
          }
        } else {
          newCart = {
            id: cartId,
            userId: user?.uid || '',
            products: [...cart.products, { ...product, quantity: 1 }],
          }
        }
        await updateCart(user?.uid || '', cartId, newCart)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['cart', user?.uid] })
      },
    })

    return mutation
  }

  const useRemoveProductFromCart = () => {
    const user = auth.currentUser
    const { cart } = useCartStore()
    return useMutation<void, Error, CartMutationProps>({
      mutationFn: async ({ cartId, product }) => {
        await updateCart(user?.uid || '', cartId, {
          ...cart,
          products: cart.products.filter((item) => item.id !== product.id),
        })
      },
    })
  }

  return {
    useGetCart,
    useMutateCart,
    useRemoveProductFromCart,
  }
}
