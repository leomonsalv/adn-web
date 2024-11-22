import { Product } from "@/types/product";
import CartItem from "./CartItem";

export default function CartList({ products }: { products: Product[] }) {
  return (
    <section aria-labelledby="cart-heading" className="lg:col-span-7">
      <h2 id="cart-heading" className="sr-only">
        Items en tu carrito
      </h2>

      <ul
        role="list"
        className="divide-y divide-gray-200 border-b border-t border-gray-200"
      >
        {products.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}
      </ul>
    </section>
  );
}
