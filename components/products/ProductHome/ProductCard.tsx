'use client';

import { formatText, formatUsdCurrency, formatVefCurrency } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  image: string;
  discount?: number;
  price: number;
  refPrice: number;
  originalPrice?: number;
  title: string;
  productUrl: string;
  inventory: number;
  taxes?: number;
}
const totalPrice = (price: number, taxes: number) => {
  return price + taxesPrice(price, taxes);
};

const taxesPrice = (price: number, taxes: number) => {
  return (price * taxes) / 100;
};

const totalRefPrice = (refPrice: number, taxes: number) => {
  return refPrice + taxesPrice(refPrice, taxes);
};

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  discount = 0,
  price,
  originalPrice = 0,
  title,
  productUrl,
  inventory = 0,
  taxes = 0,
  refPrice,
}) => {
  return (
    <div className="w-[240px] bg-white rounded-lg shadow-lg p-4 flex flex-col justify-between min-h-[400px]">
      <Link href={productUrl} className="w-full h-full flex flex-col">
        <div className="w-full h-48 relative mb-4">
          {discount > 0 && (
            <span className="absolute bottom-2 left-2 px-2 py-1 bg-yellow-100 text-yellow-600 text-sm font-medium rounded-lg z-10 border-yellow-600 cursor-default">
              -{discount}%
            </span>
          )}

          <Image src={image} alt={title} fill sizes="100%" className="object-cover rounded-md" />
        </div>
        <div className="flex flex-col items-start w-full flex-grow">
          <p className="text-gray-800 font-medium line-clamp-2">{formatText(title)}</p>
          {taxes && taxes > 0 ? (
            <p className="text-sm text-gray-500 mt-1">
              {formatVefCurrency(price)} + {formatVefCurrency(taxesPrice(price, taxes))} IVA
            </p>
          ) : null}
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-xl font-bold text-red-600">
              {formatVefCurrency(totalPrice(price, taxes))}
            </p>
          </div>
          <Badge color="green" className="mt-1">
            {formatUsdCurrency(totalRefPrice(refPrice, taxes))}
          </Badge>

          {/* Push availability indicator to bottom */}
          <div className="mt-auto pt-2">
            <div className="flex items-center">
              <div
                className={`w-3 h-3 rounded-full mr-2 ${inventory > 0 ? 'bg-green-500' : 'bg-red-500'}`}
              />
              <p className="text-sm text-gray-700">
                {inventory > 0 ? 'Disponible' : 'No disponible'}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
