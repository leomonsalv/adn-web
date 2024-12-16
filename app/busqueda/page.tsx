'use client'

import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { Filters, MobileFilterDialog } from '@/components/categorias/filters'
import { filters } from '@/lib/dummyData'
import ProductGrid from '@/components/categorias/productGrid'
import useSearchProduct from '@/hooks/use-search-products'
import { useSearchParams } from 'next/navigation'

export default function SearchPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const params = useSearchParams()
  console.log('🚀 ~ SearchPage ~ params:', params)
  const search = params.get('search')
  const category = params.get('category')

  const { searchProducts } = useSearchProduct()
  const { data, isLoading } = searchProducts({ query: '' })

  if (isLoading) return <div>Loading...</div>

  return (
    <main className="bg-white">
      <MobileFilterDialog
        isOpen={mobileFiltersOpen}
        setIsOpen={setMobileFiltersOpen}
        filters={filters}
      />
      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="border-b border-gray-200 pb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>
          <p className="mt-4 text-base text-gray-500">
            Checkout out the latest release of Basic Tees, new and improved with four openings!
          </p>
        </div>
        <div className="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
          <aside>
            <h2 className="sr-only">Filters</h2>
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="inline-flex items-center lg:hidden"
            >
              <span className="text-sm font-medium text-gray-700">Filters</span>
              <PlusIcon aria-hidden="true" className="ml-1 size-5 shrink-0 text-gray-400" />
            </button>
            <div className="hidden lg:block">
              <Filters filters={filters} />
            </div>
          </aside>
          {data?.data && (
            // Product grid
            <ProductGrid products={data.data} />
          )}
        </div>
      </main>
    </main>
  )
}
