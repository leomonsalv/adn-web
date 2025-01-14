'use client';

import { useState } from 'react';
import MainIncentives from '@/components/incentives/MainIncentives';
import CategoryBox from '@/components/categorias/categoryBox/CategoryBox';
import ProductCard from '@/components/products/ProductHome/ProductCard';
import GenericCarousel from '@/components/carousel/GenericCarousel';
import BannerCarousel from '@/components/carousel/BannerCarousel';

const favorites = [
  {
    id: 1,
    name: 'Black Basic Tee',
    price: '$32',
    href: '#',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/home-page-03-favorite-01.jpg',
    imageAlt: "Model wearing women's black cotton crewneck tee.",
  },
  {
    id: 2,
    name: 'Off-White Basic Tee',
    price: '$32',
    href: '#',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/home-page-03-favorite-02.jpg',
    imageAlt: "Model wearing women's off-white cotton crewneck tee.",
  },
  {
    id: 3,
    name: 'Mountains Artwork Tee',
    price: '$36',
    href: '#',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/home-page-03-favorite-03.jpg',
    imageAlt:
      "Model wearing women's burgundy red crewneck artwork tee with small white triangle overlapping larger black triangle.",
  },
];
const categories = [
  {
    name: 'New Arrivals',
    href: '/categoria',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/home-page-01-category-01.jpg',
  },
  {
    name: 'Productivity',
    href: '/categoria',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/home-page-01-category-02.jpg',
  },
  {
    name: 'Workspace',
    href: '/categoria',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/home-page-01-category-04.jpg',
  },
  {
    name: 'Accessories',
    href: '/categoria',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/home-page-01-category-05.jpg',
  },
  {
    name: 'Sale',
    href: '/categoria',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/home-page-01-category-03.jpg',
  },
];

const collections = [
  {
    name: 'Desk and Office',
    description: 'Work from home accessories',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/home-page-02-edition-01.jpg',
    imageAlt:
      'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
    href: '#',
  },
  {
    name: 'Self-Improvement',
    description: 'Journals and note-taking',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/home-page-02-edition-02.jpg',
    imageAlt:
      'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
    href: '#',
  },
  {
    name: 'Travel',
    description: 'Daily commute essentials',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/home-page-02-edition-03.jpg',
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '#',
  },
];

const productPayload = [
  {
    id: 1,
    image: 'https://picsum.photos/0/100', // URL de la imagen del producto
    discount: 40, // Descuento en porcentaje
    price: 18.9, // Precio actual del producto
    originalPrice: 31.5, // Precio original antes del descuento
    title: 'Earthen Bottle', // Nombre del producto
  },
  {
    id: 2,
    image: 'https://picsum.photos/0/100',
    discount: 20,
    price: 24.0,
    originalPrice: 30.0,
    title: 'Ceramic Mug',
  },
  {
    id: 3,
    image: 'https://picsum.photos/0/100',
    discount: 50,
    price: 15.0,
    originalPrice: 30.0,
    title: 'Modern Vase',
  },
  {
    id: 4,
    image: 'https://picsum.photos/0/100',
    discount: 0, // Sin descuento
    price: 12.99,
    originalPrice: 12.99,
    title: 'Wooden Spoon',
  },
  {
    id: 5,
    image: 'https://picsum.photos/0/100',
    discount: 25,
    price: 45.0,
    originalPrice: 60.0,
    title: 'Classic Clock',
  },
];

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-[#F0F2F5]">
      <main>
        {/* Hero */}
        {/* <div className="flex flex-col border-b border-gray-200 lg:border-0">
          <div className="relative">
            <div aria-hidden="true" className="absolute hidden h-full w-1/2 bg-gray-100 lg:block" />
            <div className="relative bg-gray-100 lg:bg-transparent">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:grid lg:grid-cols-2 lg:px-8">
                <div className="mx-auto max-w-2xl py-24 lg:max-w-none lg:py-64">
                  <div className="lg:pr-16">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl">
                      Focus on what matters
                    </h1>
                    <p className="mt-4 text-xl text-gray-600">
                      All the charts, datepickers, and notifications in the world can't beat
                      checking off some items on a paper card.
                    </p>
                    <div className="mt-6">
                      <Link
                        href={CARRITO}
                        className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 font-medium text-white hover:bg-indigo-700"
                      >
                        Go to Cart
                      </Link>
                    </div>
                    <Link
                      href={HISTORIAL}
                      className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 font-medium text-white hover:bg-indigo-700"
                    >
                      Go to historial
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-48 w-full sm:h-64 lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-1/2">
              <img
                alt=""
                src="https://tailwindui.com/plus/img/ecommerce-images/home-page-02-hero-half-width.jpg"
                className="size-full object-cover"
              />
            </div>
          </div>
        </div> */}
        {/* Category */}

        <BannerCarousel />

        <section
          aria-labelledby="category-heading"
          className="pt-24 sm:pt-12 xl:mx-auto xl:px-8 mb-12 flex flex-row gap-4 justify-center"
        >
          <CategoryBox />
          <CategoryBox />
          <CategoryBox />
          <CategoryBox />
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

      <MainIncentives />
    </div>
  );
}
