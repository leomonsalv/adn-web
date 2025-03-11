import { getCart, updateCart } from '@/api/cart';
import { auth } from '@/lib/firebaseConfig';
import { useCartStore } from '@/stores/cart-store';
import { Product } from '@/types/product';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from './use-auth';

interface CartMutationProps {
  cartId: string;
  product: Product;
}

export default function useCart() {
  const queryClient = useQueryClient();

  const useGetCart = () => {
    const { user } = useAuth();

    return useQuery({
      enabled: !!user?.uid,
      queryKey: ['cart', user?.uid],
      queryFn: () => getCart(user?.uid || ''),
    });
  };

  const useMutateCart = () => {
    const { user } = useAuth();
    const { cart } = useCartStore();

    const mutation = useMutation<void, Error, CartMutationProps>({
      mutationFn: async ({ cartId, product }) => {
        let newCart = cart;
        const existingItem = cart.products.find((item) => item.id === product.id);

        if (existingItem) {
          newCart = {
            id: cartId,
            userId: user?.uid || '',
            products: cart.products.map((item) =>
              item.id === product.id ? { ...item, quantity: product.quantity } : item,
            ),
            updatedAt: new Date(),
          };
        } else {
          newCart = {
            id: cartId,
            userId: user?.uid || '',
            products: [...cart.products, { ...product, quantity: product.quantity || 1 }],
            updatedAt: new Date(),
          };
        }
        await updateCart(user?.uid || '', cartId, newCart);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['cart', user?.uid] });
      },
    });

    return mutation;
  };

  const useRemoveProductFromCart = () => {
    const { user } = useAuth();
    const { cart } = useCartStore();
    return useMutation<void, Error, CartMutationProps>({
      mutationFn: async ({ cartId, product }) => {
        await updateCart(user?.uid || '', cartId, {
          ...cart,
          products: cart.products.filter((item) => item.id !== product.id),
        });
      },
    });
  };

  return {
    useGetCart,
    useMutateCart,
    useRemoveProductFromCart,
  };
}
