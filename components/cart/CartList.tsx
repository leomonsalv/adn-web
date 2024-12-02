import { Product } from "@/types/product";
import CartItem from "./CartItem";
import { CartProduct } from "@/types/cart";

export default function CartList({ items }: { items: CartProduct[] }) {
  return (
    <section aria-labelledby="cart-heading" className="lg:col-span-7">
      <h2 id="cart-heading" className="sr-only">
        Items en tu carrito
      </h2>

      <ul
        role="list"
        className="divide-y divide-gray-200 border-b border-t border-gray-200"
      >
        {items.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))}
      </ul>
    </section>
  );
}
