import { z } from 'zod';

// Esquemas para validación de datos de giftcards
export const GiftcardSchema = z.object({
  id: z.string(),
  code: z.string(),
  amount: z.number(),
  status: z.string(),
  created_by: z.string().optional(),
  created_at: z.string(),
  expires_at: z.string().optional(),
  description: z.string().optional(),
});

export const GiftcardListResponseSchema = z.array(GiftcardSchema);

export const GiftcardCreateRequestSchema = z.object({
  amount: z.number(),
  description: z.string(),
  expires_at: z.string(),
  user_id: z.string(),
});

export const GiftcardCreateResponseSchema = GiftcardSchema;

export const GiftcardRedeemRequestSchema = z.object({
  code: z.string(),
});

export const GiftcardRedeemResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  amount: z.number(),
  gift_card_code: z.string(),
  pre_wallet: z.number(),
  final_wallet: z.number(),
});

export const GiftcardValidateRequestSchema = z.object({
  code: z.string(),
});

export const GiftcardValidateResponseSchema = z.object({
  valid: z.boolean(),
  message: z.string(),
});

// Tipos exportados
export type Giftcard = z.infer<typeof GiftcardSchema>;
export type GiftcardListResponse = z.infer<typeof GiftcardListResponseSchema>;
export type GiftcardCreateRequest = z.infer<typeof GiftcardCreateRequestSchema>;
export type GiftcardCreateResponse = z.infer<typeof GiftcardCreateResponseSchema>;
export type GiftcardRedeemRequest = z.infer<typeof GiftcardRedeemRequestSchema>;
export type GiftcardRedeemResponse = z.infer<typeof GiftcardRedeemResponseSchema>;
export type GiftcardValidateRequest = z.infer<typeof GiftcardValidateRequestSchema>;
export type GiftcardValidateResponse = z.infer<typeof GiftcardValidateResponseSchema>;
