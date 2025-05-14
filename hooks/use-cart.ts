import { checkCoupon, getCart, updateCart } from '@/api/cart';
import { auth } from '@/lib/firebaseConfig';
import { useCartStore } from '@/stores/cart-store';
import { Product } from '@/types/product';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from './use-auth';

interface CartMutationProps {
  cartId: string;
  userId: string;
  products: {
    id: number;
    prescriptionImg: string;
    quantity: number;
  };
}

export default function useCart() {
  const queryClient = useQueryClient();

  const useGetCart = () => {
    const { user } = useAuth();

    return useQuery({
      enabled: !!user?.uid,
      queryKey: ['cart', user?.uid],
      queryFn: async () => {
        if (!user?.uid) {
          return { id: '', products: [], userId: '', updatedAt: new Date() };
        }
        return getCart(user.uid);
      },
    });
  };

  const useMutateCart = () => {
    const { user } = useAuth();
    const { cart, getSimplifiedCart } = useCartStore();

    const mutation = useMutation<void, Error, CartMutationProps>({
      mutationFn: async ({ cartId, userId, products }) => {
        const simplifiedCart = getSimplifiedCart();

        await updateCart(userId || user?.uid || '', cartId, simplifiedCart);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['cart', user?.uid] });
      },
    });

    return mutation;
  };

  const useRemoveProductFromCart = () => {
    const { user } = useAuth();
    const { cart, getSimplifiedCart } = useCartStore();
    return useMutation<void, Error, CartMutationProps>({
      mutationFn: async ({ cartId, userId, products }) => {
        const simplifiedCart = {
          ...getSimplifiedCart(),
          products: getSimplifiedCart().products.filter((item) => item.id !== products.id),
        };

        await updateCart(userId || user?.uid || '', cartId, simplifiedCart);
      },
    });
  };

  const useClearCart = () => {
    const { user } = useAuth();
    return useMutation<void, Error, string>({
      mutationFn: async (cartId) => {
        await updateCart(user?.uid || '', cartId, {
          id: cartId,
          userId: user?.uid || '',
          products: [],
          updatedAt: new Date(),
        });
      },
    });
  };

  const useValidateCoupon = () => {
    const { cart } = useCartStore();

    return useMutation({
      mutationFn: (data: any) => {
        const payload = {
          coupon: data,
          products: cart.products.map((item) => ({
            product_id: item.id,
            product_uom_qty: item.quantity,
          })),
          deviceId: null,
        };
        return checkCoupon(payload);
      },
    });
  };

  return {
    useGetCart,
    useMutateCart,
    useRemoveProductFromCart,
    useClearCart,
    useValidateCoupon,
  };
}
