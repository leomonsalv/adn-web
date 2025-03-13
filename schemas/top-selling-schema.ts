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

// Hero schemas
export const HeroMosaicItemSchema = z.object({
  image: z.string(),
  alt: z.string(),
});

export const HeroProductItemSchema = z.object({
  image: z.string(),
  url: z.string(),
  alt: z.string(),
  discount: z.number().optional(),
});

// Base schema for all hero types
const HeroBaseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  background: z.string(),
  available: z.boolean(),
});

// Single hero type
export const HeroSingleSchema = HeroBaseSchema.extend({
  type: z.literal('single'),
  image: z.string(),
});

// Mosaic hero type
export const HeroMosaicSchema = HeroBaseSchema.extend({
  type: z.literal('mosaic'),
  mosaic: z.array(HeroMosaicItemSchema),
});

// Fullcover hero type
export const HeroFullcoverSchema = HeroBaseSchema.extend({
  type: z.literal('fullcover'),
  fullimage: z.string(),
});

// Product hero type
export const HeroProductSchema = HeroBaseSchema.extend({
  type: z.literal('product'),
  products: z.array(HeroProductItemSchema),
});

// Prodwide hero type
export const HeroProdwideSchema = HeroBaseSchema.extend({
  type: z.literal('prodwide'),
  products: z.array(HeroProductItemSchema),
  wide: z.string(),
});

// Union of all hero types
export const HeroSchema = z.discriminatedUnion('type', [
  HeroSingleSchema,
  HeroMosaicSchema,
  HeroFullcoverSchema,
  HeroProductSchema,
  HeroProdwideSchema,
]);

// Updated GetHeroResponseSchema to use the union type
export const GetHeroResponseSchema = z.array(HeroSchema);
