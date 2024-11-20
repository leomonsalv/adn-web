import React from "react";
import { products } from "@/lib/dummyData";
import Link from "next/link";
type Props = {};

function ProductGrid({}: Props) {
  return (
    <section
      aria-labelledby="product-heading"
      className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3"
    >
      <h2 id="product-heading" className="sr-only">
        Products
      </h2>

      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
          >
            <img
              alt={product.imageAlt}
              src={product.imageSrc}
              className="aspect-[3/4] bg-gray-200 object-cover group-hover:opacity-75 sm:h-96"
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
                <p className="text-sm italic text-gray-500">
                  {product.options}
                </p>
                <p className="text-base font-medium text-gray-900">
                  {product.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductGrid;
