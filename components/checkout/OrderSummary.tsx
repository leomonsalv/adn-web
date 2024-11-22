import {
  Popover,
  PopoverButton,
  PopoverBackdrop,
  PopoverPanel,
} from "@headlessui/react";
import { ChevronUpIcon } from "lucide-react";
import React from "react";

const products = [
  {
    id: 1,
    name: "Micro Backpack",
    href: "#",
    price: "$70.00",
    color: "Moss",
    size: "5L",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/checkout-page-04-product-01.jpg",
    imageAlt:
      "Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.",
  },
  {
    id: 2,
    name: "Small Stuff Satchel",
    href: "#",
    price: "$180.00",
    color: "Sand",
    size: "18L",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/checkout-page-04-product-01.jpg",
    imageAlt:
      "Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.",
  },
  {
    id: 3,
    name: "Carry Clutch",
    href: "#",
    price: "$70.00",
    color: "White and Black",
    size: "small",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/checkout-page-04-product-01.jpg",
    imageAlt:
      "Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.",
  },
  // More products...
];

function calculateSubtotal(products: Product[]): number {
  return products.reduce((total, product) => {
    const price = parseFloat(product.price.replace("$", ""));
    return total + price;
  }, 0);
}

function calculateTotal(
  subtotal: number,
  shipping: number,
  taxes: number,
): number {
  return subtotal + shipping + taxes;
}

function OrderSummary() {
  const subtotal = calculateSubtotal(products);
  const shipping = 15.0;
  const taxes = subtotal * 0.08;
  const total = calculateTotal(subtotal, shipping, taxes);

  return (
    <section
      aria-labelledby="summary-heading"
      className="bg-gray-50 px-4 pb-10 pt-16 sm:px-6 lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16"
    >
      <div className="mx-auto max-w-lg lg:max-w-none">
        <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
          Order summary
        </h2>

        <ul
          role="list"
          className="divide-y divide-gray-200 text-sm font-medium text-gray-900"
        >
          {products.map((product) => (
            <li key={product.id} className="flex items-start space-x-4 py-6">
              <img
                alt={product.imageAlt}
                src={product.imageSrc}
                className="size-20 flex-none rounded-md object-cover object-center"
              />
              <div className="flex-auto space-y-1">
                <h3>{product.name}</h3>
                <p className="text-gray-500">{product.color}</p>
                <p className="text-gray-500">{product.size}</p>
              </div>
              <p className="flex-none text-base font-medium">{product.price}</p>
            </li>
          ))}
        </ul>

        <dl className="hidden space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-900 lg:block">
          <div className="flex items-center justify-between">
            <dt className="text-gray-600">Subtotal</dt>
            <dd>$320.00</dd>
          </div>

          <div className="flex items-center justify-between">
            <dt className="text-gray-600">Shipping</dt>
            <dd>$15.00</dd>
          </div>

          <div className="flex items-center justify-between">
            <dt className="text-gray-600">Taxes</dt>
            <dd>$26.80</dd>
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 pt-6">
            <dt className="text-base">Total</dt>
            <dd className="text-base">$361.80</dd>
          </div>
        </dl>

        <Popover className="fixed inset-x-0 bottom-0 flex flex-col-reverse text-sm font-medium text-gray-900 lg:hidden">
          <div className="relative z-10 border-t border-gray-200 bg-white px-4 sm:px-6">
            <div className="mx-auto max-w-lg">
              <PopoverButton className="flex w-full items-center py-6 font-medium">
                <span className="mr-auto text-base">Total</span>
                <span className="mr-2 text-base">$361.80</span>
                <ChevronUpIcon
                  aria-hidden="true"
                  className="size-5 text-gray-500"
                />
              </PopoverButton>
            </div>
          </div>

          <PopoverBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <PopoverPanel
            transition
            className="relative transform bg-white px-4 py-6 transition duration-300 ease-in-out data-[closed]:translate-y-full sm:px-6"
          >
            <dl className="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-900">
              <div className="flex items-center justify-between">
                <dt className="text-gray-600">Subtotal</dt>
                <dd>${subtotal.toFixed(2)}</dd>
              </div>

              <div className="flex items-center justify-between">
                <dt className="text-gray-600">Shipping</dt>
                <dd>${shipping.toFixed(2)}</dd>
              </div>

              <div className="flex items-center justify-between">
                <dt className="text-gray-600">Taxes</dt>
                <dd>${taxes.toFixed(2)}</dd>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                <dt className="text-base">Total</dt>
                <dd className="text-base">${total.toFixed(2)}</dd>
              </div>
            </dl>
          </PopoverPanel>
        </Popover>
      </div>
    </section>
  );
}

export default OrderSummary;
