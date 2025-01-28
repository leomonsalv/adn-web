import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

interface ProductVariantOption {
  SKU: string;
  price: number;
  stock: number;
}

interface ProductCategory {
  editable: string;
  full_name: string;
  name: string;
}

interface Product {
  _id: string;
  activeIngredients: string;
  attack: string;
  barcode: string;
  betterAttack: string[];
  betterIngredients: string[];
  bsPrice: string;
  category: ProductCategory;
  description: string;
  inventary: { total: number };
  laboratory: string;
  name: string;
  productId: number;
  refPrice: number;
  variantOptionsMap: {
    [key: string]: {
      images: string[];
      options: {
        [key: string]: ProductVariantOption;
      };
    };
  };
}

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
  console.log('🚀 ~ ProductGrid ~ products:', products);
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
    if (!product.variantOptionsMap) return '/delivery.jpeg';

    const firstVariantKey = Object.keys(product.variantOptionsMap)[0];
    if (!firstVariantKey) return '/delivery.jpeg';

    const variantImages = product.variantOptionsMap[firstVariantKey]?.images;
    return variantImages?.[0] || '/delivery.jpeg';
  };

  return (
    <section aria-labelledby="product-heading" className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
      <h2 id="product-heading" className="sr-only">
        Products
      </h2>

      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
        {products.map((product, idx) => (
          <div
            key={`${product._id}-${idx}`}
            className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
          >
            <Image
              width={400}
              height={500}
              style={{
                objectFit: 'contain',
              }}
              alt={product.name || 'Product image'}
              src={getDefaultImage(product)}
              className="aspect-[3/4] bg-gray-200 object-cover group-hover:opacity-75 sm:h-96"
            />
            <div className="flex flex-1 flex-col space-y-2 p-4">
              <h3 className="text-sm font-medium text-gray-900">
                <Link href={`/producto-detalle/${product._id}`}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {product.name}
                </Link>
              </h3>
              <p className="text-sm text-gray-500">{product.activeIngredients}</p>
              <div className="flex flex-1 flex-col justify-end">
                <p className="text-sm italic text-gray-500">{product.laboratory}</p>
                <p className="text-base font-medium text-gray-900">{`VEF ${product.bsPrice}`}</p>
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
