// types/product.ts

import {
  CompanySchema,
  DataDatumSchema,
  DataSchema,
  PageSizeSchema,
  ProductSchema,
  RecommendedProductsPayloadSchema,
  RecommendedProductsResponseElementSchema,
  TaxSchema,
  TopSellingProductsPayloadSchema,
  TopSellingProductsResponseSchema,
  XStudioFechaDeVencimientoSchema,
} from '@/schemas/product-schema';
import { z } from 'zod';

export type Product = z.infer<typeof ProductSchema>;
export type RecommendedProductsPayload = z.infer<typeof RecommendedProductsPayloadSchema>;
export type RecommendedProductsResponseElement = z.infer<
  typeof RecommendedProductsResponseElementSchema
>;
export type DataDatum = z.infer<typeof DataDatumSchema>;
export type Data = z.infer<typeof DataSchema>;
export type TopSellingProductsResponse = z.infer<typeof TopSellingProductsResponseSchema>;
export type Company = z.infer<typeof CompanySchema>;
export type XStudioFechaDeVencimiento = z.infer<typeof XStudioFechaDeVencimientoSchema>;
export type Tax = z.infer<typeof TaxSchema>;
export type PageSize = z.infer<typeof PageSizeSchema>;
export type TopSellingProductsPayload = z.infer<typeof TopSellingProductsPayloadSchema>;
