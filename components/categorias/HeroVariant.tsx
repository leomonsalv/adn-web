import React from 'react';
import { type Hero, HeroType } from '@/types/home';
import {
  SingleVariant,
  MosaicVariant,
  FullcoverVariant,
  ProductVariant,
  FullcoverWithProductGridVariant,
} from './categoryBox/variants';

type Props = {
  heroItem: Hero & {
    src?: string;
  };
};

function HeroVariant({ heroItem }: Props) {
  // Determinar el enlace según:
  // 1. Si tiene src, usar src
  // 2. Si tiene slug, usar producto_detalle/{slug}
  // 3. Si no tiene ninguno, no hacer nada (string vacío)
  const productSlug = heroItem.products?.[0]?.slug;
  const src = heroItem.src;

  let link = '';
  if (src) {
    link = src;
  } else if (productSlug) {
    link = `producto_detalle/${productSlug}`;
  }

  return (
    <>
      {/* Mosaic type */}
      {heroItem.type === 'mosaic' && (
        <MosaicVariant
          title={heroItem.title}
          description={heroItem.subtitle}
          mosaic={
            heroItem.products?.map((product) => ({
              id: product.id || '',
              image: product.img,
              alt: product.name,
              slug: product.slug,
            })) || []
          }
          background={heroItem.backgroundColor}
          link={link}
        />
      )}

      {/* Full cover type */}
      {heroItem.type === 'full-cover' && (
        <FullcoverVariant
          title={heroItem.title}
          description={heroItem.subtitle}
          fullimage={heroItem.products?.[0]?.img || ''}
          background={heroItem.backgroundColor}
          link={link}
        />
      )}

      {/* Product grid type */}
      {heroItem.type === 'product-grid' && (
        <ProductVariant
          title={heroItem.title}
          description={heroItem.subtitle}
          products={
            heroItem.products?.map((product) => ({
              id: product.id || '',
              img: product.img,
              name: product.name,
              price: product.price || 0,
              discount: product.discount,
              slug: product.slug,
            })) || []
          }
          background={heroItem.backgroundColor}
          link={link}
        />
      )}

      {/* Full cover with product grid type */}
      {heroItem.type === 'full-cover-with-product-grid' && (
        <FullcoverWithProductGridVariant
          title={heroItem.title}
          description={heroItem.subtitle}
          products={
            heroItem.products?.map((product) => ({
              id: product.id || '',
              img: product.img,
              name: product.name,
              price: product.price || 0,
              discount: product.discount,
              slug: product.slug,
            })) || []
          }
          background={heroItem.backgroundColor}
          link={link}
        />
      )}

      {/* Single product type */}
      {heroItem.type === 'single-product' && (
        <SingleVariant
          title={heroItem.title}
          description={heroItem.subtitle}
          image={heroItem.products?.[0]?.img || ''}
          background={heroItem.backgroundColor}
          link={link}
        />
      )}
    </>
  );
}

export default HeroVariant;
