import React from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const BannerCarousel: React.FC = () => {
  const slides = [
    {
      title: 'Cuidados personales por menos de $10',
      subtitle: 'Es tu año para cuidar de ti mismo con nuestros productos.',
      imageUrl: 'https://picsum.photos/200',
    },
    {
      title: 'Cuidados personales por menos de $10',
      subtitle: 'Es tu año para cuidar de ti mismo con nuestros productos.',
      imageUrl: 'https://picsum.photos/300',
    },
    {
      title: 'Cuidados personales por menos de $10',
      subtitle: 'Es tu año para cuidar de ti mismo con nuestros productos.',
      imageUrl: 'https://picsum.photos/400',
    },
  ];

  return (
    <div className="w-full max-w-screen-2xl mx-auto">
      <Carousel
        className="relative w-full"
        opts={{
          align: 'start',
        }}
        plugins={[
          Autoplay({
            delay: 6000,
          }),
        ]}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem
              key={index}
              className="flex flex-col md:flex-row items-center justify-between p-6 bg-blue-50"
            >
              {/* Texto */}
              <div className="text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">{slide.title}</h1>
                <p className="text-lg sm:text-xl text-gray-600 mt-4">{slide.subtitle}</p>
              </div>

              {/* Imagen */}
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="mt-4 md:mt-0 max-w-sm sm:max-w-md rounded-lg shadow-lg"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default BannerCarousel;
