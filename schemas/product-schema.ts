import * as z from 'zod';
import { CurrencySchema, LaboratorySchema, ProductTypeSchema } from './orders';
import { FacetsSchema, PaginationSchema } from './categories-schema';

export const CompanySchema = z.object({
  name: z.string(),
  id: z.number(),
});

export const XStudioFechaDeVencimientoSchema = z.object({});

export const TaxSchema = z.object({
  amount: z.number(),
  price_include: z.boolean(),
  description: z.string(),
  type: z.string(),
  amount_type: z.string(),
  name: z.string(),
  company: CompanySchema,
  id: z.number(),
});

export const ProductSchema = z.object({
  id: z.number(),
  barcode: z.string(),
  name: z.string(),
  price: z.number(),
  price_extra: z.number(),
  description: z.string(),
  imageLarge: z.string(),
  image: z.null(),
  imageSmall: z.string(),
  imageXtraSmall: z.string(),
  imageUltraSmall: z.string(),
  qty_available: z.number(),
  currency: z.string(),
  taxes_ids: z.array(z.string()),
  required_recipe: z.boolean(),
  laboratory: z.string(),
  product_type: z.null(),
  recommended: z.boolean(),
  offers: z.null(),
  x_studio_previous_price: z.string(),
  price_ref: z.string(),
  categ_route: z.string(),
  saleslast7days: z.number(),
  discount_rate: z.string(),
  move_location_id: z.null(),
  moves_location_id: z.null(),
  x_studio_libre_de_gluten: z.string(),
  x_studio_2x1: z.string(),
  x_studio_fecha_de_vencimiento: XStudioFechaDeVencimientoSchema,
  taxes: z.array(TaxSchema),
});

export const RecommendedProductsPayloadSchema = z.object({
  type: z.string(),
  products: z.array(z.union([z.number(), z.string()])).optional(),
  todos: z.boolean().optional(),
  productBased: z.boolean().optional(),
});

export const RecommendedProductsResponseElementSchema = z.object({
  id: z.number(),
  barcode: z.string(),
  name: z.string(),
  price: z.number(),
  price_extra: z.number(),
  description: z.string(),
  imageLarge: z.string(),
  image: z.string(),
  imageSmall: z.string(),
  imageXtraSmall: z.string(),
  imageUltraSmall: z.string(),
  qty_available: z.number(),
  currency: CurrencySchema,
  taxes_ids: z.array(z.string()),
  required_recipe: z.boolean(),
  laboratory: LaboratorySchema,
  product_type: ProductTypeSchema,
  recommended: z.string(),
  offers: z.string(),
  x_studio_previous_price: z.number(),
  price_ref: z.number(),
  categ_route: z.string(),
  saleslast7days: z.number(),
  discount_rate: z.number(),
  move_location_id: z.string(),
  moves_location_id: z.string(),
  x_studio_libre_de_gluten: z.string(),
  x_studio_2x1: z.string(),
  x_studio_fecha_de_vencimiento: z.string(),
  taxes: z.array(TaxSchema),
});

export const DataDatumSchema = z.object({
  id: z.number(),
  barcode: z.string(),
  name: z.string(),
  price: z.number(),
  price_extra: z.number(),
  description: z.string(),
  imageLarge: z.string(),
  image: z.union([z.null(), z.string()]),
  imageSmall: z.string(),
  imageXtraSmall: z.string(),
  imageUltraSmall: z.string(),
  qty_available: z.number(),
  currency: CurrencySchema,
  taxes_ids: z.array(z.string()),
  required_recipe: z.boolean(),
  laboratory: z.string(),
  product_type: ProductTypeSchema,
  recommended: z.boolean(),
  offers: z.string(),
  x_studio_previous_price: z.number(),
  price_ref: z.number(),
  categ_route: z.string(),
  saleslast7days: z.number(),
  discount_rate: z.number(),
  move_location_id: z.string(),
  moves_location_id: z.string(),
  x_studio_libre_de_gluten: z.string(),
  x_studio_2x1: z.string(),
  x_studio_fecha_de_vencimiento: z.string(),
  taxes: z.array(TaxSchema),
  totalSales: z.number(),
});

export const DataSchema = z.object({
  pagination: PaginationSchema,
  data: z.array(DataDatumSchema),
  facets: FacetsSchema,
});

export const TopSellingProductsResponseSchema = z.object({
  data: DataSchema,
});

export const PageSizeSchema = z.object({
  current: z.number(),
  size: z.number(),
});

export const TopSellingProductsPayloadSchema = z.object({
  active: z.boolean(),
  offers: z.boolean().optional(),
  pageSize: PageSizeSchema.optional(),
  actualPage: z.number().optional(),
  priceRange: z.array(z.number()),
  facets: FacetsSchema.optional(),
});
