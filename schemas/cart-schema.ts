import { z } from 'zod'
import { ProductSchema } from './product-schema'

export const CartSchema = z.object({
  id: z.string(),
  products: z
    .object({
      ...ProductSchema.shape,
      quantity: z.number(),
    })
    .array(),
  userId: z.string(),
})
