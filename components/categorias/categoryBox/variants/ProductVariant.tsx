import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import type { HeroProductItem } from '@/types/home';

interface ProductVariantProps {
  title: string;
  description: string;
  products: HeroProductItem[];
  background: string;
  textColor?: string;
  link: string;
}

const ProductVariant = ({
  title,
  description,
  products,
  background,
  textColor = 'text-white',
  link,
}: ProductVariantProps) => {
  const router = useRouter();
  return (
    <Link href={link} className="block h-full">
      <Card
        className="overflow-hidden transition-all duration-500 hover:shadow-lg p-6 w-full h-full rounded-md shadow-xs flex flex-col text-left group relative"
        style={{ backgroundColor: background || '#EBF3ED' }}
      >
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
        <div className="grid grid-cols-2 gap-4 mt-16">
          {products &&
            products.length > 0 &&
            products.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="relative w-full aspect-square group overflow-hidden rounded-md bg-white/50"
              >
                <div
                  className="w-full h-full cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (product.slug) {
                      router.push(product.slug);
                    } else {
                      router.push(link);
                    }
                  }}
                >
                  <Image
                    fill
                    src={product.img}
                    alt={product.name}
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
      </Card>
    </Link>
  );
};

export default ProductVariant;
