'use client';

import { useState } from 'react';
import MainIncentives from '@/components/incentives/MainIncentives';
import CategoryBox from '@/components/categorias/categoryBox/CategoryBox';
import ProductCard from '@/components/products/ProductHome/ProductCard';
import GenericCarousel from '@/components/carousel/GenericCarousel';
import BannerCarousel from '@/components/carousel/BannerCarousel';
import OffersGrid from '@/components/products/ProductHome/OffersGrid';
import { FlameIcon } from 'lucide-react';

const productPayload = [
  {
    id: 1,
    image: 'https://picsum.photos/0/100', // URL de la imagen del producto
    discount: 40, // Descuento en porcentaje
    price: 18.9, // Precio actual del producto
    originalPrice: 31.5, // Precio original antes del descuento
    title: 'Earthen Bottle', // Nombre del producto
    seeMoreText: 'Ver más', // Texto del botón para ver más productos
  },
  {
    id: 2,
    image: 'https://picsum.photos/0/200',
    discount: 20,
    price: 24.0,
    originalPrice: 30.0,
    title: 'Ceramic Mug',
    seeMoreText: 'Ver más',
  },
  {
    id: 3,
    image: 'https://picsum.photos/0/300',
    discount: 50,
    price: 15.0,
    originalPrice: 30.0,
    title: 'Modern Vase',
    seeMoreText: 'Ver más',
  },
  {
    id: 4,
    image: 'https://picsum.photos/0/400',
    discount: 0, // Sin descuento
    price: 12.99,
    originalPrice: 12.99,
    title: 'Wooden Spoon',
    seeMoreText: 'Ver más',
  },
  {
    id: 5,
    image: 'https://picsum.photos/0/500',
    discount: 25,
    price: 45.0,
    originalPrice: 60.0,
    title: 'Classic Clock',
    seeMoreText: 'Cosas del hogar',
  },
];

const RecentProducts = [
  {
    id: 1,
    name: 'Energyplant 450 mg',
    imageUrl: '/images/potedeproteina.png',
    link: '/producto-detalle/58805',
  },
  {
    id: 2,
    name: 'Energyplant 450 mg',
    imageUrl: '/images/potedeproteina.png',
    link: '/producto-detalle/58805',
  },
  {
    id: 3,
    name: 'Energyplant 450 mg',
    imageUrl: '/images/potedeproteina.png',
    link: '/producto-detalle/58805',
  },
  {
    id: 4,
    name: 'Energyplant 450 mg',
    imageUrl: '/images/potedeproteina.png',
    link: '/producto-detalle/58805',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F0F2F5]">
      <div className="relative">
        <div className="h-[300px] relative">
          <BannerCarousel />
        </div>
        <main className="relative -mt-72">
          <section
            aria-labelledby="category-heading"
            className="relative mt-[300px] pt-12 rounded-t-[32px] shadow-lg"
          >
            <div className="container mx-auto px-4">
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
            </div>
          </section>

          <section className="pt-24 sm:pt-12 xl:mx-auto xl:max-w-screen-2xl xl:px-8 mb-12 bg-gradient-to-b from-[#FFDAD9] via-[#FFDAD980] to-[#FFDAD900] rounded-lg">
            <h2 className="text-3xl font-bold text-[#A4003B] mb-6">
              Lo más vendido en toda la tienda 🔥
            </h2>
            <GenericCarousel>
              {productPayload.map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  discount={product.discount}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  title={product.title}
                />
              ))}
            </GenericCarousel>
          </section>

          <section className="pt-24 sm:pt-12 xl:mx-auto xl:max-w-screen-2xl xl:px-8 mb-12 bg-white rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Lo más vendido en hogar</h2>
            <GenericCarousel>
              {productPayload.map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  discount={product.discount}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  title={product.title}
                />
              ))}
            </GenericCarousel>
          </section>

          <section
            aria-labelledby="category-heading"
            className="pt-24 sm:pt-12 xl:mx-auto xl:px-8 mb-12 flex flex-row gap-4 justify-center"
          >
            <CategoryBox />
            <CategoryBox />
            <CategoryBox />
            <CategoryBox />
          </section>

          <section className="pt-24 sm:pt-12 xl:mx-auto xl:max-w-screen-2xl xl:px-8 mb-12 bg-white rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Lo más vendido en belleza</h2>
            <GenericCarousel>
              {productPayload.map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  discount={product.discount}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  title={product.title}
                />
              ))}
            </GenericCarousel>
          </section>

          <section className="pt-24 sm:pt-12 xl:mx-auto xl:max-w-screen-2xl xl:px-8 mb-12 bg-white rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Lo más vendido en alimentos</h2>
            <GenericCarousel>
              {productPayload.map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  discount={product.discount}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  title={product.title}
                />
              ))}
            </GenericCarousel>
          </section>

          <section
            aria-labelledby="category-heading"
            className="pt-24 sm:pt-12 xl:mx-auto xl:px-8 mb-12 flex flex-row gap-4 justify-center"
          >
            <CategoryBox />
            <CategoryBox />
            <CategoryBox />
            <CategoryBox />
          </section>

          <section className="pt-24 sm:pt-12 xl:mx-auto xl:max-w-screen-2xl xl:px-8 mb-12 bg-white rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Lo más vendido en farmacia</h2>
            <GenericCarousel>
              {productPayload.map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  discount={product.discount}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  title={product.title}
                />
              ))}
            </GenericCarousel>
          </section>

          <section className="pt-24 sm:pt-12 xl:mx-auto xl:max-w-screen-2xl xl:px-8 mb-12 bg-white rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Lo más vendido en tecnología</h2>
            <GenericCarousel>
              {productPayload.map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  discount={product.discount}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  title={product.title}
                />
              ))}
            </GenericCarousel>
          </section>

          <section
            aria-labelledby="category-heading"
            className="pt-24 sm:pt-12 xl:mx-auto xl:px-8 mb-12 flex flex-row gap-4 justify-center"
          >
            <CategoryBox />
            <CategoryBox />
            <CategoryBox />
            <CategoryBox />
          </section>

          <section className="pt-24 sm:pt-12 xl:mx-auto xl:max-w-screen-2xl xl:px-8 mb-12 bg-white rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Lo más vendido en librería</h2>
            <GenericCarousel>
              {productPayload.map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  discount={product.discount}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  title={product.title}
                />
              ))}
            </GenericCarousel>
          </section>
        </main>
      </div>

      <MainIncentives />
    </div>
  );
}
