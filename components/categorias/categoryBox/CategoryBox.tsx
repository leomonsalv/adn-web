import React from 'react';
import { categoriesBox } from '@/lib/dummyData';
import { GetHeroResponse, Hero, HeroMosaicItem, HeroProductItem } from '@/types/home';
import {
  SingleVariant,
  MosaicVariant,
  FullcoverVariant,
  ProductVariant,
  ProdwideVariant,
} from './variants';

type Props = {
  heroData?: Hero[];
};

function CategoryBox({ heroData }: Props) {
  if (!heroData || heroData.length === 0) {
    // Fallback to dummy data if no hero data is available
    return (
      <div className="w-full h-full bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-xl font-bold mb-4">Categorías populares</h2>
        <div className="grid grid-cols-2 gap-4">
          {categoriesBox.map((category, index) => (
            <SingleVariant
              key={index}
              title={category.title}
              description=""
              image={category.image}
              background="#EBF3ED"
              link={`/${category.title.toLowerCase().replace(/\s+/g, '-')}`}
            />
          ))}
        </div>
      </div>
    );
  }

  // Render all hero items in a grid
  return (
    <div className="w-full h-full bg-white rounded-lg shadow-sm p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {heroData.map((heroItem, index) => {
          // Generate link from title
          const link = `/${heroItem.title.toLowerCase().replace(/\s+/g, '-')}`;

          // Render the appropriate variant based on the type
          return (
            <div key={index} className="w-full h-full">
              {heroItem.type === 'single' && (
                <SingleVariant
                  title={heroItem.title}
                  description={heroItem.description}
                  image={heroItem.image || ''}
                  background={heroItem.background}
                  link={link}
                />
              )}

              {heroItem.type === 'mosaic' && (
                <MosaicVariant
                  title={heroItem.title}
                  description={heroItem.description}
                  mosaic={heroItem.mosaic || []}
                  background={heroItem.background}
                  link={link}
                />
              )}

              {heroItem.type === 'fullcover' && (
                <FullcoverVariant
                  title={heroItem.title}
                  description={heroItem.description}
                  fullimage={heroItem.fullimage || ''}
                  background={heroItem.background}
                  link={link}
                />
              )}

              {heroItem.type === 'product' && (
                <ProductVariant
                  title={heroItem.title}
                  description={heroItem.description}
                  products={heroItem.products || []}
                  background={heroItem.background}
                  link={link}
                />
              )}

              {heroItem.type === 'prodwide' && (
                <ProdwideVariant
                  title={heroItem.title}
                  description={heroItem.description}
                  products={heroItem.products || []}
                  background={heroItem.background}
                  wide={heroItem.wide || ''}
                  link={link}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryBox;
