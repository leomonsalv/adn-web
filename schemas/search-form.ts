import { z } from 'zod';
import { ProductSchema } from './product-schema';

// Schema para las facetas/agregaciones
export const FacetSchema = z.object({
  key: z.string(),
  doc_count: z.number(),
});

export const PriceRangeSchema = z.object({
  min: z.number().optional(),
  max: z.number().optional(),
});

export const searchFormSchema = z.object({
  attack: z.string().optional(),
  laboratories: z.string().optional(),
  ingredients: z.string().optional(),
  search: z.string().optional(),
  query: z.string().optional(),
  actualPage: z.number().optional(),
  pageSize: z.number().optional(),
  sort: z.string().optional(),
  categoryPath: z.string().optional(),
  facets: z.record(z.string(), z.array(z.string())).optional(),
  priceRange: PriceRangeSchema.optional(),
  suggest: z.boolean().optional(),
});

// Schema para las sugerencias
export const SuggestionSchema = z.object({
  suggestion: z.string(),
});

// Schema para la respuesta de sugerencias
export const SearchSuggestionsResponseSchema = z.object({
  results: z.object({
    documents: z.array(SuggestionSchema),
  }),
});

export const CurrencySchema = z.enum(['VEF', 'USD']);
export type Currency = z.infer<typeof CurrencySchema>;

export const AmountTypeSchema = z.enum(['percent']);
export type AmountType = z.infer<typeof AmountTypeSchema>;

export const NameSchema = z.enum(['Farmacia Adan de Venezuela, C.A.']);
export type Name = z.infer<typeof NameSchema>;

export const DescriptionSchema = z.enum(['IVA (16%) ventas']);
export type Description = z.infer<typeof DescriptionSchema>;

export const TypeSchema = z.enum(['sale']);
export type Type = z.infer<typeof TypeSchema>;

export const CompanySchema = z.object({
  name: NameSchema,
  id: z.number(),
});
export type Company = z.infer<typeof CompanySchema>;

export const XStudioFechaDeVencimientoSchema = z.object({});
export type XStudioFechaDeVencimiento = z.infer<typeof XStudioFechaDeVencimientoSchema>;

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

export const MetadataClassSchema = z.object({
  _id: z.null(),
  attack: z.array(z.string()),
  count: z.number(),
  ingredients: z.array(z.string()),
  laboratories: z.array(z.union([z.null(), z.string()])),
});
export type MetadataClass = z.infer<typeof MetadataClassSchema>;

export const SearchResponseSchema = z.object({
  data: z.array(ProductSchema),
  page: z.number(),
  pageSize: z.number(),
  totalItems: z.number(),
  metadata: MetadataClassSchema,
});
export type SearchResponse = z.infer<typeof SearchResponseSchema>;
