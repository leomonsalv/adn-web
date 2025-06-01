'use client';

import { Fragment, useEffect } from 'react';
import MainIncentives from '@/components/incentives/MainIncentives';
import AnimatedText from '@/components/animated/AnimatedText';
import Clarity from '@microsoft/clarity';
import useTopSelling from '@/hooks/use-top-selling';
import TopSellingSection from '@/components/products/ProductHome/TopSellingSection';
import type { Product } from '@/types/product';
import HeroVariant from '@/components/categorias/HeroVariant';
import { middleware } from '@/middleware';

const metadata = {
  title: 'Adan | Tu vida tu flow',
  description:
    'Descubre lo más vendido en cuidado personal, hogar y bienestar. Productos que mejoran tu día a día.',
  keywords: 'farmacia, bienestar, hogar, salud, vitaminas, productos naturales, cuidado personal',
  openGraph: {
    title: 'Adan | Tu vida tu flow',
    description: 'Productos que mejoran tu día a día. Mira lo más vendido en la tienda.',
    url: 'https://adan.life/',
    siteName: 'Adan',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adan | Tu vida tu flow',
    description: 'Explora productos de salud y bienestar más vendidos',
  },
};

export default function HomePage() {
  const { topProducts, heroData, isLoading, error } = useTopSelling();
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
    if (clarityId) {
      Clarity.init(clarityId);
    }
  }, [Clarity]);
  const renderHeroGroup = (startIndex: number, count: number) => (
    <section
      aria-labelledby="category-heading"
      className="container pt-24 sm:pt-12 xl:mx-auto mb-12 flex flex-row gap-4 justify-center"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-4 mb-12">
        {heroData
          ?.slice(startIndex, startIndex + count)
          .map((heroItem, index) => (
            <HeroVariant key={`${startIndex}+${index}`} heroItem={heroItem} />
          ))}
      </div>
    </section>
  );

  const topSellingCategories = [
    { title: 'Lo más vendido en toda la tienda 🔥', key: 'BELLEZA', variant: 'gradientGreen' },
    { title: 'Lo más vendido en hogar', key: 'HOGAR', variant: 'default' },
    { title: 'Lo más vendido en belleza', key: 'BELLEZA', variant: 'gradientGreen' },
    { title: 'Lo más vendido en alimentos', key: 'COMESTIBLES', variant: 'default' },
    { title: 'Lo más vendido en farmacia', key: 'MEDICAMENTOS', variant: 'gradientGreen' },
    { title: 'Lo más vendido en bienestar', key: 'BIENESTAR', variant: 'default' },
    { title: 'Lo más vendido en HIJOS', key: 'HIJOS', variant: 'gradientGreen' },
    { title: 'Lo más vendido en BOTIQUIN', key: 'BOTIQUIN', variant: 'default' },
    {
      title: 'Lo más vendido en CUIDADO PERSONAL',
      key: 'CUIDADO PERSONAL',
      variant: 'gradientGreen',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F0F2F5]">
      <div className="relative">
        <div className="h-[300px] relative">
          <AnimatedText />
        </div>

        <main className="relative flex flex-col items-center">
          {/* Alternancia normal de productos + hero */}
          {topSellingCategories.map((category, index) => (
            <Fragment key={`category.key-${index}`}>
              <TopSellingSection
                title={category.title}
                products={topProducts?.[category.key] as unknown as Product[]}
                isLoading={isLoading}
                variant={category.variant}
              />
              {/* Cada 2 secciones, metemos un bloque de heroData */}
              {index % 2 === 1 && renderHeroGroup(6 + (index / 2) * 4, 4)}
            </Fragment>
          ))}
        </main>
      </div>

      {/* <SearchHistorySection /> */}
      <MainIncentives />
    </div>
  );
}
