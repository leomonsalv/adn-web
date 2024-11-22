import { Product } from "@/types/product";
import CartItem from "./CartItem";
import { CartItem as CartItemType } from "@/types/cart";

export default function CartList({ cartItems }: { cartItems: CartItemType[] }) {
  return (
    <section aria-labelledby="cart-heading" className="lg:col-span-7">
      <h2 id="cart-heading" className="sr-only">
        Items en tu carrito
      </h2>

      <ul
        role="list"
        className="divide-y divide-gray-200 border-b border-t border-gray-200"
      >
        {cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))}
      </ul>
    </section>
  );
}
