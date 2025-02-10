'use client';

import MainIncentives from '@/components/incentives/MainIncentives';
import CategoryBox from '@/components/categorias/categoryBox/CategoryBox';
import BannerCarousel from '@/components/carousel/BannerCarousel';
import OffersGrid from '@/components/products/ProductHome/OffersGrid';
import { FlameIcon } from 'lucide-react';
import SearchHistorySection from '@/components/carousel/SearchHistoryCarousel';
import { RecentProducts } from '@/lib/dummyData';
import useTopSelling from '@/hooks/use-top-selling';
import TopSellingSection from '@/components/products/ProductHome/TopSellingSection';
import { Product } from '@/types/product';

export default function HomePage() {
  const { data: topProducts, isLoading, error } = useTopSelling();
  return (
    <div className="min-h-screen bg-[#F0F2F5]">
      <div className="relative">
        <div className="h-[300px] relative">
          <BannerCarousel />
        </div>
        <main className="relative -mt-72 flex flex-col items-center">
          <section
            aria-labelledby="category-heading"
            className="relative mt-[300px] pt-12 rounded-t-[32px] container"
          >
            {/* <div className="container mx-auto px-4"> */}
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-4 mb-12">
              <OffersGrid
                title="Continúa donde quedaste"
                products={RecentProducts}
                viewAllLink="/ofertas"
              />
              <CategoryBox />
              <CategoryBox />
              <OffersGrid
                title="Sigue comprando ofertas"
                products={RecentProducts}
                viewAllLink="/ofertas"
                variant="pink"
                icon={<FlameIcon className="w-5 h-5 text-[#A4003B]" />}
              />
            </section>

            <section
              aria-labelledby="category-heading"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-4 mb-12"
            >
              <CategoryBox />
              <CategoryBox />
              <CategoryBox />
              <CategoryBox />
            </section>
            {/* </div> */}
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
              <CategoryBox />
              <CategoryBox />
              <CategoryBox />
              <CategoryBox />
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
              <CategoryBox />
              <CategoryBox />
              <CategoryBox />
              <CategoryBox />
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
              <CategoryBox />
              <CategoryBox />
              <CategoryBox />
              <CategoryBox />
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
