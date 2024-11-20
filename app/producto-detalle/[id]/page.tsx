// app/products/[id]/ProductPageClient.tsx

"use client";

import { Product } from "@/types/product";
import { useCartStore } from "@/stores/cart-store";

interface ProductPageClientProps {
  product: Product | null;
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
  console.log("🚀 ~ ProductPageClient ~ product:", product);
  const addToCart = useCartStore((state) => state.addToCart);

  if (!product) {
    return <p>PRODUCT NULL or something...</p>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}
