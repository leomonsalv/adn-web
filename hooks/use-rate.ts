import { getRate } from '@/api/checkout';
import { useQuery } from '@tanstack/react-query';

export default function useRate() {
  const useGetRate = () => {
    return useQuery({
      queryKey: ['rates'],
      queryFn: () => getRate(),
      select: (data) => data,
    });
  };

  return { useGetRate };
}
