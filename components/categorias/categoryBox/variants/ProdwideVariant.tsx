import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { HeroProductItem } from '@/types/home';
import { formatVefCurrency } from '@/lib/utils';

interface ProdwideVariantProps {
  title: string;
  description: string;
  products: HeroProductItem[];
  background: string;
  link: string;
  wide: string;
}

const ProdwideVariant = ({
  title,
  description,
  products,
  background,
  link,
  wide,
}: ProdwideVariantProps) => {
  return (
    <Link href={link} className="block h-full">
      <Card
        className={`overflow-hidden transition-all duration-500 hover:shadow-lg p-6 w-full h-full rounded-md shadow-xs flex flex-col text-left group relative`}
        style={{ backgroundColor: background || '#EBF3ED' }}
      >
        {/* Title and Description */}
        <div className="z-10 mb-4">
          <h3 className="text-lg font-medium">
            <span className="text-black transition-colors">{title}</span>{' '}
          </h3>
          {description && (
            <p className="mt-1 text-sm text-gray-600 group-hover:text-gray-600 transition-colors">
              {description}
            </p>
          )}
        </div>

        {/* Wide Banner Image - Positioned prominently */}
        {wide && wide.length > 0 && (
          <div className="w-full relative h-40 overflow-hidden rounded-md mb-5">
            <Image
              fill
              src={wide}
              alt={title}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        {/* Product Grid - 2x2 layout */}
        {products && products.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mt-auto" onClick={(e) => e.stopPropagation()}>
            {products.slice(0, 4).map((product, index) => (
              <Link href={product.url} key={index} className="block">
                <div className="relative w-full aspect-square group overflow-hidden rounded-md bg-white/50">
                  <Image
                    fill
                    src={product.image || '/images/placeholder.png'}
                    alt={product.alt}
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {product.discount && (
                    <div className="absolute bottom-2 left-2 bg-pink-200 text-pink-700 text-xs px-2 py-1 rounded-md font-medium">
                      {product.discount}%
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </Card>
    </Link>
  );
};

export default ProdwideVariant;
