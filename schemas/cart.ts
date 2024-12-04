import { z } from "zod";

export const CartSchema = z.object({
  products: z.array(
    z.object({
      id: z.number(),
      quantity: z.number(),
      product_id: z.number(),
      product_uom_quantity: z.number(),
      tasa: z.number(),
      prescriptionImg: z.string(),
      price: z.string(),
      tax: z.number(),
      imageSrc: z.string(),
      name: z.string(),
      color: z.string(),
      size: z.string(),
      inStock: z.boolean(),
      leadTime: z.string(),
    }),
  ),
  userId: z.string(),
});
