'use client';

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
    <div className="max-w-xs bg-white rounded-lg shadow-lg p-4 flex flex-col items-start">
      {/* Imagen del Producto */}
      <div className="w-40 h-40 relative mx-auto">
        <Image
          src={image}
          alt={title}
          width={130}
          height={150}
          className="w-full h-full rounded-md"
        />
      </div>

      <div className="flex flex-col items-start">
        {/* Espacio reservado para el descuento */}
        <div className="mt-4 h-6 flex items-center">
          {discount > 0 ? (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-600 text-sm font-medium rounded-lg">
              -{discount}%
            </span>
          ) : (
            <div className="h-6"></div> // Caja vacía con altura fija
          )}
        </div>

        {/* Precio */}
        <div className="mt-2 flex items-baseline gap-2">
          <p className="text-xl font-bold text-red-600">${price.toFixed(2)}</p>
          <p className="text-sm line-through text-gray-500">${originalPrice.toFixed(2)}</p>
        </div>

        {/* Nombre del Producto */}
        <p className="mt-2 text-gray-800 font-medium">{title}</p>
      </div>
    </div>
  );
};

export default ProductCard;
