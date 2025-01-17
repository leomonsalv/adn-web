import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from '@/components/ui/carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { searchHistory } from '@/lib/dummyData';

const SearchHistorySection = () => {
  const [api, setApi] = React.useState<CarouselApi>();

  const scrollNext = () => {
    api?.scrollNext();
  };

  return (
    <section className="pt-24 pb-12 sm:pt-12 xl:mx-auto xl:max-w-screen-2xl xl:px-8 mb-12 bg-white rounded-lg">
      <div className="flex items-center justify-start gap-4 mb-6 px-4">
        <h2 className="text-lg font-semibold text-gray-900">Tu historial de búsqueda</h2>
        <Link
          href="/historial"
          className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
        >
          Ver tu historial
        </Link>
      </div>

      <div className="relative px-4">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 6000,
            }),
          ]}
          className="w-full"
          setApi={setApi}
        >
          <CarouselContent>
            {searchHistory.map((item) => (
              <CarouselItem key={item.id} className="pl-4 md:basis-1/4 lg:basis-1/5 basis-1/3 ">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-[#F7F7F7]">
                  <Link href={item.link} className="block p-4">
                    <Image
                      height={160}
                      width={160}
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-40 object-contain mb-2"
                    />
                    <p className="text-sm text-gray-700 truncate">{item.name}</p>
                  </Link>
                </Card>
              </CarouselItem>
            ))}
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
    </section>
  );
};

export default SearchHistorySection;
