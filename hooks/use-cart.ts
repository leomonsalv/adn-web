import { getCart } from "@/api/cart";
import { auth } from "@/lib/firebaseConfig";
import { useAuth } from "@/providers/auth-provider";
import { useQuery } from "@tanstack/react-query";
import { getAuth } from "firebase/auth";
import { useEffect, useMemo, useState } from "react";

export default function useCart() {
  const useGetCart = () => {
    const { isInitialized } = useAuth();
    const user = auth.currentUser;
    return useQuery({
      enabled: !!isInitialized && !!user?.uid,
      queryKey: ["cart", user?.uid],
      queryFn: () => getCart(user?.uid || ""),
    });
  };

  return {
    useGetCart,
  };
}
