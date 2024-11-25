"use client";

import { useRouter } from "next/navigation";
import MainIncentives from "@/components/incentives/MainIncentives";
import CartList from "@/components/cart/CartList";
import OrderSummary from "@/components/cart/OrderSummary";
import LinkedProductList from "@/components/products/ProductLists/LinkedProductList";
import { useCartStore } from "@/stores/cart-store";

export default function Carrito() {
  const { cartItems } = useCartStore();
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Carrito
        </h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <CartList cartItems={cartItems} />
          <OrderSummary />
        </form>
      </div>
      <LinkedProductList />
      <MainIncentives />
    </div>
  );
}
