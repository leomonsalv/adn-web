"use client";

import MainIncentives from "@/components/incentives/MainIncentives";
import CartList from "@/components/cart/CartList";
import LinkedProductList from "@/components/products/ProductLists/LinkedProductList";
import { useCartStore } from "@/stores/cart-store";
import CartOrderSummary from "@/components/cart/CartOrderSummary";
import useCart from "@/hooks/use-cart";
import { useEffect } from "react";
import { auth } from "@/lib/firebaseConfig";

export default function Cart() {
  const { cart, setCart } = useCartStore();
  const { useGetCart } = useCart();
  const { data, isLoading } = useGetCart();

  useEffect(() => {
    if (data) {
      setCart(data);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Carrito
        </h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <CartList items={cart.products} />
          <CartOrderSummary />
        </form>
      </div>
      <LinkedProductList />
      <MainIncentives />
    </div>
  );
}
