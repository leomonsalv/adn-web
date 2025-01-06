import { z } from 'zod';
import { phoneSchema } from './auth-schema';

export const contactInformationSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: phoneSchema,
  dni: z.string().min(8),
  dniType: z.enum(['G', 'E', 'P', 'J', 'V']),
});

export type ContactInformationSchema = z.infer<typeof contactInformationSchema>;
