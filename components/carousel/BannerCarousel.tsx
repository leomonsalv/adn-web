import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { CarouselApi } from '@/components/ui/carousel';

const BannerCarousel: React.FC = () => {
  const [api, setApi] = React.useState<CarouselApi>();

  const slides = [
    {
      imageUrl: '/images/banner.jpg',
      link: '/producto-detalle/29999',
      name: 'Cuidados personales por menos de $10',
    },
    {
      imageUrl: 'https://picsum.photos/1920/1080',
      link: '/categorias',
      name: 'Grandes descuentos en tecnología',
    },
  ];

  const scrollPrev = () => {
    api?.scrollPrev();
  };

  const scrollNext = () => {
    api?.scrollNext();
  };

  return (
    <div className="absolute top-0 left-0 w-full">
      <Carousel
        className="relative w-full"
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 6000,
          }),
        ]}
        setApi={setApi}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="relative h-[600px] overflow-hidden bg-gray-100">
              <Link href={slide.link} className="block w-full h-full relative">
                <Image
                  src={slide.imageUrl}
                  alt={slide.name}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={index === 0}
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        <button
          onClick={scrollPrev}
          className="absolute left-4 top-1/4 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-md hover:bg-white transition-colors z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-4 top-1/4 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-md hover:bg-white transition-colors z-10"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </Carousel>
    </div>
  );
};

export default BannerCarousel;
