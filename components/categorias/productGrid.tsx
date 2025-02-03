import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { Product } from '@/types/product';

// Utility function to safely parse numeric values
const safeParseFloat = (value: string | number | undefined): number => {
  if (typeof value === 'number' && !isNaN(value)) return value;
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};

// Utility function to format price
const formatPrice = (price: string | number | undefined): string => {
  const numericPrice = safeParseFloat(price);
  return `VEF ${numericPrice.toFixed(2)}`;
};

interface ProductGridProps {
  products: Product[];
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

function ProductGrid({
  products,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: ProductGridProps) {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '300px',
  });

  console.log(products);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  const getDefaultImage = (product: Product): string => {
    if (!product || typeof product !== 'object') return '/delivery.jpeg';
    if (!product.variantOptionsMap) return product.images?.[0] || '/delivery.jpeg';
    const firstVariantKey = Object.keys(product.variantOptionsMap)[0];
    if (!firstVariantKey) return '/delivery.jpeg';

    const variantImages = product.variantOptionsMap[firstVariantKey]?.images;
    return variantImages?.[0] || '/delivery.jpeg';
  };

  const validProducts = products.filter(
    (product) => product && typeof product === 'object' && '_id' in product && product.name,
  );

  return (
    <section aria-labelledby="product-heading" className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
      <h2 id="product-heading" className="sr-only">
        Products
      </h2>

      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
        {validProducts.map((product, idx) => (
          <div
            key={`${product._id}-${idx}`}
            className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
          >
            <div className="relative aspect-[3/4] bg-gray-200 sm:h-96">
              <Image
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'contain' }}
                alt={product.name || 'Product image'}
                priority
                src={getDefaultImage(product)}
                className="group-hover:opacity-75"
              />
            </div>
            <div className="flex flex-1 flex-col space-y-2 p-4">
              <h3 className="text-sm font-medium text-gray-900">
                <Link href={`/producto-detalle/${product._id}`}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {product.name}
                </Link>
              </h3>
              {product.activeIngredients && (
                <p className="text-sm text-gray-500">{product.activeIngredients}</p>
              )}
              <div className="flex flex-1 flex-col justify-end">
                {product.laboratory && (
                  <p className="text-sm italic text-gray-500">{product.laboratory}</p>
                )}
                <p className="text-base font-medium text-gray-900">
                  {formatPrice(product.bsPrice)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div ref={ref} className="h-10 w-full">
        {isFetchingNextPage && (
          <div className="flex justify-center py-4">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductGrid;
