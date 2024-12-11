import * as z from 'zod'

export const PartialUserProfileUpdateSchema = z
  .object({
    fullName: z.string().nonempty('El nombre completo es requerido').optional(),
    idDocument: z.string().nonempty('El documento de identidad es requerido').optional(),
  })
  .refine((data) => data.fullName || data.idDocument, {
    message: 'Debes proporcionar al menos un campo para actualizar',
  })

export const PhoneOtpProfileSchema = z.object({
  phoneNumber: z
    .string()
    .regex(/^\d{10,14}$/, 'El número de teléfono debe tener entre 10 y 14 dígitos')
    .nullable(),
})

export const OtpProfileSchema = z.object({
  otp: z
    .string()
    .regex(/^\d{4}$/, 'La verificación debe de tener solo 4 digitos')
    .nullable(),
})

export type PhoneOtpProfileFormValues = z.infer<typeof PhoneOtpProfileSchema>
export type OtpProfileFormValues = z.infer<typeof OtpProfileSchema>
export type UserProfileFormValues = z.infer<typeof PartialUserProfileUpdateSchema>
