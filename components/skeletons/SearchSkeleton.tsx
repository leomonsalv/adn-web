import { Skeleton } from '@/components/ui/skeleton'
import { PlusIcon } from '@heroicons/react/24/outline'

export default function SearchPageSkeleton() {
  return (
    <main className="bg-white">
      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {/* Header skeleton */}
        <div className="border-b border-gray-200 pb-10">
          <Skeleton className="h-12 w-72 bg-gray-200" /> {/* Title */}
          <Skeleton className="mt-4 h-6 w-96 bg-gray-200" /> {/* Description */}
        </div>

        <div className="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
          {/* Filters skeleton */}
          <aside>
            <h2 className="sr-only">Filters</h2>
            <button type="button" className="inline-flex items-center lg:hidden">
              <span className="text-sm font-medium text-gray-700">Filters</span>
              <PlusIcon className="ml-1 size-5 shrink-0 text-gray-400" />
            </button>
            <div className="hidden lg:block">
              {/* Filter sections */}
              <form className="space-y-10 divide-y divide-gray-200">
                {[1, 2, 3].map((i) => (
                  <div key={i} className={i === 0 ? undefined : 'pt-10'}>
                    <fieldset>
                      <Skeleton className="h-5 w-24 bg-gray-200" /> {/* Filter section title */}
                      <div className="space-y-3 pt-6">
                        {[1, 2, 3, 4].map((j) => (
                          <div key={j} className="flex items-center">
                            <Skeleton className="size-4 bg-gray-200" /> {/* Checkbox */}
                            <Skeleton className="ml-3 h-4 w-32 bg-gray-200" /> {/* Option label */}
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                ))}
              </form>
            </div>
          </aside>

          {/* Product grid skeleton */}
          <div className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                >
                  <Skeleton className="aspect-[3/4] bg-gray-200 sm:h-96" />
                  <div className="flex flex-1 flex-col space-y-2 p-4">
                    <Skeleton className="h-5 w-2/3 bg-gray-200" /> {/* Title */}
                    <Skeleton className="h-4 w-3/4 bg-gray-200" /> {/* Description */}
                    <div className="flex flex-1 flex-col justify-end">
                      <Skeleton className="h-4 w-1/4 bg-gray-200" /> {/* Options */}
                      <Skeleton className="mt-1 h-5 w-1/3 bg-gray-200" /> {/* Price */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </main>
  )
}
