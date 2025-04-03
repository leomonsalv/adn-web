'use client';

import MainIncentives from '@/components/incentives/MainIncentives';
import BannerCarousel from '@/components/carousel/BannerCarousel';
import OffersGrid from '@/components/products/ProductHome/OffersGrid';
import { FlameIcon } from 'lucide-react';
import SearchHistorySection from '@/components/carousel/SearchHistoryCarousel';
import { RecentProducts, Trending } from '@/lib/dummyData';
import useTopSelling from '@/hooks/use-top-selling';
import TopSellingSection from '@/components/products/ProductHome/TopSellingSection';
import type { Product } from '@/types/product';
import HeroVariant from '@/components/categorias/HeroVariant';

export default function HomePage() {
  const { topProducts, heroData, isLoading, error } = useTopSelling();
  return (
    <div className="min-h-screen bg-[#F0F2F5]">
      <div className="relative">
        <div className="h-[300px] relative">
          <BannerCarousel />
        </div>
        <main className="relative flex flex-col items-center">
          <section
            aria-labelledby="category-heading"
            className="relative rounded-t-[32px] container"
          >
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-4 mb-12">
              <OffersGrid
                title="Continúa donde quedaste"
                products={RecentProducts}
                viewAllLink="/ofertas"
              />
              {heroData && heroData.length > 0 && <HeroVariant heroItem={heroData[0]} />}
              {heroData && heroData.length > 1 && <HeroVariant heroItem={heroData[1]} />}
              <OffersGrid
                title="Sigue comprando ofertas"
                products={Trending}
                viewAllLink="/ofertas"
                variant="pink"
                icon={<FlameIcon className="w-5 h-5 text-[#A4003B]" />}
              />
            </section>

            <section
              aria-labelledby="category-heading"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-4 mb-12"
            >
              {heroData && heroData.length > 2 && <HeroVariant heroItem={heroData[2]} />}
              {heroData && heroData.length > 3 && <HeroVariant heroItem={heroData[3]} />}
              {heroData && heroData.length > 4 && <HeroVariant heroItem={heroData[4]} />}
              {heroData && heroData.length > 5 && <HeroVariant heroItem={heroData[5]} />}
            </section>
          </section>

          <TopSellingSection
            title="Lo más vendido en toda la tienda 🔥"
            products={topProducts?.BELLEZA as unknown as Product[]}
            isLoading={isLoading}
            variant="gradient"
          />

          <TopSellingSection
            title="Lo más vendido en hogar"
            products={topProducts?.HOGAR as unknown as Product[]}
            isLoading={isLoading}
            variant="default"
          />

          <section
            aria-labelledby="category-heading"
            className="container pt-24 sm:pt-12 xl:mx-auto mb-12 flex flex-row gap-4 justify-center"
          >
            <div
              aria-labelledby="category-heading"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-4 mb-12"
            >
              {heroData && heroData.length > 6 && <HeroVariant heroItem={heroData[6]} />}
              {heroData && heroData.length > 7 && <HeroVariant heroItem={heroData[7]} />}
              {heroData && heroData.length > 8 && <HeroVariant heroItem={heroData[8]} />}
              {heroData && heroData.length > 9 && <HeroVariant heroItem={heroData[9]} />}
            </div>
          </section>

          <TopSellingSection
            title="Lo más vendido en belleza"
            products={topProducts?.BELLEZA as unknown as Product[]}
            isLoading={isLoading}
            variant="default"
          />

          <TopSellingSection
            title="Lo más vendido en alimentos"
            products={topProducts?.COMESTIBLES as unknown as Product[]}
            isLoading={isLoading}
            variant="default"
          />

          <section
            aria-labelledby="category-heading"
            className="container pt-24 sm:pt-12 xl:mx-auto mb-12 flex flex-row gap-4 justify-center"
          >
            <div
              aria-labelledby="category-heading"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-4 mb-12"
            >
              {heroData && heroData.length > 10 && <HeroVariant heroItem={heroData[10]} />}
              {heroData && heroData.length > 11 && <HeroVariant heroItem={heroData[11]} />}
              {heroData && heroData.length > 12 && <HeroVariant heroItem={heroData[12]} />}
              {heroData && heroData.length > 13 && <HeroVariant heroItem={heroData[13]} />}
            </div>
          </section>

          <TopSellingSection
            title="Lo más vendido en farmacia"
            products={topProducts?.MEDICAMENTOS as unknown as Product[]}
            isLoading={isLoading}
            variant="default"
          />

          <TopSellingSection
            title="Lo más vendido en bienestar"
            products={topProducts?.BIENESTAR as unknown as Product[]}
            isLoading={isLoading}
            variant="default"
          />

          <section
            aria-labelledby="category-heading"
            className="container pt-24 sm:pt-12 xl:mx-auto mb-12 flex flex-row gap-4 justify-center"
          >
            <div
              aria-labelledby="category-heading"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-4 mb-12"
            >
              {heroData && heroData.length > 14 && <HeroVariant heroItem={heroData[14]} />}
              {heroData && heroData.length > 15 && <HeroVariant heroItem={heroData[15]} />}
              {heroData && heroData.length > 16 && <HeroVariant heroItem={heroData[16]} />}
              {heroData && heroData.length > 17 && <HeroVariant heroItem={heroData[17]} />}
            </div>
          </section>

          <TopSellingSection
            title="Lo más vendido en HIJOS"
            products={topProducts?.HIJOS as unknown as Product[]}
            isLoading={isLoading}
            variant="default"
          />

          <TopSellingSection
            title="Lo más vendido en BOTIQUIN"
            products={topProducts?.BOTIQUIN as unknown as Product[]}
            isLoading={isLoading}
            variant="default"
          />

          <TopSellingSection
            title="Lo más vendido en CUIDADO PERSONAL"
            products={topProducts?.['CUIDADO PERSONAL'] as unknown as Product[]}
            isLoading={isLoading}
            variant="default"
          />
        </main>
      </div>
      <SearchHistorySection />
      <MainIncentives />
    </div>
  );
}
