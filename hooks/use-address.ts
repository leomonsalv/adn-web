import { useMutation } from '@tanstack/react-query';
import { Address } from '@/schemas/create-address-schema';
import { createAddress } from '@/api/address';

export default function useAddress() {
  const useCreateAddress = () => {
    return useMutation({
      mutationFn: (data: { addressData: Address }) => {
        return createAddress(data.addressData);
      },
    });
  };

  return {
    useCreateAddress,
  };
}
