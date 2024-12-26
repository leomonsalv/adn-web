import * as z from 'zod';

export const CurrencySchema = z.enum(['Bs', 'USD']);
export type Currency = z.infer<typeof CurrencySchema>;

export const MethodSchema = z.object({
  available: z.union([z.boolean(), z.string()]),
  color: z.string(),
  onlineBanking: z.boolean().optional(),
  hasValidation: z.boolean().optional(),
  icon: z.string(),
  currency: CurrencySchema,
  name: z.string(),
  value: z.string(),
  qr: z.string().optional(),
});
export type Method = z.infer<typeof MethodSchema>;

export const SearchResponseSchema = z.object({
  methods: z.array(MethodSchema),
});

export type SearchResponse = z.infer<typeof SearchResponseSchema>;
