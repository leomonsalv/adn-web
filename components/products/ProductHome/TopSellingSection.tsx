import GenericCarousel from '@/components/carousel/GenericCarousel';
import ProductCard from '@/components/products/ProductHome/ProductCard';
import { Product } from '@/types/product';

interface TopSellingSectionProps {
  title: string;
  products?: Product[];
  isLoading?: boolean;
  variant?: 'default' | 'gradient';
  className?: string;
}

export default function TopSellingSection({
  title,
  products,
  isLoading,
  variant = 'default',
  className,
}: TopSellingSectionProps) {
  const baseStyles =
    'container px-8 pt-24 pb-8 sm:pt-12 xl:mx-auto xl:max-w-(--breakpoint-2xl) xl:px-8 mb-12 rounded-lg';
  const variantStyles = {
    default: 'bg-white',
    gradient: 'bg-linear-to-b from-[#FFDAD9] via-[#FFDAD980] to-[#FFDAD900]',
  };

  const renderProducts = () => {
    if (!products || products.length === 0) {
      return (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500">No hay productos disponibles</p>
        </div>
      );
    }

    return (
      <GenericCarousel autoplay={false}>
        {products.map((product) => (
          <ProductCard
            key={product._id}
            image={product.images?.[0] || ''}
            price={Number(product.bsPrice) || 0}
            originalPrice={product.refPrice || 0}
            productUrl={`/producto-detalle/${product._id}`}
            title={product.name || product.description || 'Producto sin nombre'}
            discount={
              product.refPrice && product.bsPrice
                ? Math.round(
                    ((product.refPrice - Number(product.bsPrice)) / product.refPrice) * 100,
                  )
                : 0
            }
          />
        ))}
      </GenericCarousel>
    );
  };

  return (
    <section className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      <h2
        className={`text-3xl font-bold mb-6 ${variant === 'gradient' ? 'text-[#A4003B]' : 'text-gray-800'}`}
      >
        {title}
      </h2>
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#A4003B]" />
        </div>
      ) : (
        renderProducts()
      )}
    </section>
  );
}
