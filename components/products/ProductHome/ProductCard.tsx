import Image from 'next/image';
import React from 'react';

interface ProductCardProps {
  image: string;
  discount: number;
  price: number;
  originalPrice: number;
  title: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  discount,
  price,
  originalPrice,
  title,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center w-64">
      <div className="w-full h-48 relative mb-4">
        <Image height={100} width={60} src={image} alt={title} />
      </div>
      <div className="flex items-center justify-start w-full mb-2">
        <span className="bg-yellow-400 text-white text-xs font-bold py-1 px-2 rounded">
          -{discount}%
        </span>
      </div>
      <div className="flex items-baseline justify-start w-full mb-4">
        <span className="text-red-500 text-lg font-bold mr-2">${price.toFixed(2)}</span>
        <span className="text-gray-400 line-through text-sm">${originalPrice.toFixed(2)}</span>
      </div>
      <h3 className="text-gray-800 text-base font-medium text-center">{title}</h3>
    </div>
  );
};

export default ProductCard;
