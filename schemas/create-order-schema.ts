import * as z from 'zod';

// Custom type for DNI
const DniTypeEnum = z.enum(['V', 'J', 'E', 'v', 'e', 'j']);

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
const BillsSchema = z.object({
  amount: z.number(),
  image: z.string().optional(),
  code: z.string().optional(),
});

export const PaymentDetailsUnionSchema = z.discriminatedUnion('type', [
  // Cash/BolivarCash
  z.object({
    type: z.enum(['cash', 'bolivarCash']),
    details: z.object({
      bills: z.array(BillsSchema),
      comments: z.string(),
    }),
  }),
  // Pagomovil
  z.object({
    type: z.literal('pagomovil'),
    details: z.object({
      amount: z.number(),
      bank: z.string(),
      prefix: z.string(),
      phone: z.string(),
      dniType: z.string(),
      dni: z.string(),
      destination: z.enum(['plaza', 'amiga']),
      reference: z.string().optional(),
    }),
  }),
  // Simple amount types (binance, credit, preCredit)
  z.object({
    type: z.enum(['binance', 'credit', 'preCredit']),
    details: z.object({
      amount: z.number(),
    }),
  }),
  // Zelle
  z.object({
    type: z.literal('zelle'),
    details: z.object({
      amount: z.number(),
      email: z.string().email(),
    }),
  }),
  // TDCVE
  z.object({
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
    type: z.literal('paypal'),
    details: z.object({
      orderId: z.string(),
    }),
  }),
  // Boton Banesco
  z.object({
    type: z.literal('botonbanesco'),
    details: z.object({}),
  }),
  // BNC Pos
  z.object({
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
    type: z.enum(['mBinance', 'motopos']),
    details: z.object({
      amount: z.number(),
    }),
  }),
  // Vippo
  z.object({
    type: z.literal('vippo'),
    details: z.object({
      amount: z.number(),
      holderName: z.string(),
      cardNumber: z.string(),
      vencimiento: z.object({
        mes: z.number(),
        ano: z.number(),
      }),
      codigoSeguridad: z.string(),
      token: z.string(),
    }),
  }),
]);

export type PaymentDetailsUnionType = z.infer<typeof PaymentDetailsUnionSchema>;

// Payment Method Schema
const PaymentMethodSchema = z.object({
  isConfirmed: z.literal(true),
  details: z.union([
    z.object({
      bills: z.array(BillsSchema),
      comments: z.string(),
    }),
    z.object({
      amount: z.number(),
      comments: z.string(),
    }),
    z.object({
      amount: z.number(),
      bank: z.string(),
      prefix: z.string(),
      phone: z.string(),
      dniType: z.string(),
      dni: z.string(),
      destination: z.enum(['plaza', 'amiga']),
      reference: z.string().optional(),
    }),
    // ... other detail types as needed
  ]),
});

export type PaymentMethod = z.infer<typeof PaymentMethodSchema>;

// Payment Schema
const PaymentSchema = z.object({
  methods: z.array(PaymentMethodSchema),
  cashback: z
    .object({
      banco: z.string(),
      cedula: z.string(),
      telefono: z.string(),
    })
    .optional(),
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

// Main Order Schema
export const OrderSchema = z.object({
  webOrApp: z.string(),
  iosOrAnd: z.string(),
  addressId: z.string(),
  clientId: z.string(),
  clientName: z.string(),
  prescriptions: z.array(z.any()),
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
