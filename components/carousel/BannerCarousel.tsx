import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { CarouselApi } from '@/components/ui/carousel';
import useBanners from '@/hooks/use-banners';
import { Skeleton } from '@/components/ui/skeleton';

const BannerCarousel: React.FC = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const { useGetBanners } = useBanners();
  const { data, isLoading, error } = useGetBanners({ active: true });

  const scrollPrev = () => {
    api?.scrollPrev();
  };

  const scrollNext = () => {
    api?.scrollNext();
  };

  // Handle loading state
  if (isLoading) {
    return (
      <div className="absolute top-0 left-0 w-full">
        <Skeleton className="w-full h-[600px]" />
      </div>
    );
  }

  // Handle error state
  if (error || !data?.banners || data.banners.length === 0) {
    return null;
  }

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
          {data.banners.map((banner, index) => (
            <CarouselItem
              key={banner.id}
              className="relative h-[600px] overflow-hidden bg-gray-100"
            >
              <Link href={banner.target_url} className="block w-full h-full relative">
                <Image
                  src={banner.image_url}
                  alt={banner.alt || banner.title}
                  fill
                  className="object-cover object-top"
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
