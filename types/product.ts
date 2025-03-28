// types/product.ts

import {
  ColorSchema,
  ColorTypeSchema,
  ProductSchema,
  DatumTypeSchema,
  GreenClassSchema,
  GreenOptionsSchema,
  GreenSchema,
  LOptionsSchema,
  MetadataClassSchema,
  MetadataEnumSchema,
  NameSchema,
  ProductResponseSchema,
  RedOptionsSchema,
  RedSchema,
  SkuSchema,
  TaxesSchema,
  VariantMasterOptionSchema,
  VariantOptionsMapLSchema,
  VariantOptionsMapSchema,
  VariantOptionsSchema,
  XlOptionsSchema,
  XlSchema,
  ProductTypeSchema,
  PageSizeSchema,
  RecommendedForUserPayloadSchema,
  SuggestionsProductsPayloadSchema,
  RecommendedProductsResponseElementSchema,
} from '@/schemas/product-schema';
import { z } from 'zod';

export type Name = z.infer<typeof NameSchema>;
export type DatumType = z.infer<typeof DatumTypeSchema>;
export type VariantMasterOption = z.infer<typeof VariantMasterOptionSchema>;
export type ColorType = z.infer<typeof ColorTypeSchema>;
export type Sku = z.infer<typeof SkuSchema>;
export type MetadataEnum = z.infer<typeof MetadataEnumSchema>;
export type Taxes = z.infer<typeof TaxesSchema>;
export type Color = z.infer<typeof ColorSchema>;
export type GreenClass = z.infer<typeof GreenClassSchema>;
export type LOptions = z.infer<typeof LOptionsSchema>;
export type RedOptions = z.infer<typeof RedOptionsSchema>;
export type XlOptions = z.infer<typeof XlOptionsSchema>;
export type MetadataClass = z.infer<typeof MetadataClassSchema>;
export type VariantOptions = z.infer<typeof VariantOptionsSchema>;
export type GreenOptions = z.infer<typeof GreenOptionsSchema>;
export type VariantOptionsMapL = z.infer<typeof VariantOptionsMapLSchema>;
export type Red = z.infer<typeof RedSchema>;
export type Xl = z.infer<typeof XlSchema>;
export type Green = z.infer<typeof GreenSchema>;
export type VariantOptionsMap = z.infer<typeof VariantOptionsMapSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type ProductResponse = z.infer<typeof ProductResponseSchema>;
export type ProductType = z.infer<typeof ProductTypeSchema>;
export type PageSize = z.infer<typeof PageSizeSchema>;
export type RecommendedForUserPayload = z.infer<typeof RecommendedForUserPayloadSchema>;
export type SuggestionsProductsPayload = z.infer<typeof SuggestionsProductsPayloadSchema>;
export type RecommendedProductsResponseElement = z.infer<
  typeof RecommendedProductsResponseElementSchema
>;
