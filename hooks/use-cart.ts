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
    const { cart } = useCartStore();

    const mutation = useMutation<void, Error, CartMutationProps>({
      mutationFn: async ({ cartId, userId, products }) => {
        let newCart = cart;
        const existingItem = cart.products.find((item) => item.id === products.id);

        if (existingItem) {
          newCart = {
            id: cartId,
            userId: userId || user?.uid || '',
            products: cart.products.map((item) =>
              item.id === products.id
                ? {
                    ...item,
                    id: products.id,
                    prescriptionImg: products.prescriptionImg,
                    quantity: products.quantity,
                  }
                : item,
            ),
            updatedAt: new Date(),
          };
        } else {
          newCart = {
            id: cartId,
            userId: userId || user?.uid || '',
            products: [
              ...cart.products,
              {
                id: products.id,
                prescriptionImg: products.prescriptionImg,
                quantity: products.quantity || 1,
              },
            ],
            updatedAt: new Date(),
          };
        }
        await updateCart(userId || user?.uid || '', cartId, newCart);
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
      mutationFn: async ({ cartId, userId, products }) => {
        await updateCart(userId || user?.uid || '', cartId, {
          ...cart,
          products: cart.products.filter((item) => item.id !== products.id),
        });
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
