import * as z from 'zod';

const BasePaymentSchema = z.object({
  method: z.string(),
});

const ZelleSchema = BasePaymentSchema.extend({
  holderName: z.string().min(1, 'Holder name is required'),
});

const CashSchema = BasePaymentSchema.extend({
  amount: z.number().min(1, 'Amount must be greater than 0'),
});

const BolivarCashSchema = BasePaymentSchema.extend({
  amount: z.number().min(1, 'Amount must be greater than 0'),
});

const BinanceSchema = BasePaymentSchema.extend({
  holderName: z.string().min(1, 'Holder name is required'),
});

export const PaymentMethodFormSchema = z.discriminatedUnion('method', [
  ZelleSchema.extend({ method: z.literal('zelle') }),
  CashSchema.extend({ method: z.literal('cash') }),
  BolivarCashSchema.extend({ method: z.literal('bolivarCash') }),
  BinanceSchema.extend({ method: z.literal('mBinance') }),
]);

export type PaymentMethodFormType = z.infer<typeof PaymentMethodFormSchema>;
