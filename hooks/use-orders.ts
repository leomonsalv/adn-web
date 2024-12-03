import { fetchOrdersHistoric } from "@/api/orders";
import { auth } from "@/lib/firebaseConfig";
import { useInfiniteQuery } from "@tanstack/react-query";

// export default function useOrders() {
//   const useGetOrders = () => {
//     const user = auth.currentUser;
//     return useQuery({
//       queryKey: ["orders", user?.uid],
//       queryFn: () => fetchOrdersHistoric(user?.uid || ""),
//     });
//   };

//   return {
//     useGetOrders,
//   };
// }

export default function useOrders() {
  const useGetOrders = (pageSize = 1) => {
    const user = auth.currentUser;
    console.log("🚀 ~ useGetOrders ~ user:", user?.uid);

    return useInfiniteQuery({
      queryKey: ["orders", user?.uid],
      queryFn: () => fetchOrdersHistoric(user?.uid as any, pageSize, undefined),
      initialPageParam: 0 as any,
      getNextPageParam: (lastPage, pages) => lastPage.lastVisible,
    });
  };

  return {
    useGetOrders,
  };
}
