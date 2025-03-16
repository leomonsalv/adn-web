import { BANKS } from '@/constants/banks';
import exp from 'constants';
import * as z from 'zod';

// Custom type for DNI
const DniTypeEnum = z.enum(['V', 'J', 'E', 'P', 'G']);

export type DniType = z.infer<typeof DniTypeEnum>;

// Payment method type enum
export const PaymentMethodTypeEnum = z.enum([
  'cash',
  'bolivarCash',
  'pagomovil',
  'binance',
  'zelle',
  'credit',
  'tdcve',
  'paypal',
  'botonbanesco',
  'bncPos',
  'preCredit',
  'mBinance',
  'motopos',
  'vippo',
]);

export type PaymentMethodType = z.infer<typeof PaymentMethodTypeEnum>;

// Customized Invoice Schema
const CustomizedInvoiceSchema = z.object({
  name: z.string(),
  prefix: z.string().length(4),
  phone: z.string(),
  dni: z.string(),
  dniType: DniTypeEnum,
});

// Shipping Schema
const ShippingSchema = z.object({
  price: z.number(),
  type: z.enum(['delivery', 'pickup', 'zoom']),
  details: z.object({
    type: z.enum(['instantaneous', 'scheduled']),
    schedule: z.union([z.null(), z.date()]),
  }),
});

// Payment Details Schemas
const BillsSchema = z
  .object({
    requiredAmount: z.number(),
    amount: z.number().int(),
    image: z.string().optional(),
    code: z.string().optional(),
  })
  .refine((data) => data.amount >= data.requiredAmount, {
    message: 'El monto debe ser igual o mayor al monto requerido',
  })
  .refine((data) => data.amount <= data.requiredAmount + 100, {
    message: 'El monto no puede exceder el monto requerido por más de 100',
  });

export const OtpSchema = z.object({
  token: z.string().min(3, {
    message: 'Debe contener al menos 3 caracteres',
  }),
});

export const CashbackSchema = z.object({
  banco: z.enum(BANKS.map((bank) => bank.value) as [string, ...string[]], {
    message: 'Debes seleccionar un banco',
  }),
  cedula: z.string({ required_error: 'Cédula es requerida' }).regex(/^[VJPGE]\d{5,10}$/, {
    message: 'Cédula debe comenzar con V, J, P, G o E seguido de 5-10 números',
  }),
  telefono: z.string({ required_error: 'Teléfono es requerido' }),
});

export const PagoMovilSchema = z.object({
  isConfirmed: z.boolean(),
  type: z.literal('pagomovil'),
  details: z.object({
    amount: z.number(),
    bank: z.string(),
    phone: z.string().min(3),
    dniType: z.string().default('V'),
    dni: z.string().min(6),
    destination: z.enum(['plaza', 'amiga']),
    reference: z.string().optional(),
  }),
});

export type PagoMovil = z.infer<typeof PagoMovilSchema>;
export type OtpSchemaType = z.infer<typeof OtpSchema>;

export type CashbackSchemaType = z.infer<typeof CashbackSchema>;

export type PaymentDetailsUnionType = z.infer<typeof PaymentMethodSchema>;

// Payment Method Schema
export const PaymentMethodSchema = z.discriminatedUnion('type', [
  // Cash and Bolivar Cash
  z.object({
    isConfirmed: z.boolean(),
    type: z.enum(['cash', 'bolivarCash']),
    details: z.object({
      bills: z.array(BillsSchema),
      comments: z.string(),
    }),
  }),
  // Pagomovil
  z.object({
    isConfirmed: z.boolean(),
    type: z.literal('pagomovil'),
    details: z.object({
      amount: z.number(),
      bank: z.string(),
      prefix: z.string(),
      phone: z.string(),
      dniType: z.string().default('V'),
      dni: z.string(),
      destination: z.enum(['plaza', 'amiga']),
      reference: z.string().optional(),
    }),
  }),
  // Simple amount types (binance, credit, preCredit)
  z.object({
    isConfirmed: z.boolean(),
    type: z.enum(['binance', 'credit', 'preCredit']),
    details: z.object({
      amount: z.number(),
    }),
  }),
  // Zelle
  z.object({
    isConfirmed: z.boolean(),
    type: z.literal('zelle'),
    details: z.object({
      amount: z.number(),
      email: z.string().email(),
      name: z.string().min(3),
    }),
  }),
  // TDCVE
  z.object({
    isConfirmed: z.boolean(),
    type: z.literal('tdcve'),
    details: z.object({
      cardNumber: z.string(),
      codigoSeguridad: z.string(),
      vencimiento: z.object({
        mes: z.number(),
        ano: z.number(),
      }),
      cedula: z.string().optional(),
    }),
  }),
  // Paypal
  z.object({
    isConfirmed: z.boolean(),
    type: z.literal('paypal'),
    details: z.object({
      orderId: z.string(),
    }),
  }),
  // Boton Banesco
  z.object({
    isConfirmed: z.boolean(),
    type: z.literal('botonbanesco'),
    details: z.object({}),
  }),
  // BNC Pos
  z.object({
    isConfirmed: z.boolean(),
    type: z.literal('bncPos'),
    details: z.object({
      tarjeta: z.number(),
      cvv: z.number(),
      vencimiento: z.string().regex(/^\d{6}$/), // Format: "MMYYYY"
      cedula: z.number(),
      clave: z.number(),
      nombre: z.string(),
      tipoCuenta: z.enum(['corriente', 'ahorro']),
    }),
  }),
  // mBinance, motopos
  z.object({
    isConfirmed: z.boolean(),
    type: z.enum(['mBinance', 'motopos']),
    details: z.object({
      amount: z.number(),
    }),
  }),
  // Vippo
  z.object({
    isConfirmed: z.boolean(),
    type: z.literal('vippo'),
    details: z.object({
      amount: z.number(),
      holderName: z.string().min(1),
      cardNumber: z.string().min(16),
      vencimiento: z.object({
        mes: z.number(),
        ano: z.number(),
      }),
      codigoSeguridad: z.string().min(3),
      token: z.number(),
      expiration: z.string().min(5),
    }),
  }),
]);

export type PaymentMethod = z.infer<typeof PaymentMethodSchema>;

// Payment Schema
const PaymentSchema = z.object({
  methods: z.array(PaymentMethodSchema),
  cashback: CashbackSchema.optional(),
});

// Odoo Order Schema
const OdooOrderSchema = z.object({
  product_list: z.array(
    z.object({
      product_id: z.number(),
      product_uom_qty: z.number(),
      subtotal: z.number(),
      tax: z.number(),
    }),
  ),
});

// Prescription Schema
export const PrescriptionSchema = z.object({
  product: z.number(),
  url: z.string(),
});
export type Prescription = z.infer<typeof PrescriptionSchema>;

// Main Order Schema
export const OrderSchema = z.object({
  webOrApp: z.string(),
  iosOrAnd: z.string(),
  addressId: z.string(),
  clientId: z.string(),
  clientName: z.string(),
  prescriptions: z.array(PrescriptionSchema),
  subtotal: z.number(),
  tax: z.number(),
  ref: z.number(),
  type: z.literal('alpha'),
  customizedInvoice: CustomizedInvoiceSchema,
  coupon: z.string(),
  shipping: ShippingSchema,
  payment: PaymentSchema,
  odooOrder: OdooOrderSchema,
  deviceId: z.string(),
});

export type Order = z.infer<typeof OrderSchema>;

export const SelectPaymentMixedSchema = z.object({
  methods: z.array(z.string()),
  details: z.array(
    z.object({
      name: z.string(),
      monto: z.number(),
    }),
  ),
});

export type SelectPaymentMixed = z.infer<typeof SelectPaymentMixedSchema>;
