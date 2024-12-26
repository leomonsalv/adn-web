import { getPaymentMethods } from '@/api/checkout';
import { Method } from '@/schemas/payment-method-schema';
import { useQuery } from '@tanstack/react-query';

export default function useCheckout() {
  const useGetPaymentMethods = () => {
    return useQuery({
      queryKey: ['payment-methods'],
      queryFn: () => getPaymentMethods(),
      select: (data): Method[] => data?.methods.filter((method: Method) => method.available),
    });
  };

  return {
    useGetPaymentMethods,
  };
}
