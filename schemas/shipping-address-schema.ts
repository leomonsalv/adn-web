import { z } from 'zod';

export const shippingAddressSchema = z.object({
  phone: z
    .string()
    .min(1, 'El teléfono es requerido')
    .regex(/^\d{10,11}$/, 'Teléfono inválido'),
  street: z.string().min(1, 'La dirección es requerida'),
  city: z.string().min(1, 'La ciudad es requerida'),
  state: z.string().min(1, 'El estado es requerido'),
  isDefault: z.boolean().default(false),
  lat: z.number().optional(),
  lng: z.number().optional(),
  alias: z.string().min(1, 'El alias es requerido'),
  id: z.string().optional(),
  type: z.enum(['delivery', 'pickup', 'zoom']).default('delivery'),
});

export type ShippingAddress = z.infer<typeof shippingAddressSchema>;
