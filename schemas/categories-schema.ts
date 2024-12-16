import * as z from 'zod'

export const GetCategoriesResponseSchema = z.object({
  data: z.record(z.string(), z.string()),
})
