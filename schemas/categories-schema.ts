import * as z from 'zod';

export const GetCategoriesResponseSchema = z.object({
  data: z.record(z.string(), z.string()),
});

export const CurrencySchema = z.enum(['VEF', 'USD']);

export const AmountTypeSchema = z.enum(['percent']);

export const NameSchema = z.enum(['Farmacia Adan de Venezuela, C.A.']);

export const DescriptionSchema = z.enum(['IVA (16%) ventas']);

export const TypeSchema = z.enum(['sale']);

export const CompanySchema = z.object({
  name: NameSchema,
  id: z.number(),
});

export const XStudioFechaDeVencimientoSchema = z.object({});

export const CategIdDatumSchema = z.object({
  value: z.string(),
  count: z.number(),
});

export const PaginationSchema = z.object({
  current: z.number(),
  total_pages: z.number(),
  total_results: z.number(),
  size: z.number(),
});

export const TaxSchema = z.object({
  amount: z.number(),
  price_include: z.boolean(),
  description: DescriptionSchema,
  type: TypeSchema,
  amount_type: AmountTypeSchema,
  name: DescriptionSchema,
  company: CompanySchema,
  id: z.number(),
});

export const CategIdSchema = z.object({
  type: z.string(),
  data: z.array(CategIdDatumSchema),
});

export const GetSearchCateroriesResponseDatumSchema = z.object({
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
  currency: CurrencySchema,
  taxes_ids: z.array(z.string()),
  required_recipe: z.boolean(),
  laboratory: z.string(),
  product_type: z.null(),
  recommended: z.boolean(),
  offers: z.null(),
  x_studio_previous_price: z.number(),
  price_ref: z.number(),
  categ_route: z.string(),
  saleslast7days: z.number(),
  discount_rate: z.number(),
  move_location_id: z.null(),
  moves_location_id: z.null(),
  x_studio_libre_de_gluten: z.string(),
  x_studio_2x1: z.string(),
  x_studio_fecha_de_vencimiento: XStudioFechaDeVencimientoSchema,
  taxes: z.array(TaxSchema),
});

export const FacetsSchema = z.object({
  x_studio_laboratory: z.array(CategIdSchema),
  categ_id: z.array(CategIdSchema),
  x_studio_active_ingredient: z.array(CategIdSchema),
});

export const GetSearchCateroriesResponseSchema = z.object({
  pagination: PaginationSchema,
  data: z.array(GetSearchCateroriesResponseDatumSchema),
  facets: FacetsSchema,
});
