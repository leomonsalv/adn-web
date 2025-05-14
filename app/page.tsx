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
    if (!clarityId) {
      console.error('Clarity ID is not defined in the environment variables.');
    } else {
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

  const BannerText = {
    baseText: 'Para sentirte mejor ',
    middleText: 'empieza por ',
    animatedWords: ['comer bien', 'dormir bien', 'ejercitarte', 'tolerar el estrés'],
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5]">
      <div className="relative">
        <div className="h-[300px] relative">
          <AnimatedText
            baseText={BannerText.baseText}
            middleText={BannerText.middleText}
            animatedWords={BannerText.animatedWords}
            interval={2000}
            className="flex flex-col items-center justify-center h-full text-center px-4"
            baseTextClassName="text-4xl md:text-5xl lg:text-6xl font-bold text-[#31354D]"
            middleTextClassName="text-5xl md:text-6xl lg:text-7xl font-bold text-[#31354D]"
            animatedTextClassName="text-6xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent animate"
          />
        </div>

        <main className="relative flex flex-col items-center">
          <section
            aria-labelledby="category-heading"
            className="relative rounded-t-[32px] container max-md:-mt-32"
          >
            {/* PRIMERA LÍNEA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 gap-4 mb-12">
              {/* <OffersGrid
                title="Continúa donde quedaste"
                products={RecentProducts}
                viewAllLink="/ofertas"
              /> */}
              {heroData?.[0] && <HeroVariant heroItem={heroData[0]} />}
              {heroData?.[1] && <HeroVariant heroItem={heroData[1]} />}
              {heroData?.[2] && <HeroVariant heroItem={heroData[2]} />}
              {heroData?.[3] && <HeroVariant heroItem={heroData[3]} />}
              {/* <OffersGrid
                title="Sigue comprando ofertas"
                products={Trending}
                viewAllLink="/ofertas"
                variant="pink"
                icon={<FlameIcon className="w-5 h-5 text-[#A4003B]" />}
              /> */}
            </div>

            {/* SEGUNDA LÍNEA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-4 mb-12">
              {heroData?.[4] && <HeroVariant heroItem={heroData[4]} />}
              {heroData?.[5] && <HeroVariant heroItem={heroData[5]} />}
              {heroData?.[6] && <HeroVariant heroItem={heroData[6]} />}
              {heroData?.[7] && <HeroVariant heroItem={heroData[7]} />}
            </div>
          </section>

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
