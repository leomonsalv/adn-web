import { formatVefCurrency } from '@/lib/utils';
import { useCartStore } from '@/stores/cart-store';
import { useCheckoutStore } from '@/stores/checkout-store';
import { Popover, PopoverButton, PopoverBackdrop, PopoverPanel } from '@headlessui/react';
import { ChevronUpIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Coupon } from './Coupon';

export default function CheckoutOrderSummary() {
  const { cart, getCartSubtotal, getCartTax, getCartTotal, deliveryFee } = useCartStore();
  const { shippingAddress } = useCheckoutStore();

  const subtotal = getCartSubtotal();
  const taxes = getCartTax();
  const total = getCartTotal();

  return (
    <section
      aria-labelledby="summary-heading"
      className="bg-gray-50 px-4 pb-10 pt-16 sm:px-6 lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16"
    >
      <div className="mx-auto max-w-lg lg:max-w-none">
        <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
          Resumen de tu orden
        </h2>

        <ul role="list" className="divide-y divide-gray-200 text-sm font-medium text-gray-900">
          {cart.products.map((item) => (
            <li key={item.id} className="flex items-start space-x-4 py-6">
              {item.images ? (
                <Image
                  alt={item.name}
                  src={item.images[0]}
                  className="size-20 flex-none rounded-md object-cover object-center"
                  width={80}
                  height={80}
                />
              ) : (
                <div className="size-20 flex-none rounded-md bg-gray-200" />
              )}
              <div className="flex-auto space-y-1">
                <h3>{item.name}</h3>
                {/* <p className="text-gray-500">{item.color}</p> */}
                {/* <p className="text-gray-500">{item.size}</p> */}
              </div>
              <p className="flex-none text-base font-medium">
                {formatVefCurrency(Number(item.bsPrice))}
              </p>
            </li>
          ))}
        </ul>
        <Coupon />
        <dl className="hidden space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-900 lg:block">
          <div className="flex items-center justify-between">
            <dt className="text-gray-600">Subtotal</dt>
            <dd>{formatVefCurrency(subtotal)}</dd>
          </div>

          <div className="flex items-center justify-between">
            <dt className="text-gray-600">Envío</dt>
            <dd>{formatVefCurrency(shippingAddress.type === 'pickup' ? 0 : deliveryFee)}</dd>
          </div>

          <div className="flex items-center justify-between">
            <dt className="text-gray-600">IVA:</dt>
            <dd>{formatVefCurrency(taxes)}</dd>
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 pt-6">
            <dt className="text-base">Total</dt>
            <dd className="text-base">{formatVefCurrency(total)}</dd>{' '}
          </div>
        </dl>

        <Popover className="fixed inset-x-0 bottom-0 flex flex-col-reverse text-sm font-medium text-gray-900 lg:hidden">
          <div className="relative z-10 border-t border-gray-200 bg-white px-4 sm:px-6">
            <div className="mx-auto max-w-lg">
              <PopoverButton className="flex w-full items-center py-6 font-medium">
                <span className="mr-auto text-base">Total</span>
                <span className="mr-2 text-base">{formatVefCurrency(total)}</span>{' '}
                <ChevronUpIcon aria-hidden="true" className="size-5 text-gray-500" />
              </PopoverButton>
            </div>
          </div>

          <PopoverBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <PopoverPanel
            transition
            className="relative transform bg-white px-4 py-6 transition duration-300 ease-in-out data-closed:translate-y-full sm:px-6"
          >
            <dl className="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-900">
              <div className="flex items-center justify-between">
                <dt className="text-gray-600">Subtotal</dt>
                <dd>{formatVefCurrency(subtotal)}</dd>
              </div>

              <div className="flex items-center justify-between">
                <dt className="text-gray-600">Envío</dt>
                <dd>{formatVefCurrency(shippingAddress.type === 'pickup' ? 0 : deliveryFee)}</dd>
              </div>

              <div className="flex items-center justify-between">
                <dt className="text-gray-600">IVA:</dt>
                <dd>{formatVefCurrency(taxes)}</dd>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                <dt className="text-base">Total</dt>
                <dd className="text-base">{formatVefCurrency(total)}</dd>{' '}
              </div>
            </dl>
          </PopoverPanel>
        </Popover>
      </div>
    </section>
  );
}
