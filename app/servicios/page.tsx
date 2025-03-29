'use client';
import { useState } from 'react';
import ProductGrid from '@/components/categorias/productGrid';
import useSearchProduct, { SearchFormType } from '@/hooks/use-search-products';
import { useSearchParams } from 'next/navigation';
import SearchPageSkeleton from '@/components/skeletons/SearchSkeleton';
import { Facets } from '@/types/categories';
import { NextSeo } from 'next-seo';

type SortOption = NonNullable<SearchFormType['sort']>;
type PriceRange = NonNullable<SearchFormType['priceRange']>;

export default function ServicesPage() {
  const searchParams = useSearchParams();
  const urlSearch = searchParams.get('q') ?? '';
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<
    Partial<Record<keyof SearchFormType, string[]>>
  >({});
  const [sortOption, setSortOption] = useState<SortOption>();
  const [priceRange, setPriceRange] = useState<PriceRange>();

  const { searchProducts, updateSort, updatePriceRange, updateFilters } = useSearchProduct(true);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } =
    searchProducts({
      search: urlSearch,
      pageSize: 10,
      service: '3', // This indicates we only want services
      sort: sortOption,
      priceRange: priceRange,
    });

  const handleFilterChange = (newFilters: Partial<Record<keyof Facets, string[]>>) => {
    setSelectedFilters(newFilters as Partial<Record<keyof SearchFormType, string[]>>);
    updateFilters(newFilters);
  };

  const handleSortChange = (newSort: SortOption) => {
    setSortOption(newSort);
    updateSort(newSort);
  };

  const handlePriceRangeChange = (newRange: PriceRange) => {
    setPriceRange(newRange);
    updatePriceRange(newRange);
  };

  const services = data?.pages.flatMap((page) => page.items) || [];

  if (isLoading) return <SearchPageSkeleton />;

  if (isError && error instanceof Error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        Error: {error.message}
      </div>
    );
  }

  return (
    <main className="bg-white">
      <NextSeo
        title={'Servicios'}
        description={'Servicios disponibles en Adan Farmacia'}
        openGraph={{
          title: 'Servicios',
          description: 'Servicios disponibles en Adan Farmacia',
          siteName: 'Adan Farmacia',
        }}
      />

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {/* Title */}
        <div className="border-b border-gray-200 pb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            {urlSearch ? `Búsqueda: ${urlSearch}` : 'Servicios'}
          </h1>
        </div>

        <div className="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
          <section className="lg:col-span-2 xl:col-span-3">
            {services.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No se encontraron servicios</p>
              </div>
            ) : (
              <ProductGrid
                products={services}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                fetchNextPage={fetchNextPage}
                service={true}
              />
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
