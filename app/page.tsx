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

// Mock product data
const mockProducts: Product[] = [
  {
    _id: '1',
    active: true,
    activeIngredients: 'Paracetamol 500mg',
    attack: 'Analgésico y antipirético',
    barcode: '7501234567890',
    betterAttack: ['dolor', 'fiebre'],
    betterIngredients: ['paracetamol'],
    bsPrice: '15.50',
    category: {
      full_name: 'Medicamentos/Analgésicos',
      name: 'Analgésicos',
      slug: 'analgesicos',
      editable: 'true',
      id: 1,
    },
    description: 'Paracetamol 500mg para alivio del dolor y fiebre',
    id: 1,
    images: ['https://picsum.photos/300/300?random=1'],
    inventary: { total: 50, 'FADPV/Stock/E17F4': 50 },
    laboratory: 'Laboratorio ABC',
    quantity: 1,
    name: 'Paracetamol 500mg',
    price: 15.5,
    price_extra: 0,
    productId: 1,
    refPrice: 2.5,
    synons: null,
    taxes: [{ amount: 16, id: 1, name: 'IVA' }],
    slug: 'paracetamol-500mg',
    templateId: 1,
    type: 'libre',
    visible: true,
  },
  {
    _id: '2',
    active: true,
    activeIngredients: 'Ibuprofeno 400mg',
    attack: 'Antiinflamatorio no esteroideo',
    barcode: '7501234567891',
    betterAttack: ['inflamación', 'dolor'],
    betterIngredients: ['ibuprofeno'],
    bsPrice: '22.00',
    category: {
      full_name: 'Medicamentos/Antiinflamatorios',
      name: 'Antiinflamatorios',
      slug: 'antiinflamatorios',
      editable: 'true',
      id: 2,
    },
    description: 'Ibuprofeno 400mg para alivio del dolor e inflamación',
    id: 2,
    images: ['https://picsum.photos/300/300?random=2'],
    inventary: { total: 30, 'FADPV/Stock/E17F4': 30 },
    laboratory: 'Laboratorio XYZ',
    quantity: 1,
    name: 'Ibuprofeno 400mg',
    price: 22.0,
    price_extra: 0,
    productId: 2,
    refPrice: 3.5,
    synons: null,
    taxes: [{ amount: 16, id: 1, name: 'IVA' }],
    slug: 'ibuprofeno-400mg',
    templateId: 2,
    type: 'libre',
    visible: true,
  },
  {
    _id: '3',
    active: true,
    activeIngredients: 'Vitamina C 1000mg',
    attack: 'Suplemento vitamínico',
    barcode: '7501234567892',
    betterAttack: ['inmunidad', 'antioxidante'],
    betterIngredients: ['vitamina c'],
    bsPrice: '35.75',
    category: {
      full_name: 'Bienestar/Vitaminas',
      name: 'Vitaminas',
      slug: 'vitaminas',
      editable: 'true',
      id: 3,
    },
    description: 'Vitamina C 1000mg para fortalecer el sistema inmune',
    id: 3,
    images: ['https://picsum.photos/300/300?random=3'],
    inventary: { total: 75, 'FADPV/Stock/E17F4': 75 },
    laboratory: 'Laboratorio DEF',
    quantity: 1,
    name: 'Vitamina C 1000mg',
    price: 35.75,
    price_extra: 0,
    productId: 3,
    refPrice: 5.8,
    synons: null,
    taxes: [{ amount: 16, id: 1, name: 'IVA' }],
    slug: 'vitamina-c-1000mg',
    templateId: 3,
    type: 'libre',
    visible: true,
  },
  {
    _id: '4',
    active: true,
    activeIngredients: 'Omeprazol 20mg',
    attack: 'Inhibidor de la bomba de protones',
    barcode: '7501234567893',
    betterAttack: ['acidez', 'gastritis'],
    betterIngredients: ['omeprazol'],
    bsPrice: '28.90',
    category: {
      full_name: 'Medicamentos/Gastroenterología',
      name: 'Gastroenterología',
      slug: 'gastroenterologia',
      editable: 'true',
      id: 4,
    },
    description: 'Omeprazol 20mg para tratamiento de acidez y gastritis',
    id: 4,
    images: ['https://picsum.photos/300/300?random=4'],
    inventary: { total: 40, 'FADPV/Stock/E17F4': 40 },
    laboratory: 'Laboratorio GHI',
    quantity: 1,
    name: 'Omeprazol 20mg',
    price: 28.9,
    price_extra: 0,
    productId: 4,
    refPrice: 4.7,
    synons: null,
    taxes: [{ amount: 16, id: 1, name: 'IVA' }],
    slug: 'omeprazol-20mg',
    templateId: 4,
    type: 'prescripcion',
    visible: true,
  },
  {
    _id: '5',
    active: true,
    activeIngredients: 'Loratadina 10mg',
    attack: 'Antihistamínico',
    barcode: '7501234567894',
    betterAttack: ['alergia', 'rinitis'],
    betterIngredients: ['loratadina'],
    bsPrice: '18.25',
    category: {
      full_name: 'Medicamentos/Antialérgicos',
      name: 'Antialérgicos',
      slug: 'antialergicos',
      editable: 'true',
      id: 5,
    },
    description: 'Loratadina 10mg para alivio de síntomas alérgicos',
    id: 5,
    images: ['https://picsum.photos/300/300?random=5'],
    inventary: { total: 60, 'FADPV/Stock/E17F4': 60 },
    laboratory: 'Laboratorio JKL',
    quantity: 1,
    name: 'Loratadina 10mg',
    price: 18.25,
    price_extra: 0,
    productId: 5,
    refPrice: 3.0,
    synons: null,
    taxes: [{ amount: 16, id: 1, name: 'IVA' }],
    slug: 'loratadina-10mg',
    templateId: 5,
    type: 'libre',
    visible: true,
  },
];

// Mock top products by category
const mockTopProducts = {
  BELLEZA: mockProducts.slice(0, 3),
  HOGAR: mockProducts.slice(1, 4),
  COMESTIBLES: mockProducts.slice(2, 5),
  MEDICAMENTOS: mockProducts.slice(0, 4),
  BIENESTAR: mockProducts.slice(1, 5),
  HIJOS: mockProducts.slice(0, 3),
  BOTIQUIN: mockProducts.slice(2, 5),
  'CUIDADO PERSONAL': mockProducts.slice(0, 4),
};

export default function HomePage() {
  const { topProducts, heroData, isLoading, error } = useTopSelling();

  // Use mock data instead of API data
  const finalTopProducts = mockTopProducts;
  const finalIsLoading = false;

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
    {
      title: 'Lo más vendido en toda la tienda 🔥',
      key: 'BELLEZA',
      variant: 'gradientGreen' as const,
    },
    { title: 'Lo más vendido en hogar', key: 'HOGAR', variant: 'default' as const },
    { title: 'Lo más vendido en belleza', key: 'BELLEZA', variant: 'gradientGreen' as const },
    { title: 'Lo más vendido en alimentos', key: 'COMESTIBLES', variant: 'default' as const },
    { title: 'Lo más vendido en farmacia', key: 'MEDICAMENTOS', variant: 'gradientGreen' as const },
    { title: 'Lo más vendido en bienestar', key: 'BIENESTAR', variant: 'default' as const },
    { title: 'Lo más vendido en HIJOS', key: 'HIJOS', variant: 'gradientGreen' as const },
    { title: 'Lo más vendido en BOTIQUIN', key: 'BOTIQUIN', variant: 'default' as const },
    {
      title: 'Lo más vendido en CUIDADO PERSONAL',
      key: 'CUIDADO PERSONAL',
      variant: 'gradientGreen' as const,
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
                products={
                  finalTopProducts[category.key as keyof typeof finalTopProducts] as Product[]
                }
                isLoading={finalIsLoading}
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
