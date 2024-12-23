// types/product.ts

import {
  ProductSchema,
  RecommendedProductsPayloadSchema,
  RecommendedProductsResponseElementSchema,
} from '@/schemas/product-schema';
import { z } from 'zod';

export type Product = z.infer<typeof ProductSchema>;
export type RecommendedProductsPayload = z.infer<typeof RecommendedProductsPayloadSchema>;
export type RecommendedProductsResponseElement = z.infer<
  typeof RecommendedProductsResponseElementSchema
>;
