import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import type { HeroProductItem } from '@/types/home';

interface FullcoverWithProductGridVariantProps {
  title: string;
  description: string;
  products: HeroProductItem[];
  background: string;
  textColor?: string;
  link: string;
}

const FullcoverWithProductGridVariant = ({
  title,
  description,
  products,
  background,
  textColor = 'text-white',
  link,
}: FullcoverWithProductGridVariantProps) => {
  const router = useRouter();
  const mainImage = products?.[0]?.img || '';

  // Use the first product's slug as the main link, or fallback to the provided link
  const mainLink = products?.[0]?.slug || link || '/';

  return (
    <Link href={mainLink} className="block h-full">
      <Card
        className="overflow-hidden transition-all duration-500 hover:shadow-lg p-6 w-full h-full rounded-md shadow-xs flex flex-col text-left relative"
        style={{ backgroundColor: background || '#EBF3ED' }}
      >
        {/* Title and Description */}
        <div className="p-4 md:p-6 flex flex-col justify-center min-h-[90px] md:min-h-[110px] z-10 relative mb-4">
          {' '}
          <div>
            <h3
              className={`text-xl md:text-2xl lg:text-3xl ${textColor} font-extrabold uppercase tracking-tight mb-1`}
            >
              {title}
            </h3>
            {description && <p className={`text-sm md:text-base ${textColor}`}>{description}</p>}
          </div>
        </div>

        {/* Main Banner Image - Positioned prominently */}
        {mainImage && (
          <div className="w-full relative h-40 overflow-hidden rounded-md mb-5">
            <Image
              fill
              src={mainImage.replace(/\"/g, '')}
              alt={title}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        {/* Product Grid - 2x2 layout */}
        {products && products.length > 1 && (
          <div className="grid grid-cols-2 gap-3 mt-auto">
            {products.slice(1, 5).map((product) => (
              <div
                key={product.id}
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
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
