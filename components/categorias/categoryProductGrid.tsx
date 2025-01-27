'use client';

import { useDebounce } from '@/hooks/use-debounce';
import useSearchProduct, { SearchFormType } from '@/hooks/use-search-products';
import { Filters, MobileFilterDialog } from '@/components/categorias/filters';
import ProductGrid from '@/components/categorias/productGrid';
import { useState, useEffect, useMemo } from 'react';
import { Facets } from '@/types/categories';

interface CategoryProductGridProps {
  category: string | null;
  subCategory: string | null;
  niche: string | null;
}

type SortOption = NonNullable<SearchFormType['sort']>;
type PriceRange = NonNullable<SearchFormType['priceRange']>;

export default function CategoryProductGrid({
  category,
  subCategory,
  niche,
}: CategoryProductGridProps) {
  // A lo mejor construyes un "filtro" con estos valores
  const [selectedFilters, setSelectedFilters] = useState<Partial<Record<keyof Facets, string[]>>>(
    {},
  );
  const [sortOption, setSortOption] = useState<SearchFormType['sort']>();
  const [priceRange, setPriceRange] = useState<SearchFormType['priceRange']>();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { searchProducts, updateSort, updatePriceRange, updateFilters, updateQuery } =
    useSearchProduct();

  // Por ejemplo, puedes combinar category/subCategory/niche en un "path" de búsqueda
  // O lo podrías pasar por un param en la búsqueda:
  const fullCategoryPath = [category, subCategory, niche].filter(Boolean).join('/');

  // Usas un debounce para la query
  const debouncedSearch = useDebounce(searchQuery, 600);

  useEffect(() => {
    // Cada vez que cambien category, subCategory o niche, reseteas la búsqueda
    setSearchQuery('');
  }, [category, subCategory, niche]);

  useEffect(() => {
    updateQuery(debouncedSearch.trim());
  }, [debouncedSearch, updateQuery]);

  const searchParamsObj = useMemo(() => {
    return {
      // Podrías pasar fullCategoryPath a tu hook, si tu backend
      // lo usa para filtrar / routear la solicitud de productos
      categoryPath: fullCategoryPath,
      query: debouncedSearch.trim(),
      pageSize: 10,
      facets: selectedFilters,
      sort: sortOption,
      priceRange,
    };
  }, [debouncedSearch, selectedFilters, sortOption, priceRange, fullCategoryPath]);

  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage, isError, error } =
    searchProducts(searchParamsObj);

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

  const products = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page) => page.data);
  }, [data?.pages]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (isError && error instanceof Error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        Error: {error.message}
      </div>
    );
  }
  return (
    <main className="bg-white">
      <main className="bg-white">
        <MobileFilterDialog
          isOpen={mobileFiltersOpen}
          setIsOpen={setMobileFiltersOpen}
          facets={data?.pages[0]?.facets}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          onPriceRangeChange={handlePriceRangeChange}
          currentSort={sortOption}
          currentPriceRange={priceRange}
        />

        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          {/* Título */}
          <div className="border-b border-gray-200 pb-10">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Productos</h1>
          </div>

          <div className="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <aside>
              <h2 className="sr-only">Filtros</h2>
              <button
                title="Filtros"
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="inline-flex items-center lg:hidden"
              />

              <div className="hidden lg:block">
                {/* <SortFilterOptions
                onSortChange={handleSortChange}
                onPriceRangeChange={handlePriceRangeChange}
                currentSort={sortOption}
                currentPriceRange={priceRange}
              /> */}
                <div className="mt-6">
                  <Filters
                    facets={data?.pages[0]?.facets}
                    selectedFilters={selectedFilters}
                    onFilterChange={handleFilterChange}
                    onSortChange={handleSortChange}
                    onPriceRangeChange={handlePriceRangeChange}
                    currentSort={sortOption}
                    currentPriceRange={priceRange}
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
    </main>
  );
}
