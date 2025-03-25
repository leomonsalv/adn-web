import { NameSchema, TypeSchema, TaxSchema } from '@/schemas/categories-schema';
import {
  CategorySchema,
  BienestarSchema,
  BotiquinSchema,
  ComestibleSchema,
  MedicamentoSchema,
  InventarySchema,
  BellezaSchema,
  RepuestoSchema,
  GetTopSellingProductsResponseSchema,
  HeroProductItemSchema,
  HeroSchema,
  GetHeroResponseSchema,
  FullCoverHeroSchema,
  FullCoverWithProductGridHeroSchema,
  HeroFooterSchema,
  HeroTypeEnum,
  MosaicHeroSchema,
  ProductGridHeroSchema,
  SingleProductHeroSchema,
} from '@/schemas/top-selling-schema';
import { z } from 'zod';

export type Name = z.infer<typeof NameSchema>;
export type Type = z.infer<typeof TypeSchema>;
export type Category = z.infer<typeof CategorySchema>;
export type Tax = z.infer<typeof TaxSchema>;
export type Bienestar = z.infer<typeof BienestarSchema>;
export type Botiquin = z.infer<typeof BotiquinSchema>;
export type Comestible = z.infer<typeof ComestibleSchema>;
export type Medicamento = z.infer<typeof MedicamentoSchema>;
export type Inventary = z.infer<typeof InventarySchema>;
export type Belleza = z.infer<typeof BellezaSchema>;
export type Repuesto = z.infer<typeof RepuestoSchema>;
export type GetTopSellingProductsResponse = z.infer<typeof GetTopSellingProductsResponseSchema>;

// Hero types
export type HeroType = z.infer<typeof HeroTypeEnum>;
export type HeroProductItem = z.infer<typeof HeroProductItemSchema>;
export type HeroFooter = z.infer<typeof HeroFooterSchema>;

// Hero specific types
export type MosaicHero = z.infer<typeof MosaicHeroSchema>;
export type FullCoverHero = z.infer<typeof FullCoverHeroSchema>;
export type ProductGridHero = z.infer<typeof ProductGridHeroSchema>;
export type FullCoverWithProductGridHero = z.infer<typeof FullCoverWithProductGridHeroSchema>;
export type SingleProductHero = z.infer<typeof SingleProductHeroSchema>;

// Union type for all hero variants
export type Hero = z.infer<typeof HeroSchema>;

// Response type for getHero API
export type GetHeroResponse = z.infer<typeof GetHeroResponseSchema>;
