import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Address } from '@/schemas/create-address-schema';
import { createAddress } from '@/api/address';

export default function useAddress() {
  const queryClient = useQueryClient();
  const useCreateAddress = () => {
    return useMutation({
      mutationFn: (data: { addressData: Address }) => {
        return createAddress(data.addressData);
      },
      onSuccess: () => {
        console.log('Address created');
        queryClient.invalidateQueries({ queryKey: ['firebaseUserAddresses'] }); // Do something
      },
    });
  };

  return {
    useCreateAddress,
  };
}
