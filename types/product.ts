// types/product.ts

import { ProductSchema } from '@/schemas/product-schema'
import { z } from 'zod'

export type Product = z.infer<typeof ProductSchema>
