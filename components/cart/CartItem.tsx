import { XMarkIcon, CheckIcon, ClockIcon } from "@heroicons/react/24/outline";

import { useCartStore } from "@/stores/cart-store";
import AmountSelector from "../products/AmountSelectors/AmountSelector";
import { CartItem as CartItemType } from "@/types/cart";
import { Button } from "../ui/button";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCartStore();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const quantity = parseInt(e.target.value);
    updateQuantity(item.id, quantity);
  };

  return (
    <li className="flex py-6 sm:py-10">
      <div className="shrink-0">
        <img
          alt={item.imageAlt}
          src={item.imageSrc}
          className="size-24 rounded-md object-cover object-center sm:size-48"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <div className="flex justify-between">
              <h3 className="text-sm">
                <a
                  href={item.href}
                  className="font-medium text-gray-700 hover:text-gray-800"
                >
                  {item.name}
                </a>
              </h3>
            </div>
            <div className="mt-1 flex text-sm">
              <p className="text-gray-500">{item.color}</p>
              {item.size ? (
                <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                  {item.size}
                </p>
              ) : null}
            </div>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {item.price}
            </p>
          </div>

          <div className="mt-4 sm:mt-0 sm:pr-9">
            <label htmlFor={`quantity-${item.id}`} className="sr-only">
              Quantity, {item.name}
            </label>
            <AmountSelector
              quantity={item.quantity}
              productId={item.id}
              productName={item.name}
              onChange={handleQuantityChange}
            />

            <div className="absolute right-0 top-0">
              <Button
                type="button"
                plain
                className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                onClick={() => removeFromCart(item.id)}
              >
                <span className="sr-only">Remove</span>
                <XMarkIcon aria-hidden="true" className="size-5" />
              </Button>
            </div>
          </div>
        </div>

        <p className="mt-4 flex space-x-2 text-sm text-gray-700">
          {item.inStock ? (
            <CheckIcon
              aria-hidden="true"
              className="size-5 shrink-0 text-green-500"
            />
          ) : (
            <ClockIcon
              aria-hidden="true"
              className="size-5 shrink-0 text-gray-300"
            />
          )}

          <span>{item.inStock ? "In stock" : `Ships in ${item.leadTime}`}</span>
        </p>
      </div>
    </li>
  );
}
