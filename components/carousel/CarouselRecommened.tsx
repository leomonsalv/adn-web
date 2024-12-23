import React from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import CarouselCard from './CarouselCard';

import { RecommendedProductsResponseElement } from '@/types/product';

interface ProductWithRating extends RecommendedProductsResponseElement {
  rating?: number;
  reviewCount?: number;
  offerType?: string;
}

interface CarouselRecommenedProps {
  title: string;
  subtitle: string;
  products: ProductWithRating[];
}

const CarouselRecommened = ({ title, subtitle, products }: CarouselRecommenedProps) => {
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
        className="relative w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 md:pl-4"
            >
              <CarouselCard
                title={product.name}
                imageUrl={product?.imageLarge || '/delivery.jpeg'}
                rating={product?.rating || 0}
                reviewCount={product.reviewCount || 0}
                originalPrice={product.price}
                discountPercentage={product.discount_rate}
                currentPrice={product.price}
                offerType={product?.offerType || ''}
                id={product.id}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CarouselRecommened;
