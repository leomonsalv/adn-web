import { z } from 'zod';

export const contactInformationSchema = z.object({
  name: z.string().min(3, { message: 'Nombre es obligatorio' }),
  email: z.string().email('Correo inválido'),
  dni: z.string().min(8, { message: 'Cédula inválida' }),
  dniType: z.enum(['G', 'E', 'P', 'J', 'V']),
});

export type ContactInformationSchema = z.infer<typeof contactInformationSchema>;
