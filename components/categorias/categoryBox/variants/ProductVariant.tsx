import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { HeroProductItem } from '@/types/home';

interface ProductVariantProps {
  title: string;
  description: string;
  products: HeroProductItem[];
  background: string;
  link: string;
}

const ProductVariant = ({
  title,
  description,
  products,
  background,
  link,
}: ProductVariantProps) => {
  // Split title into first word and rest for styling
  const words = title.split(' ');
  const firstWord = words[0];
  const restWords = words.slice(1).join(' ');

  return (
    <Link href={link} className="block h-full">
      <Card
        className={`overflow-hidden transition-all duration-500 hover:shadow-lg p-6 w-full h-full rounded-md shadow-xs flex flex-col justify-between text-left group relative`}
        style={{ backgroundColor: background || '#EBF3ED' }}
      >
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
        <div className="grid grid-cols-2 gap-2 mt-4">
          {products &&
            products.length > 0 &&
            products.slice(0, 4).map((product, index) => (
              <div key={index} className="relative w-full h-16 group overflow-hidden rounded-md">
                <Image
                  fill
                  src={product.image}
                  alt={product.alt}
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {product.discount && (
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 py-0.5 rounded-bl">
                    {product.discount}%
                  </div>
                )}
              </div>
            ))}
        </div>
      </Card>
    </Link>
  );
};

export default ProductVariant;
