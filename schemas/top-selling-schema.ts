import * as z from 'zod';

export const NameSchema = z.enum(['Exento (ventas)', 'IVA (16%) ventas']);

export const TypeSchema = z.enum(['libre']);

export const CategorySchema = z.object({
  editable: z.union([z.null(), z.string()]),
  full_name: z.string(),
  id: z.number(),
  name: z.string(),
});

export const TaxSchema = z.object({
  amount: z.number(),
  id: z.number(),
  name: NameSchema,
});

export const BienestarSchema = z.object({
  _id: z.string(),
  active: z.boolean(),
  activeIngredients: z.union([z.null(), z.string()]),
  attack: z.union([z.null(), z.string()]),
  barcode: z.string(),
  bsPrice: z.number(),
  category: CategorySchema,
  description: z.string(),
  images: z.array(z.string()),
  inventary: z.record(z.string(), z.number()),
  laboratory: z.null(),
  name: z.string(),
  productId: z.number(),
  refPrice: z.number(),
  synons: z.union([z.null(), z.string()]),
  taxes: z.array(TaxSchema),
  templateId: z.number(),
  type: TypeSchema,
  updatedAt: z.coerce.date(),
  visible: z.boolean(),
});

export const BotiquinSchema = z.object({
  _id: z.string(),
  active: z.boolean(),
  activeIngredients: z.union([z.null(), z.string()]),
  attack: z.string(),
  barcode: z.string(),
  bsPrice: z.number(),
  category: CategorySchema,
  description: z.string(),
  images: z.array(z.string()),
  inventary: z.record(z.string(), z.number()),
  laboratory: z.null(),
  name: z.string(),
  productId: z.number(),
  refPrice: z.number(),
  synons: z.string(),
  taxes: z.array(TaxSchema),
  templateId: z.number(),
  type: TypeSchema,
  updatedAt: z.coerce.date(),
  visible: z.boolean(),
});

export const ComestibleSchema = z.object({
  _id: z.string(),
  active: z.boolean(),
  activeIngredients: z.null(),
  attack: z.null(),
  barcode: z.string(),
  bsPrice: z.number(),
  category: CategorySchema,
  description: z.string(),
  images: z.array(z.string()),
  inventary: z.record(z.string(), z.number()),
  laboratory: z.null(),
  name: z.string(),
  productId: z.number(),
  refPrice: z.number(),
  synons: z.string(),
  taxes: z.array(TaxSchema),
  templateId: z.number(),
  type: TypeSchema,
  updatedAt: z.coerce.date(),
  visible: z.boolean(),
});

export const MedicamentoSchema = z.object({
  _id: z.string(),
  active: z.boolean(),
  activeIngredients: z.union([z.null(), z.string()]),
  attack: z.union([z.null(), z.string()]),
  barcode: z.string(),
  bsPrice: z.number(),
  category: CategorySchema,
  description: z.string(),
  images: z.array(z.string()),
  inventary: z.record(z.string(), z.number()),
  laboratory: z.null(),
  name: z.string(),
  productId: z.number(),
  refPrice: z.number(),
  synons: z.string(),
  taxes: z.array(TaxSchema),
  templateId: z.number(),
  type: TypeSchema,
  updatedAt: z.coerce.date(),
  visible: z.boolean(),
});

export const InventarySchema = z.object({
  total: z.number(),
});

export const BellezaSchema = z.object({
  _id: z.string(),
  active: z.boolean(),
  activeIngredients: z.null(),
  attack: z.null(),
  barcode: z.string(),
  bsPrice: z.number(),
  category: CategorySchema,
  description: z.string(),
  images: z.array(z.string()),
  inventary: z.record(z.string(), z.number()),
  laboratory: z.null(),
  name: z.string(),
  productId: z.number(),
  refPrice: z.number(),
  synons: z.union([z.null(), z.string()]),
  taxes: z.array(TaxSchema),
  templateId: z.number(),
  type: TypeSchema,
  updatedAt: z.coerce.date(),
  visible: z.boolean(),
});

export const RepuestoSchema = z.object({
  _id: z.string(),
  active: z.boolean(),
  activeIngredients: z.null(),
  attack: z.null(),
  barcode: z.string(),
  bsPrice: z.number(),
  category: CategorySchema,
  description: z.string(),
  images: z.array(z.string()),
  inventary: InventarySchema,
  laboratory: z.null(),
  name: z.string(),
  productId: z.number(),
  refPrice: z.number(),
  synons: z.null(),
  taxes: z.array(TaxSchema),
  templateId: z.number(),
  type: TypeSchema,
  updatedAt: z.coerce.date(),
  visible: z.boolean(),
});

export const GetTopSellingProductsResponseSchema = z.object({
  BELLEZA: z.array(BellezaSchema),
  BIENESTAR: z.array(BienestarSchema),
  BOTIQUIN: z.array(BotiquinSchema),
  COMESTIBLES: z.array(ComestibleSchema),
  'CUIDADO PERSONAL': z.array(ComestibleSchema),
  HIJOS: z.array(ComestibleSchema),
  HOGAR: z.array(ComestibleSchema),
  MEDICAMENTOS: z.array(MedicamentoSchema),
  Repuestos: z.array(RepuestoSchema),
});

// Hero Type Enum
export const HeroTypeEnum = z.enum([
  'mosaic',
  'full-cover',
  'product-grid',
  'full-cover-with-product-grid',
  'single-product',
]);

export type HeroType = z.infer<typeof HeroTypeEnum>;

// Hero Product Item Schema
export const HeroProductItemSchema = z.object({
  id: z.string(),
  img: z.string(),
  name: z.string(),
  price: z.number(),
  discount: z.number(),
  slug: z.string(),
});

// Hero Footer Schema
export const HeroFooterSchema = z.object({
  description: z.string(),
  link: z.string(),
});

// Base schema for all hero types
const HeroBaseSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  backgroundColor: z.string(),
  type: HeroTypeEnum,
  footer: HeroFooterSchema.optional(),
  products: z.array(HeroProductItemSchema).optional(),
});

// Define specific hero schemas based on type
export const MosaicHeroSchema = HeroBaseSchema.extend({
  type: z.literal('mosaic'),
});

export const FullCoverHeroSchema = HeroBaseSchema.extend({
  type: z.literal('full-cover'),
});

export const ProductGridHeroSchema = HeroBaseSchema.extend({
  type: z.literal('product-grid'),
});

export const FullCoverWithProductGridHeroSchema = HeroBaseSchema.extend({
  type: z.literal('full-cover-with-product-grid'),
});

export const SingleProductHeroSchema = HeroBaseSchema.extend({
  type: z.literal('single-product'),
});

// Union of all hero types using discriminated union
export const HeroSchema = z.discriminatedUnion('type', [
  MosaicHeroSchema,
  FullCoverHeroSchema,
  ProductGridHeroSchema,
  FullCoverWithProductGridHeroSchema,
  SingleProductHeroSchema,
]);

// Response schema for getHero API
export const GetHeroResponseSchema = z.array(HeroSchema);
