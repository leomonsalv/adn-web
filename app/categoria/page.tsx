'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { FunnelIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Filters, MobileFilterDialog } from '@/components/categorias/filters';
import ProductGrid from '@/components/categorias/productGrid';
import useSearchProduct from '@/hooks/use-search-products';
import { Facets } from '@/types/categories';
import type { SortOption, PriceRange } from '@/hooks/use-search-products';
import { SortFilterOptions } from '@/components/categorias/sortFilterOptions';
import { useDebounce } from '@/hooks/use-debounce';

export default function CategoryPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Partial<Record<keyof Facets, string[]>>>(
    {},
  );
  const [sortOption, setSortOption] = useState<SortOption>();
  const [priceRange, setPriceRange] = useState<PriceRange>();
  const [searchQuery, setSearchQuery] = useState('');
  const [actualSearch, setActualSearch] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 1000);

  const { searchProducts, updateSort, updatePriceRange, updateFilters, updateQuery } =
    useSearchProduct();

  useEffect(() => {
    updateQuery(debouncedSearch);
  }, [debouncedSearch, updateQuery]);

  const searchParams = useMemo(
    () => ({
      query: debouncedSearch,
      pageSize: 10,
      facets: selectedFilters,
      sort: sortOption,
      priceRange: priceRange,
    }),
    [debouncedSearch, selectedFilters, sortOption, priceRange],
  );

  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage, isError, error } =
    searchProducts(searchParams);

  const handleFilterChange = (newFilters: Partial<Record<keyof Facets, string[]>>) => {
    setSelectedFilters(newFilters);
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

  const executeSearch = useCallback(() => {
    setActualSearch(searchQuery.trim());
    updateQuery(searchQuery.trim());
  }, [searchQuery, updateQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      updateQuery(searchQuery.trim());
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    updateQuery('');
  };

  const products = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page) => page.data);
  }, [data?.pages]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        Error: {error.message}
      </div>
    );

  console.log('data', data, 'products', products);
  return (
    <main className="bg-white">
      {/* Diálogo móvil de filtros */}
      <MobileFilterDialog
        isOpen={mobileFiltersOpen}
        setIsOpen={setMobileFiltersOpen}
        facets={data?.pages[0]?.facets}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
      />

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="border-b border-gray-200 pb-10">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Productos</h1>

            {/* Formulario de búsqueda */}
            <form onSubmit={handleSubmit} className="mt-4 flex">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      <XMarkIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      <span className="sr-only">Limpiar búsqueda</span>
                    </button>
                  )}
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
              </div>
            </form>
          </div>
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
              <FunnelIcon className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            </button>

            <div className="hidden lg:block">
              <SortFilterOptions
                onSortChange={handleSortChange}
                onPriceRangeChange={handlePriceRangeChange}
                currentSort={sortOption}
                currentPriceRange={priceRange}
              />

              <div className="mt-6">
                <Filters
                  facets={data?.pages[0]?.facets}
                  selectedFilters={selectedFilters}
                  onFilterChange={handleFilterChange}
                />
              </div>
            </div>
          </aside>

          <section className="lg:col-span-2 xl:col-span-3">
            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No se encontraron productos</p>
              </div>
            ) : (
              <ProductGrid
                products={products}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                fetchNextPage={fetchNextPage}
              />
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
