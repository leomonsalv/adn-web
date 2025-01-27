import { Skeleton } from '@/components/ui/skeleton';

export function PaymentDetailsSkeleton() {
  return (
    <div className="flex flex-col gap-y-6">
      {/* Payment Toggle Skeleton */}
      <Skeleton className="w-full max-w-[600px] h-12 rounded-md" />

      {/* Payment Methods List Skeleton */}
      <div className="flex flex-col w-full border rounded-lg">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="border-b p-4 last:border-b-0">
            <div className="flex items-center gap-x-3">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        ))}
      </div>

      {/* Security Message Skeleton */}
      <div className="flex items-center gap-x-1">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-48" />
      </div>

      {/* Submit Button Skeleton */}
      <Skeleton className="w-full h-14 rounded-md mt-4" />
    </div>
  );
}
