import { createOrder, fetchOrdersHistoric } from '@/api/orders';

import type { CashbackSchemaType, Order, PaymentMethod } from '@/schemas/create-order-schema';
import { useCheckoutStore } from '@/stores/checkout-store';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { useAuth } from './use-auth';
import { useCartStore } from '@/stores/cart-store';

export default function useOrders() {
  const useGetOrders = (pageSize = 5) => {
    const { user } = useAuth();

    return useInfiniteQuery({
      queryKey: ['orders', user?.uid],
      queryFn: ({ pageParam = null }) =>
        fetchOrdersHistoric(user?.uid as string, pageSize, pageParam),
      initialPageParam: 0 as any,
      getNextPageParam: (lastPage) => lastPage.lastVisible || null,
    });
  };

  const useCreateOrder = () => {
    const { user } = useAuth();
    const { getCheckoutData } = useCheckoutStore();
    const { cart, getCartTax, getCartSubtotal, getCartRef } = useCartStore();
    const checkoutData = getCheckoutData();
    return useMutation({
      mutationFn: (data: { methods: PaymentMethod[]; cashbackData?: CashbackSchemaType }) => {
        const newOrder: Order = {
          webOrApp: 'web',
          addressId: checkoutData.shippingAddress.id,
          type: 'alpha',
          clientId: user?.uid!,
          clientName: checkoutData.contactInformation.name,
          prescriptions: [],
          subtotal: getCartSubtotal(),
          tax: getCartTax(),
          ref: getCartRef(),
          deviceId: window.navigator.userAgent,
          iosOrAnd: 'android',
          coupon: '',
          customizedInvoice: {
            ...checkoutData.contactInformation,
            phone: checkoutData.shippingAddress.phone,
            prefix: checkoutData.shippingAddress.phone.slice(0, 4),
          },
          payment: {
            ...data,
          },
          shipping: {
            price: 0,
            type: checkoutData.shippingAddress.type ?? 'delivery',
            details: {
              type: 'instantaneous',
              schedule: null,
            },
          },
          odooOrder: {
            product_list: cart.products.map((item) => ({
              product_id: item.id,
              product_uom_qty: item.quantity,
              subtotal: item.price,
              tax: item.price_extra,
            })),
          },
        };
        return createOrder(newOrder);
      },
    });
  };

  return {
    useGetOrders,
    useCreateOrder,
  };
}
