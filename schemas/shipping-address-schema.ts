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
});

export type ShippingAddressSchema = z.infer<typeof shippingAddressSchema>;
