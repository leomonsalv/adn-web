import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from '@/components/ui/carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';

interface GenericCarouselProps {
  children: React.ReactNode;
  hasBackground?: boolean;
  autoplay?: boolean;
}

const GenericCarousel = ({ children, hasBackground, autoplay = true }: GenericCarouselProps) => {
  const [api, setApi] = React.useState<CarouselApi>();

  const plugin = React.useRef(
    Autoplay({
      delay: 6000,
    }),
  );

  // GO LEFT DISABLED DUE TO DESIGN
  // const scrollPrev = () => {
  //   api?.scrollPrev();
  // };

  const scrollNext = () => {
    api?.scrollNext();
  };

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
        plugins={autoplay ? [plugin.current] : []}
        className="relative w-full"
        setApi={setApi}
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

        {/* Navigation Buttons */}
        {/* <button
          onClick={scrollPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-md hover:bg-white transition-colors z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button> */}
        <button
          onClick={scrollNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-md hover:bg-white transition-colors z-10"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </Carousel>
    </div>
  );
};

export default GenericCarousel;
