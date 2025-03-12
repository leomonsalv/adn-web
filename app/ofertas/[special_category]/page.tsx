'use client';

import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from '@/hooks/use-debounce';
import useSearchProduct, { SearchFormType } from '@/hooks/use-search-products';
import { Filters, MobileFilterDialog } from '@/components/categorias/filters';
import ProductGrid from '@/components/categorias/productGrid';
import { Facets } from '@/types/categories';
import useSpecialCategories from '@/hooks/use-special-categories';
import { NextSeo } from 'next-seo';

interface SpecialCategoryPageProps {
  params: {
    special_category: string;
  };
}

type SortOption = NonNullable<SearchFormType['sort']>;
type PriceRange = NonNullable<SearchFormType['priceRange']>;

export default function SpecialCategoryPage({ params }: SpecialCategoryPageProps) {
  const { special_category } = params;
  const [selectedFilters, setSelectedFilters] = useState<Partial<Record<keyof Facets, string[]>>>(
    {},
  );
  const [sortOption, setSortOption] = useState<SearchFormType['sort']>();
  const [priceRange, setPriceRange] = useState<SearchFormType['priceRange']>();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { useGetSpecialCategories } = useSpecialCategories();
  const { data: specialCategoriesData, isLoading: loadingSpecialCategories } =
    useGetSpecialCategories({ active: true });

  const specialCategory = useMemo(() => {
    if (!specialCategoriesData?.special_categories) return null;
    return specialCategoriesData.special_categories.find(
      (category) => category.title.toLowerCase().replace(/\s+/g, '-') === special_category,
    );
  }, [specialCategoriesData, special_category]);

  const { searchProducts, updateSort, updatePriceRange, updateFilters, updateQuery } =
    useSearchProduct();

  const debouncedSearch = useDebounce(searchQuery, 600);

  const seoTitle = specialCategory
    ? `${specialCategory.title} | Adan Farmacia`
    : `Ofertas | Adan Farmacia`;

  const seoDescription = specialCategory
    ? specialCategory.description ||
      `Explora nuestras ofertas especiales en ${specialCategory.title}`
    : `Descubre todas nuestras ofertas especiales en Adan Farmacia`;

  useEffect(() => {
    setSearchQuery('');
  }, [special_category]);

  useEffect(() => {
    updateQuery(debouncedSearch.trim());
  }, [debouncedSearch, updateQuery]);

  const searchParamsObj = useMemo(() => {
    return {
      category: specialCategory?.category_id,
      query: debouncedSearch.trim(),
      pageSize: 10,
      facets: selectedFilters,
      sort: sortOption,
      priceRange: priceRange,
    };
  }, [debouncedSearch, selectedFilters, sortOption, priceRange, specialCategory]);

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
    return data.pages.flatMap((page) => page.items);
  }, [data?.pages]);

  if (isLoading || loadingSpecialCategories) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">
          Error: {error?.message || 'Ocurrió un error al cargar los productos'}
        </div>
      </div>
    );
  }

  if (!specialCategory) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500">Categoría especial no encontrada</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <NextSeo title={seoTitle} description={seoDescription} />

      <div className="pt-6 pb-24">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
          {specialCategory.title}
        </h1>
        {specialCategory.description && (
          <p className="text-gray-500 mb-8">{specialCategory.description}</p>
        )}

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          {/* Filters */}
          <div className="hidden lg:block">
            <Filters
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
              onPriceRangeChange={handlePriceRangeChange}
              sortOption={sortOption}
              priceRange={priceRange}
            />
          </div>

          {/* Mobile filter dialog */}
          <MobileFilterDialog
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            onPriceRangeChange={handlePriceRangeChange}
            sortOption={sortOption}
            priceRange={priceRange}
          />

          {/* Product grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium text-gray-900">
                Productos ({data?.pages?.[0]?.total || 0})
              </h2>
              <button
                type="button"
                className="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                Filtros
              </button>
            </div>

            <ProductGrid
              products={products}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
