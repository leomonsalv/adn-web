'use client';

import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Filters, MobileFilterDialog } from '@/components/categorias/filters';
import ProductGrid from '@/components/categorias/productGrid';
import useSearchProduct from '@/hooks/use-search-products';

export default function CategoryPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { searchProducts } = useSearchProduct();
  const { data, isLoading } = searchProducts({ query: '' });

  if (isLoading) return <div>Cargando...</div>;

  return (
    <main className="bg-white">
      <MobileFilterDialog
        isOpen={mobileFiltersOpen}
        setIsOpen={setMobileFiltersOpen}
        facets={data?.facets}
      />
      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="border-b border-gray-200 pb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Nuevos productos</h1>
          <p className="mt-4 text-base text-gray-500">Revisa lo nuevo que tenemos para ti</p>
        </div>
        <div className="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
          <aside>
            <h2 className="sr-only">Filtros</h2>
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="inline-flex items-center lg:hidden"
            >
              <span className="text-sm font-medium text-gray-700">Filtros</span>
              <PlusIcon aria-hidden="true" className="ml-1 size-5 shrink-0 text-gray-400" />
            </button>
            <div className="hidden lg:block">
              <Filters facets={data?.facets} />
            </div>
          </aside>
          {data?.data && <ProductGrid products={data.data} />}
        </div>
      </main>
    </main>
  );
}
