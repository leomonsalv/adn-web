import React from 'react';
import { Hero } from '@/types/home';
import {
  SingleVariant,
  MosaicVariant,
  FullcoverVariant,
  ProductVariant,
  ProdwideVariant,
} from './categoryBox/variants';

type Props = {
  heroItem: Hero;
};

function HeroVariant({ heroItem }: Props) {
  const link = `/${heroItem.title.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-sm p-4">
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
}

export default HeroVariant;
