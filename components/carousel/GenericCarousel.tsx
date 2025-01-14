import React from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

interface GenericCarouselProps {
  children: React.ReactNode; // Cualquier contenido que quieras pasar al carrusel
  hasBackground?: boolean;
}

const GenericCarousel = ({ children, hasBackground }: GenericCarouselProps) => {
  return (
    <div
      className={`relative w-full overflow-hidden ${
        hasBackground ? 'bg-gradient-to-r from-pink-100 via-pink-50 to-white py-6' : 'py-4'
      }`}
    >
      <Carousel
        opts={{
          align: 'start',
          loop: true,
          dragFree: true,
          duration: 25,
        }}
        className="relative w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4 flex">
          {React.Children.map(children, (child, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 md:pl-4"
            >
              {child}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default GenericCarousel;
