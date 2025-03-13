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
}

const ProdwideVariant = ({
  title,
  description,
  products,
  background,
  link,
}: ProdwideVariantProps) => {
  // Split title into first word and rest for styling
  const words = title.split(' ');
  const firstWord = words[0];
  const restWords = words.slice(1).join(' ');

  // Get the first product for display
  const product = products && products.length > 0 ? products[0] : null;

  return (
    <Link href={link} className="block h-full">
      <Card
        className={`overflow-hidden transition-all duration-500 hover:shadow-lg p-6 w-full h-full rounded-md shadow-xs flex flex-col justify-between text-left group relative`}
        style={{ backgroundColor: background || '#EBF3ED' }}
      >
        <div className="flex flex-col h-full justify-between">
          <div className="z-10">
            <h3 className="text-lg font-medium">
              <span className="text-black group-hover:text-[#7B8967] transition-colors">
                {firstWord}
              </span>{' '}
              <span className="text-[#7B8967] group-hover:text-white transition-colors">
                {restWords}
              </span>
            </h3>
            {description && (
              <p className="mt-1 text-sm text-gray-600 group-hover:text-gray-200 transition-colors">
                {description}
              </p>
            )}
          </div>
          {product && (
            <div className="mt-4 flex w-full">
              <div className="relative w-24 h-24 mr-4">
                <Image
                  fill
                  src={product.image || '/images/placeholder.png'}
                  alt={product.alt}
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium line-clamp-2">{product.alt}</p>
                {product.discount && (
                  <p className="text-sm text-gray-600 mt-1">Descuento: {product.discount}%</p>
                )}
                <div className="mt-2 text-xs inline-block bg-[#7B8967]/10 text-[#7B8967] px-2 py-1 rounded">
                  Ver producto
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default ProdwideVariant;
