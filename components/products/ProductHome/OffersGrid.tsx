import type React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  link: string;
}

interface OffersGridProps {
  title: string;
  products: Product[];
  viewAllLink: string;
  variant?: 'default' | 'pink';
  icon?: React.ReactNode;
}

const OffersGrid = ({
  title,
  products,
  viewAllLink,
  variant = 'default',
  icon,
}: OffersGridProps) => {
  return (
    <Card
      className={cn(
        'w-full p-4 rounded-lg',
        variant === 'default'
          ? 'bg-white'
          : 'bg-linear-to-b from-[#FFDAD9] via-[#FFDAD980] to-[#FFDAD900]',
      )}
    >
      <h2
        className={cn(
          'text-lg font-semibold mb-4 flex items-center gap-2',
          variant === 'pink' && 'text-pink-700',
        )}
      >
        {title}
        {icon}
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {products.map((product) => (
          <Link key={product.id} href={product.link} className="block">
            <Card
              className={cn(
                'border-0 hover:shadow-md transition-shadow',
                variant === 'pink' && 'bg-white',
              )}
            >
              <CardContent className="p-4">
                <div className="relative w-full pt-[100%]">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2 truncate" title={product.name}>
                  {product.name}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Link
        href={viewAllLink}
        className={cn('text-sm hover:underline block text-start text-blue-600')}
      >
        Ver todas las ofertas
      </Link>
    </Card>
  );
};

export default OffersGrid;
