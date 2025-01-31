import React, { useEffect } from 'react';
import Link from 'next/link';
import { SearchResponseProduct } from '@/types/search';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

interface ProductGridProps {
  products: SearchResponseProduct[];
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
  //  infinite scroll
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '300px',
  });

  // Cargar más productos cuando el último elemento es visible
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <section aria-labelledby="product-heading" className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
      <h2 id="product-heading" className="sr-only">
        Products
      </h2>

      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
        {products.map((product, idx) => (
          <div
            key={`${product.id}-${idx}`}
            className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
          >
            <Image
              width={400}
              height={500}
              style={{
                objectFit: 'contain',
              }}
              alt={product.name}
              src={product.imageLarge || '/delivery.jpeg'}
              className="aspect-3/4 bg-gray-200 object-cover group-hover:opacity-75 sm:h-96"
            />
            <div className="flex flex-1 flex-col space-y-2 p-4">
              <h3 className="text-sm font-medium text-gray-900">
                <Link href={`/producto-detalle/${product.id}`}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {product.name}
                </Link>
              </h3>
              <p className="text-sm text-gray-500">{product.description}</p>
              <div className="flex flex-1 flex-col justify-end">
                <p className="text-sm italic text-gray-500">{product.laboratory}</p>
                <p className="text-base font-medium text-gray-900">{`VEF ${product.price}`}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Loading trigger element */}
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
