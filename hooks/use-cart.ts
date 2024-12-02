import { getCart } from "@/api/cart";
import { auth } from "@/lib/firebaseConfig";
import { useQuery } from "@tanstack/react-query";

export default function useCart() {
  const useGetCart = () => {
    const user = auth.currentUser;

    return useQuery({
      enabled: !!user,
      queryKey: ["cart", user?.uid],
      queryFn: () => getCart(user?.uid || ""),
    });
  };

  return {
    useGetCart,
  };
}
