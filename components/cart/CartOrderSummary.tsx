'use client';
import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid';
import { CHECKOUT } from '@/lib/routes';
import { useCartStore } from '@/stores/cart-store';
import { Button } from '../ui/button';
import { formatVefCurrency } from '@/lib/utils';
import useProducts from '@/hooks/use-products';
import useRate from '@/hooks/use-rate';

export default function CartOrderSummary() {
  const { useGetDelivery } = useProducts();
  const { useGetRate } = useRate();
  const { getCartSubtotal, getCartTotal, getCartTax } = useCartStore();

  const { data: deliveryProduct } = useGetDelivery();
  const { data: rate } = useGetRate();

  const deliveryPriceUSD = rate ? Number(deliveryProduct?.bsPrice || 0) / Number(rate) : 0;
  const deliveryFee = deliveryPriceUSD <= 7 ? Number(deliveryProduct?.bsPrice || 0) : 0;
  const total = getCartTotal() + deliveryFee;
  const tax = getCartTax();
  const subtotal = getCartSubtotal();

  return (
    <section
      aria-labelledby="summary-heading"
      className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
        Resumen de tu orden
      </h2>

      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <dt className="text-sm text-gray-600">Subtotal:</dt>
          <dd className="text-sm font-medium text-gray-900">{formatVefCurrency(subtotal)}</dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt className="flex items-center text-sm text-gray-600">
            <span>Estimado de envío:</span>
            <a href="#" className="ml-2 shrink-0 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Lee mas de como se calcula el envío</span>
              <QuestionMarkCircleIcon aria-hidden="true" className="size-5" />
            </a>
          </dt>
          <dd className="text-sm font-medium text-gray-900">{formatVefCurrency(deliveryFee)}</dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt className="flex text-sm text-gray-600">
            <span>Estimado de Impuestos</span>
            <a href="#" className="ml-2 shrink-0 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Lee mas de como es calculado el impuesto</span>
              <QuestionMarkCircleIcon aria-hidden="true" className="size-5" />
            </a>
          </dt>
          <dd className="text-sm font-medium text-gray-900">{formatVefCurrency(tax)}</dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt className="text-base font-medium text-gray-900">Total de la orden:</dt>
          <dd className="text-base font-medium text-gray-900">{formatVefCurrency(total)}</dd>
        </div>
      </dl>

      <div className="mt-6">
        <Button
          href={CHECKOUT}
          color="indigo"
          className="w-full rounded-md border border-transparent"
        >
          Checkout
        </Button>
      </div>
    </section>
  );
}
