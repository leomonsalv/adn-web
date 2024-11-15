// app/products/[id]/ProductPageClient.tsx

"use client";

import { Product } from "../../../types/product";
import { useCartStore } from "@/stores/cart-store";

interface ProductPageClientProps {
  product: Product;
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}
