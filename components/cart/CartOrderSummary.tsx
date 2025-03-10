'use client';
import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid';
import { CHECKOUT } from '@/lib/routes';
import { useCartStore } from '@/stores/cart-store';
import { Button } from '../ui/button';
import { formatUsdCurrency, formatVefCurrency } from '@/lib/utils';
import useProducts from '@/hooks/use-products';
import { useEffect } from 'react';

export default function CartOrderSummary() {
  const { useGetDelivery } = useProducts();
  const {
    getCartSubtotal,
    getCartTotal,
    getCartTax,
    getRefCartTax,
    getCartRef,
    setDeliveryFee,
    deliveryFee,
  } = useCartStore();
  const { data: deliveryProduct, isLoading, isError } = useGetDelivery();
  const cartRef = getCartRef();

  useEffect(() => {
    if (deliveryProduct) {
      const deliveryFee = cartRef <= 7 ? Number(deliveryProduct.bsPrice || 0) : 0;
      setDeliveryFee(deliveryFee);
    }
  }, [deliveryProduct, cartRef, setDeliveryFee]);

  const tax = getCartTax();
  const refTax = getRefCartTax();
  const subtotal = getCartSubtotal();
  const total = getCartTotal();

  const deliveryRefPrice = cartRef <= 7 ? (deliveryProduct?.refPrice ?? 0) : 0;
  const totalRef = cartRef + deliveryRefPrice + refTax;

  if (!deliveryProduct) {
    return <div>Cargando costo de envío...</div>;
  }

  if (isLoading) {
    return <div>Cargando costo de envío...</div>;
  }

  if (isError) {
    return <div>Error al cargar el costo de envío.</div>;
  }

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
            <span>Total de envío:</span>
            <a href="#" className="ml-2 shrink-0 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Lee mas de como se calcula el envío</span>
              <QuestionMarkCircleIcon aria-hidden="true" className="size-5" />
            </a>
          </dt>
          <dd className="text-sm font-medium text-gray-900">{formatVefCurrency(deliveryFee)}</dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt className="flex text-sm text-gray-600">
            <span>IVA:</span>
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
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt className="text-base font-medium text-gray-900">Total REF:</dt>
          <dd className="text-base font-medium text-gray-900">{formatUsdCurrency(totalRef)}</dd>
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
