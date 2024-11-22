import { ClockIcon } from "@heroicons/react/24/outline";

import { Product } from "@/types/product";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useCartStore } from "@/stores/cart-store";
import { Select } from "../ui/select";
import { Button } from "../ui/button";

export default function CartItem({ product }: { product: Product }) {
  const { updateQuantity } = useCartStore();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const quantity = parseInt(e.target.value);
    updateQuantity(product.id, quantity);
  };

  return (
    <li className="flex py-6 sm:py-10">
      <div className="shrink-0">
        <img
          alt={product.imageAlt}
          src={product.imageSrc}
          className="size-24 rounded-md object-cover object-center sm:size-48"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <div className="flex justify-between">
              <h3 className="text-sm">
                <a
                  href={product.href}
                  className="font-medium text-gray-700 hover:text-gray-800"
                >
                  {product.name}
                </a>
              </h3>
            </div>
            <div className="mt-1 flex text-sm">
              <p className="text-gray-500">{product.color}</p>
              {product.size ? (
                <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                  {product.size}
                </p>
              ) : null}
            </div>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {product.price}
            </p>
          </div>

          <div className="mt-4 sm:mt-0 sm:pr-9">
            <label htmlFor={`quantity-${product.id}`} className="sr-only">
              Quantity, {product.name}
            </label>
            <Select
              onChange={handleQuantityChange}
              id={`quantity-${product.id}`}
              name={`quantity-${product.id}`}
              className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base/5 font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
            </Select>

            <div className="absolute right-0 top-0">
              <Button
                type="button"
                plain
                className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Remove</span>
                <XMarkIcon aria-hidden="true" className="size-5" />
              </Button>
            </div>
          </div>
        </div>

        <p className="mt-4 flex space-x-2 text-sm text-gray-700">
          {product.inStock ? (
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

          <span>
            {product.inStock ? "In stock" : `Ships in ${product.leadTime}`}
          </span>
        </p>
      </div>
    </li>
  );
}
