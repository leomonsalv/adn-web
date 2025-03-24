import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
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
  const router = useRouter();
  return (
    <Link href={link} className="block h-full">
      <Card
        className={`overflow-hidden transition-all duration-500 hover:shadow-lg p-6 w-full h-full rounded-md shadow-xs flex flex-col justify-between text-left group relative`}
        style={{ backgroundColor: background || '#EBF3ED' }}
      >
        <div className="z-10">
          <h3 className="text-lg font-medium">
            <span className="text-black transition-colors">{title}</span>{' '}
          </h3>
          {description && (
            <p className="mt-1 text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
              {description}
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          {products &&
            products.length > 0 &&
            products.slice(0, 4).map((product, index) => (
              <div
                key={index}
                className="relative w-full aspect-square group overflow-hidden rounded-md bg-white/50"
              >
                <div
                  className="w-full h-full cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (product.url) {
                      router.push(product.url);
                    }
                  }}
                >
                  <Image
                    fill
                    src={product.image}
                    alt={product.alt}
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {product.discount && (
                    <div className="absolute bottom-2 left-2 bg-pink-200 text-pink-700 text-xs px-2 py-1 rounded-md font-medium">
                      {product.discount}%
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </Card>
    </Link>
  );
};

export default ProductVariant;
