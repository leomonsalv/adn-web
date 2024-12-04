import { fetchOrdersHistoric } from "@/api/orders";
import { auth } from "@/lib/firebaseConfig";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useOrders() {
  const useGetOrders = (pageSize = 5) => {
    const user = auth.currentUser;

    return useInfiniteQuery({
      queryKey: ["orders", user?.uid],
      queryFn: ({ pageParam = null }) =>
        fetchOrdersHistoric(user?.uid as string, pageSize, pageParam),
      initialPageParam: 0 as any,
      getNextPageParam: (lastPage) => lastPage.lastVisible || null,
    });
  };

  return {
    useGetOrders,
  };
}
