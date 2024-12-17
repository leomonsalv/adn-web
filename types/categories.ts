import { GetCategoriesResponseSchema } from '@/schemas/categories-schema'
import { z } from 'zod'

export type GetCategoriesResponse = z.infer<typeof GetCategoriesResponseSchema>
