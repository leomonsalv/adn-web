'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useDebounce } from '@/hooks/use-debounce';
import type { SearchFormType } from '@/hooks/use-search-products';
import { Filters, MobileFilterDialog } from '@/components/categorias/filters';
import ProductGrid from '@/components/categorias/productGrid';
import type { Facets } from '@/types/categories';
import useSpecialCategories from '@/hooks/use-special-categories';
import { NextSeo } from 'next-seo';
import type { Product } from '@/types/product';

interface SpecialCategoryPageProps {
  params: {
    special_category: string;
  };
}

interface UnwrappedParams {
  special_category: string;
}

interface ApiProduct {
  id: string;
  active_ingredients?: string;
  attack?: string;
  product_id: number;
  barcode: string;
  bs_price: number;
  description: string;
  inventary: Inventary;
  name: string;
  slug: string;
  ref_price: number;
  laboratory?: string;
  synons?: string;
  template_id: number;
  type: 'libre' | 'prescripcion' | 'tienda';
  visible: boolean;
  images: string[];
}
interface Inventary {
  'FADPV/Stock/E17F4': number;
  total: number;
}

type SortOption = NonNullable<SearchFormType['sort']>;
type PriceRange = NonNullable<SearchFormType['priceRange']>;

export default function SpecialCategoryPage({ params }: SpecialCategoryPageProps) {
  // Desempaquetar correctamente con React.use()
  const unwrappedParams = React.use<UnwrappedParams>(params);
  const { special_category } = unwrappedParams;
  const [selectedFilters, setSelectedFilters] = useState<Partial<Record<keyof Facets, string[]>>>(
    {},
  );
  const [sortOption, setSortOption] = useState<SearchFormType['sort']>();
  const [priceRange, setPriceRange] = useState<SearchFormType['priceRange']>();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { useGetSpecialCategoryBySlug } = useSpecialCategories();
  // Fetch the special category directly by slug
  const {
    data: specialCategoryDetail,
    isLoading: loadingSpecialCategories,
    error: categoryError,
  } = useGetSpecialCategoryBySlug(special_category); // Now passing string

  const debouncedSearch = useDebounce(searchQuery, 600);

  const categoryName = specialCategoryDetail?.name || specialCategoryDetail?.slug;

  const seoTitle = categoryName ? `${categoryName} | Adan Life` : 'Ofertas | Adan Tu vida Tu Flow';

  const seoDescription = specialCategoryDetail?.is_active
    ? specialCategoryDetail.description || `Explora nuestras ofertas especiales en ${categoryName}`
    : 'Descubre todas nuestras ofertas especiales en Adan Life';

  useEffect(() => {
    setSearchQuery('');
  }, [special_category]);

  const mapApiProductToUiProduct = (apiProduct: ApiProduct): Product => ({
    _id: apiProduct.id,
    active: apiProduct.visible ?? true,
    activeIngredients: apiProduct.active_ingredients || null,
    attack: apiProduct.attack || null,
    barcode: apiProduct.barcode || '',
    betterAttack: [],
    betterIngredients: [],
    bsPrice: apiProduct.bs_price?.toString() || '0',
    category: {
      full_name: '',
      name: '',
      slug: '',
      editable: '',
      id: 0,
    },
    description: apiProduct.description || '',
    id: apiProduct.product_id,
    images: apiProduct.images || [],
    inventary: { total: apiProduct.inventary?.total || 0 },
    laboratory: apiProduct.laboratory || '',
    quantity: 1,
    name: apiProduct.name,
    price: apiProduct.bs_price || 0,
    price_extra: 0,
    slug: apiProduct.slug,
    productId: apiProduct.product_id,
    refPrice: apiProduct.ref_price || 0,
    synons: apiProduct.synons || null,
    taxes: [],
    type: apiProduct.type,
    templateId: Number(apiProduct.template_id),
    visible: apiProduct.visible ?? true,
  });

  // Transformar los productos de specialCategoryDetail al formato esperado por ProductGrid
  const transformedProducts = useMemo(() => {
    if (!specialCategoryDetail?.products || !Array.isArray(specialCategoryDetail.products)) {
      return [];
    }
    return (specialCategoryDetail.products as unknown as ApiProduct[]).map((product: ApiProduct) =>
      mapApiProductToUiProduct(product),
    );
  }, [specialCategoryDetail]);

  // Funciones auxiliares para filtrado y ordenamiento
  const filterBySearchTerm = (products: Product[], searchTerm: string): Product[] => {
    if (!searchTerm.trim()) return products;

    const searchLower = searchTerm.trim().toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchLower) ||
        (product.description && product.description.toLowerCase().includes(searchLower)) ||
        (product.activeIngredients &&
          product.activeIngredients.toLowerCase().includes(searchLower)),
    );
  };

  // Enhance the sortProducts function to ensure it works with the data structure
  const sortProducts = (products: Product[], option?: SortOption): Product[] => {
    if (!option) return products;

    const sortedProducts = [...products];

    const sortFunctions = {
      'price-asc': (a: Product, b: Product) => Number(a.bsPrice) - Number(b.bsPrice),
      'price-desc': (a: Product, b: Product) => Number(b.bsPrice) - Number(a.bsPrice),
      'name-asc': (a: Product, b: Product) => a.name.localeCompare(b.name),
      'name-desc': (a: Product, b: Product) => b.name.localeCompare(a.name),
    };

    return sortedProducts.sort(sortFunctions[option as keyof typeof sortFunctions] || (() => 0));
  };

  // Add a function to filter by price range
  const filterByPriceRange = (products: Product[], range?: PriceRange): Product[] => {
    if (!range || (!range.min && !range.max)) return products;

    return products.filter((product) => {
      const price = Number(product.bsPrice);
      const min = range.min !== undefined ? range.min : 0;
      const max = range.max !== undefined ? range.max : Number.POSITIVE_INFINITY;

      return price >= min && price <= max;
    });
  };

  // Update the filteredProducts to include price range filtering
  const filteredProducts = useMemo(() => {
    if (!transformedProducts.length) return [];

    // Apply filters in chain (pipeline)
    return sortProducts(
      filterByPriceRange(filterBySearchTerm(transformedProducts, debouncedSearch), priceRange),
      sortOption,
    );
  }, [transformedProducts, debouncedSearch, sortOption, priceRange]);

  // Estado de carga y errores
  const isLoading = loadingSpecialCategories;
  const isError = false;
  const error = null;

  const handleFilterChange = (newFilters: Partial<Record<keyof Facets, string[]>>) => {
    setSelectedFilters(newFilters);
  };

  const handleSortChange = (newSort: SortOption) => {
    setSortOption(newSort);
  };

  const handlePriceRangeChange = (newRange: PriceRange) => {
    setPriceRange(newRange);
  };

  // Usar los productos filtrados directamente
  const products = filteredProducts;

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
        <div className="text-red-500">Error: {'Ocurrió un error al cargar los productos'}</div>
      </div>
    );
  }

  if (categoryError || !specialCategoryDetail) {
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
          {specialCategoryDetail?.name || specialCategoryDetail?.title}
        </h1>
        {specialCategoryDetail?.description && (
          <p className="text-gray-500 mb-8">{specialCategoryDetail?.description}</p>
        )}

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          {/* Filters */}
          <div className="hidden lg:block">
            <Filters
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
              onPriceRangeChange={handlePriceRangeChange}
              currentSort={sortOption}
              currentPriceRange={priceRange}
            />
          </div>

          {/* Mobile filter dialog */}
          <MobileFilterDialog
            isOpen={mobileFiltersOpen}
            setIsOpen={setMobileFiltersOpen}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            onPriceRangeChange={handlePriceRangeChange}
            currentSort={sortOption}
            currentPriceRange={priceRange}
          />

          {/* Product grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium text-gray-900">Productos ({products.length})</h2>

              <div className="flex items-center space-x-4">
                <div className="hidden sm:block">
                  <label htmlFor="sort-by" className="sr-only">
                    Ordenar por
                  </label>
                  <select
                    id="sort-by"
                    name="sort-by"
                    className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={sortOption || ''}
                    onChange={(e) => handleSortChange(e.target.value as SortOption)}
                  >
                    <option value="">Ordenar por</option>
                    <option value="price-asc">Precio: Menor a Mayor</option>
                    <option value="price-desc">Precio: Mayor a Menor</option>
                    <option value="name-asc">Nombre: A-Z</option>
                    <option value="name-desc">Nombre: Z-A</option>
                  </select>
                </div>

                <button
                  type="button"
                  className="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  Filtros
                </button>
              </div>
            </div>

            <ProductGrid
              products={filteredProducts}
              hasNextPage={false}
              isFetchingNextPage={false}
              fetchNextPage={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
