// components/ProductCard.tsx

"use client";

import { Product } from "@/types/product";
import { useCartStore } from "@/stores/cart-store";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div>
      <h2>{product.name}</h2>
      <p>${parseFloat(product.price.replace("$", "")).toFixed(2)}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}
