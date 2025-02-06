import {
  AmountTypeSchema,
  CategIdDatumSchema,
  CategIdSchema,
  CompanySchema,
  CurrencySchema,
  DescriptionSchema,
  FacetsSchema,
  GetCategoriesResponseSchema,
  GetSearchCateroriesResponseDatumSchema,
  GetSearchCateroriesResponseSchema,
  NameSchema,
  PaginationSchema,
  TaxSchema,
  TypeSchema,
  XStudioFechaDeVencimientoSchema,
} from '@/schemas/categories-schema';
import { z } from 'zod';

export interface SEO {
  title: string;
  description: string;
}

export interface Niche {
  name: string;
  slug: string;
  _id: string;
  niches?: Niche[];
}

export interface Subcategory {
  name: string;
  _id: string;
  slug: string;
  niches?: Niche[];
}

export interface Category {
  name: string;
  _id: string;
  slug: string;
  subcategories?: Subcategory[];
}

export interface CategoriesNavigationProps extends Array<Category> {}

export type GetCategoriesResponse = z.infer<typeof GetCategoriesResponseSchema>;
export type Currency = z.infer<typeof CurrencySchema>;
export type AmountType = z.infer<typeof AmountTypeSchema>;
export type Name = z.infer<typeof NameSchema>;
export type Description = z.infer<typeof DescriptionSchema>;
export type Type = z.infer<typeof TypeSchema>;
export type Company = z.infer<typeof CompanySchema>;
export type XStudioFechaDeVencimiento = z.infer<typeof XStudioFechaDeVencimientoSchema>;
export type CategIdDatum = z.infer<typeof CategIdDatumSchema>;
export type Pagination = z.infer<typeof PaginationSchema>;
export type Tax = z.infer<typeof TaxSchema>;
export type CategId = z.infer<typeof CategIdSchema>;
export type Facets = z.infer<typeof FacetsSchema>;
export type GetSearchCateroriesResponse = z.infer<typeof GetSearchCateroriesResponseSchema>;
export type GetSearchCateroriesResponseDatum = z.infer<
  typeof GetSearchCateroriesResponseDatumSchema
>;
