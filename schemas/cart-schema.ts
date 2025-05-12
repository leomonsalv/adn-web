import { z } from 'zod';
import { ProductSchema } from './product-schema';

export const CartSchema = z.object({
  id: z.string(),
  products: z
    .object({
      id: z.number(),
      prescriptionImg: z.string().optional(),
      quantity: z.number(),
    })
    .array(),
  userId: z.string(),
  updatedAt: z.date(),
});

export const CartStoreSchema = z.object({
  id: z.string(),
  products: z
    .object({
      ...ProductSchema.shape,
      quantity: z.number(),
    })
    .array(),
  userId: z.string(),
  updatedAt: z.date(),
});
