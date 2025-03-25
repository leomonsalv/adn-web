'use client';

import { formatText, formatVefCurrency } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ProductCardProps {
  image: string;
  discount?: number;
  price: number;
  originalPrice?: number;
  title: string;
  productUrl: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  discount = 0,
  price,
  originalPrice = 0,
  title,
  productUrl,
}) => {
  return (
    <div className="max-w-60 bg-white rounded-lg shadow-lg p-4 flex flex-col items-start my-1">
      <Link href={productUrl} className="w-full">
        <div className="w-full h-48 relative">
          {discount > 0 && (
            <span className="absolute bottom-2 left-2 px-2 py-1 bg-yellow-100 text-yellow-600 text-sm font-medium rounded-lg z-10 border-yellow-600 cursor-default">
              -{discount}%
            </span>
          )}

          <Image src={image} alt={title} fill sizes="100%" className="object-cover rounded-md" />
        </div>

        <div className="mt-4 flex flex-col items-start w-full">
          <div className="flex items-baseline gap-2">
            <p className="text-xl font-bold text-red-600">{formatVefCurrency(price)}</p>
            {/* <p className="text-sm line-through text-gray-500">{formatVefCurrency(originalPrice)}</p> */}
          </div>

          <p className="mt-2 text-gray-800 font-medium line-clamp-2">{formatText(title)}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
