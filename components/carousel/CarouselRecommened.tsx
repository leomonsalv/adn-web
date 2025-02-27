import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from '@/components/ui/carousel';
import CarouselCard from './CarouselCard';
import { RecommendedProductsResponseElement } from '@/types/product';
import { ChevronRight } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';
import { ReviewsResponse } from '@/types/review';
import useReviews from '@/hooks/use-reviews';

export interface ProductWithRating extends RecommendedProductsResponseElement {
  rating?: number;
  reviewCount?: number;
  offerType?: string;
}

interface CarouselRecommenedProps {
  title: string;
  subtitle: string;
  products: ProductWithRating[];
  autoplay?: boolean;
  reviews?: ReviewsResponse;
}

const CarouselRecommened = ({
  title,
  subtitle,
  products,
  autoplay = true,
}: CarouselRecommenedProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const { useGetProductReviews } = useReviews();

  const productReviews = products.map((product) => {
    const { data: reviewData } = useGetProductReviews({
      productId: product.id.toString(),
      page: 1,
      pageSize: 10,
      sort: 'newest',
    });
    return {
      productId: product.id,
      rating: reviewData?.metadata.averageRating || 0,
      reviewCount: reviewData?.totalItems || 0,
    };
  });

  const plugin = React.useRef(
    Autoplay({
      delay: 6000,
    }),
  );

  const scrollNext = () => {
    api?.scrollNext();
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="text-base font-normal leading-6 capitalize">{subtitle}</p>
      </div>

      <Carousel
        opts={{
          align: 'start',
          loop: true,
          dragFree: true,
          duration: 25,
        }}
        plugins={autoplay ? [plugin.current] : []}
        className="relative w-full"
        setApi={setApi}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {products.map((product) => {
            const productReview = productReviews.find((review) => review.productId === product.id);

            return (
              <CarouselItem
                key={product.id}
                className="pl-2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 md:pl-4"
              >
                <CarouselCard
                  title={product.name}
                  imageUrl={product?.imageLarge || '/delivery.jpeg'}
                  rating={productReview?.rating || 0}
                  reviewCount={productReview?.reviewCount || 0}
                  originalPrice={product.price}
                  discountPercentage={product.discount_rate}
                  currentPrice={product.price}
                  offerType={product?.offerType || ''}
                  id={product.id}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <button
          onClick={scrollNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-md hover:bg-white transition-colors z-10"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </Carousel>
    </div>
  );
};

export default CarouselRecommened;
