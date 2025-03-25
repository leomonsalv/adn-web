import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { HeroProductItem } from '@/types/home';

interface FullcoverWithProductGridVariantProps {
  title: string;
  description: string;
  products: HeroProductItem[];
  background: string;
  link: string;
}

const FullcoverWithProductGridVariant = ({
  title,
  description,
  products,
  background,
  link,
}: FullcoverWithProductGridVariantProps) => {
  const router = useRouter();
  const mainImage = products?.[0]?.img || '';

  // Use the first product's slug as the main link, or fallback to the provided link
  const mainLink = products?.[0]?.slug || link || '/';

  return (
    <Link href={mainLink} className="block h-full">
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

        {/* Main Banner Image - Positioned prominently */}
        {mainImage && (
          <div className="w-full relative h-40 overflow-hidden rounded-md mb-5">
            <Image
              fill
              src={mainImage.replace(/\"/g, '')}
              alt={title}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        {/* Product Grid - 2x2 layout */}
        {products && products.length > 1 && (
          <div className="grid grid-cols-2 gap-3 mt-auto">
            {products.slice(1, 5).map((product, index) => (
              <div
                key={index}
                className="block"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Always prioritize the product's own slug if available
                  if (product.slug) {
                    router.push(product.slug);
                  } else {
                    router.push(mainLink);
                  }
                }}
              >
                <div className="relative w-full aspect-square group overflow-hidden rounded-md bg-white/50 cursor-pointer">
                  <Image
                    fill
                    src={product.img ? product.img.replace(/\"/g, '') : '/delivery.png'}
                    alt={product.name || ''}
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
        )}
      </Card>
    </Link>
  );
};

export default FullcoverWithProductGridVariant;
