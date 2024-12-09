import * as z from "zod";

export const UserProfileSchema = z.object({
  fullName: z
    .string()
    .min(1, "El nombre completo es obligatorio")
    .max(100, "El nombre completo no debe exceder los 100 caracteres"),
  idDocument: z
    .string()
    .min(5, "El documento de identidad es obligatorio")
    .regex(/^\d+$/, "El documento de identidad debe contener solo números"),
  phoneNumber: z
    .string()
    // .optional()
    .regex(
      /^\d{10,14}$/,
      "El número de teléfono debe tener entre 10 y 14 dígitos",
    )
    .nullable(),
  email: z
    .string()
    .email("El correo electrónico no es válido")
    .optional()
    .nullable(),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(100, "La contraseña no debe exceder los 100 caracteres"),
  isPhoneConfirmed: z.boolean().default(false),
  isEmailConfirmed: z.boolean().default(false),
});

export type UserProfileFormValues = z.infer<typeof UserProfileSchema>;
