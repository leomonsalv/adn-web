import { z } from "zod";

export const searchFormSchema = z.object({
  query: z.string().optional(),
  facets: z.record(z.array(z.string())).optional(),
  suggest: z.boolean().optional(),
  pageSize: z.number().optional(),
  actualPage: z.number().optional(),
  stock: z.boolean().optional(),
  category: z.string().optional(),
  carousel: z.boolean().optional(),
  priceRange: z
    .object({
      from: z.number(),
      to: z.number(),
    })
    .optional(),
  type: z.enum(["libre", "preescripcion", "tienda"]).optional(),
  sort: z
    .object({
      field: z.enum([
        "price",
        "price_extra",
        "name",
        "qty_available",
        "x_studio_laboratory",
      ]),
      order: z.enum(["asc", "desc"]),
    })
    .optional(),
});

export const CurrencySchema = z.enum(["VEF", "USD"]);
export type Currency = z.infer<typeof CurrencySchema>;

export const AmountTypeSchema = z.enum(["percent"]);
export type AmountType = z.infer<typeof AmountTypeSchema>;

export const NameSchema = z.enum(["Farmacia Adan de Venezuela, C.A."]);
export type Name = z.infer<typeof NameSchema>;

export const DescriptionSchema = z.enum(["IVA (16%) ventas"]);
export type Description = z.infer<typeof DescriptionSchema>;

export const TypeSchema = z.enum(["sale"]);
export type Type = z.infer<typeof TypeSchema>;

export const CompanySchema = z.object({
  name: NameSchema,
  id: z.number(),
});
export type Company = z.infer<typeof CompanySchema>;

export const XStudioFechaDeVencimientoSchema = z.object({});
export type XStudioFechaDeVencimiento = z.infer<
  typeof XStudioFechaDeVencimientoSchema
>;

export const CategIdDatumSchema = z.object({
  value: z.string(),
  count: z.number(),
});
export type CategIdDatum = z.infer<typeof CategIdDatumSchema>;

export const PaginationSchema = z.object({
  current: z.number(),
  total_pages: z.number(),
  total_results: z.number(),
  size: z.number(),
});
export type Pagination = z.infer<typeof PaginationSchema>;

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
export type Tax = z.infer<typeof TaxSchema>;

export const CategIdSchema = z.object({
  type: z.string(),
  data: z.array(CategIdDatumSchema),
});
export type CategId = z.infer<typeof CategIdSchema>;

export const SearchResponseProductSchema = z.object({
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
export type SearchResponseProduct = z.infer<typeof SearchResponseProductSchema>;

export const FacetsSchema = z.object({
  x_studio_laboratory: z.array(CategIdSchema),
  categ_id: z.array(CategIdSchema),
  x_studio_active_ingredient: z.array(CategIdSchema),
});
export type Facets = z.infer<typeof FacetsSchema>;

export const SearchResponseSchema = z.object({
  pagination: PaginationSchema,
  data: z.array(SearchResponseProductSchema),
  facets: FacetsSchema,
});
export type SearchResponse = z.infer<typeof SearchResponseSchema>;
