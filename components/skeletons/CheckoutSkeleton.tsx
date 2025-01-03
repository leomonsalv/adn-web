'use client';

import { Skeleton } from '@/components/ui/skeleton';

export default function CheckoutSkeleton() {
  return (
    <div className="bg-white">
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48 pt-16">
        {/* Left column - Checkout forms */}
        <div className="px-4 pb-10 pt-4 sm:px-6 lg:px-0 lg:pb-16">
          {/* Contact Information Section */}
          <div className="mb-8">
            <Skeleton className="h-7 w-48 mb-6" /> {/* Section title */}
            <div className="space-y-4">
              <div>
                <Skeleton className="h-4 w-24 mb-2" /> {/* Email label */}
                <Skeleton className="h-10 w-full rounded-md" /> {/* Email input */}
              </div>
              <div>
                <Skeleton className="h-4 w-28 mb-2" /> {/* Phone label */}
                <Skeleton className="h-10 w-full rounded-md" /> {/* Phone input */}
              </div>
              <div>
                <Skeleton className="h-4 w-16 mb-2" /> {/* DNI label */}
                <Skeleton className="h-10 w-full rounded-md" /> {/* DNI input */}
              </div>
            </div>
            <Skeleton className="h-10 w-32 rounded-md mt-6" /> {/* Continue button */}
          </div>

          {/* Shipping Address Section */}
          <div className="mb-8">
            <Skeleton className="h-7 w-48 mb-6" /> {/* Section title */}
            <div className="h-32 w-full rounded-md bg-gray-100" /> {/* Address form placeholder */}
          </div>

          {/* Payment Method Section */}
          <div>
            <Skeleton className="h-7 w-48 mb-6" /> {/* Section title */}
            <Skeleton className="h-4 w-full max-w-md mb-4" /> {/* Security message */}
          </div>
        </div>

        {/* Right column - Order summary */}
        <div className="px-4 pb-10 pt-4 sm:px-6 lg:px-0 lg:pb-16">
          <Skeleton className="h-7 w-32 mb-6" /> {/* Order summary title */}
          {/* Order items */}
          <div className="space-y-4 mb-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center gap-4">
                <Skeleton className="h-16 w-16 rounded" /> {/* Product image */}
                <div className="flex-1">
                  <Skeleton className="h-4 w-3/4 mb-2" /> {/* Product name */}
                  <Skeleton className="h-4 w-20" /> {/* Product price */}
                </div>
              </div>
            ))}
          </div>
          {/* Order totals */}
          <div className="space-y-3 border-t pt-4">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-16" /> {/* Subtotal label */}
              <Skeleton className="h-4 w-20" /> {/* Subtotal amount */}
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-16" /> {/* Shipping label */}
              <Skeleton className="h-4 w-20" /> {/* Shipping amount */}
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-16" /> {/* Taxes label */}
              <Skeleton className="h-4 w-20" /> {/* Taxes amount */}
            </div>
            <div className="flex justify-between pt-3 border-t">
              <Skeleton className="h-5 w-16" /> {/* Total label */}
              <Skeleton className="h-5 w-24" /> {/* Total amount */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
