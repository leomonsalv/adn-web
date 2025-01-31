'use client';

import { useState } from 'react';
import MainIncentives from '@/components/incentives/MainIncentives';
import CategoryBox from '@/components/categorias/categoryBox/CategoryBox';
import ProductCard from '@/components/products/ProductHome/ProductCard';
import GenericCarousel from '@/components/carousel/GenericCarousel';
import BannerCarousel from '@/components/carousel/BannerCarousel';
import OffersGrid from '@/components/products/ProductHome/OffersGrid';
import { FlameIcon } from 'lucide-react';
import SearchHistorySection from '@/components/carousel/SearchHistoryCarousel';
import { RecentProducts, productPayload } from '@/lib/dummyData';

export default function HomePage() {
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

          <section className="container px-8 pt-24 sm:pt-12 xl:mx-auto xl:max-w-(--breakpoint-2xl) xl:px-8 mb-12 bg-linear-to-b from-[#FFDAD9] via-[#FFDAD980] to-[#FFDAD900] rounded-lg">
            <h2 className="text-3xl font-bold text-[#A4003B] mb-6">
              Lo más vendido en toda la tienda 🔥
            </h2>
            <GenericCarousel autoplay={false}>
              {productPayload.map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  discount={product.discount}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  productUrl={product.productUrl}
                  title={product.title}
                />
              ))}
            </GenericCarousel>
          </section>

          <section className="container px-8 pt-24 sm:pt-12 xl:mx-auto xl:max-w-(--breakpoint-2xl) xl:px-8 mb-12 bg-white rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Lo más vendido en hogar</h2>
            <GenericCarousel autoplay={false}>
              {productPayload.map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  discount={product.discount}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  productUrl={product.productUrl}
                  title={product.title}
                />
              ))}
            </GenericCarousel>
          </section>

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

          <section className="container px-8 pt-24 sm:pt-12 xl:mx-auto xl:max-w-(--breakpoint-2xl) xl:px-8 mb-12 bg-white rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Lo más vendido en belleza</h2>
            <GenericCarousel autoplay={false}>
              {productPayload.map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  discount={product.discount}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  productUrl={product.productUrl}
                  title={product.title}
                />
              ))}
            </GenericCarousel>
          </section>

          <section className="container px-8 pt-24 sm:pt-12 xl:mx-auto xl:max-w-(--breakpoint-2xl) xl:px-8 mb-12 bg-white rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Lo más vendido en alimentos</h2>
            <GenericCarousel autoplay={false}>
              {productPayload.map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  discount={product.discount}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  productUrl={product.productUrl}
                  title={product.title}
                />
              ))}
            </GenericCarousel>
          </section>

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

          <section className="container px-8 pt-24 sm:pt-12 xl:mx-auto xl:max-w-(--breakpoint-2xl) xl:px-8 mb-12 bg-white rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Lo más vendido en farmacia</h2>
            <GenericCarousel autoplay={false}>
              {productPayload.map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  discount={product.discount}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  title={product.title}
                  productUrl={product.productUrl}
                />
              ))}
            </GenericCarousel>
          </section>

          <section className="container px-8 pt-24 sm:pt-12 xl:mx-auto xl:max-w-(--breakpoint-2xl) xl:px-8 mb-12 bg-white rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Lo más vendido en tecnología</h2>
            <GenericCarousel autoplay={false}>
              {productPayload.map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  discount={product.discount}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  productUrl={product.productUrl}
                  title={product.title}
                />
              ))}
            </GenericCarousel>
          </section>

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

          <section className="container px-8 pt-24 sm:pt-12 xl:mx-auto xl:max-w-(--breakpoint-2xl) xl:px-8 mb-12 bg-white rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Lo más vendido en librería</h2>
            <GenericCarousel autoplay={false}>
              {productPayload.map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  discount={product.discount}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  productUrl={product.productUrl}
                  title={product.title}
                />
              ))}
            </GenericCarousel>
          </section>
        </main>
      </div>
      <SearchHistorySection />
      <MainIncentives />
    </div>
  );
}
