import { useEffect } from 'react';
import ProductCard from '@/components/products/ProductHome/ProductCard';
import { useInView } from 'react-intersection-observer';
import type { Product } from '@/types/product';
import { getProductDetailUrl } from '@/lib/utils';

// Utility function to safely parse numeric values
const safeParseFloat = (value: string | number | undefined): number => {
  if (typeof value === 'number' && !Number.isNaN(value)) return value;
  if (typeof value === 'string') {
    const parsed = Number.parseFloat(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};

// Utility function to format price
const formatPrice = (price: string | number | undefined): string => {
  const numericPrice = safeParseFloat(price);
  return `Bs. ${numericPrice.toFixed(2)}`;
};

interface ProductGridProps {
  products: Product[];
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  service?: boolean;
}

function ProductGrid({
  products,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  service = false,
}: ProductGridProps) {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '300px',
  });

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

      <div
        className={`grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8 place-items-center lg:place-items-start ${service ? 'xl:grid-cols-4 2xl:grid-cols-4' : 'xl:grid-cols-3'}`}
      >
        {validProducts.map((product, idx) => (
          <ProductCard
            key={product._id}
            image={product.images?.[0] || ''}
            price={Number(product.bsPrice) || 0}
            refPrice={Number(product.refPrice) || 0}
            originalPrice={Number(product.bsPrice) || 0}
            productUrl={getProductDetailUrl(product)}
            title={product.name || product.description || 'Producto sin nombre'}
            inventory={product.inventary.total || 0}
            discount={
              product.refPrice && product.bsPrice
                ? Math.round(
                    ((product.refPrice - Number(product.bsPrice)) / product.refPrice) * 100,
                  )
                : 0
            }
            taxes={product.taxes.find((tax) => tax.amount)?.amount || 0}
          />
        ))}
      </div>

      <div ref={ref} className="h-10 w-full">
        {isFetchingNextPage && (
          <div className="flex justify-center py-4">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductGrid;
