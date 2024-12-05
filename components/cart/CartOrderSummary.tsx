import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation'
import { CHECKOUT } from '@/lib/routes'
import { useCartStore } from '@/stores/cart-store'
import { Button } from '../ui/button'

export default function CartOrderSummary() {
  const router = useRouter()
  const { getCartSubtotal, getCartTotal, getCartTax } = useCartStore()
  const total = getCartTotal()
  const tax = getCartTax()
  const subtotal = getCartSubtotal()
  return (
    <section
      aria-labelledby="summary-heading"
      className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
        Order summary
      </h2>

      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <dt className="text-sm text-gray-600">Subtotal</dt>
          <dd className="text-sm font-medium text-gray-900">{`Bs. ${subtotal.toFixed(2)}`}</dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt className="flex items-center text-sm text-gray-600">
            <span>Shipping estimate</span>
            <a href="#" className="ml-2 shrink-0 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Learn more about how shipping is calculated</span>
              <QuestionMarkCircleIcon aria-hidden="true" className="size-5" />
            </a>
          </dt>
          <dd className="text-sm font-medium text-gray-900">{`Bs. ${Number(7.0).toFixed(2)}`}</dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt className="flex text-sm text-gray-600">
            <span>Tax estimate</span>
            <a href="#" className="ml-2 shrink-0 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Learn more about how tax is calculated</span>
              <QuestionMarkCircleIcon aria-hidden="true" className="size-5" />
            </a>
          </dt>
          <dd className="text-sm font-medium text-gray-900">{`Bs. ${tax.toFixed(2)}`}</dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt className="text-base font-medium text-gray-900">Order total</dt>
          <dd className="text-base font-medium text-gray-900">{`Bs. ${total.toFixed(2)}`}</dd>
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
  )
}
