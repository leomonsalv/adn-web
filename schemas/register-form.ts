import { z } from "zod";

export const RegisterFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "El nombre tiene que tener mínimo 2 caracteres." })
    .trim(),
  email: z
    .string()
    .email({ message: "Por favor ingresa un correo válido." })
    .trim(),
  password: z
    .string()
    .min(6, { message: "Tiene que ser del al menos 6 caracteres" })
    .regex(/[a-zA-Z]/, { message: "Contener al menos una letra." })
    .regex(/[0-9]/, { message: "Contener al menos un numero." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Tener al menos un caracter especial.",
    })
    .trim(),
  referral: z.optional(
    z
      .string()
      .max(10, {
        message: "El código solo puede tener un máximo de 10 caracteres.",
      })
      .trim(),
  ),
});

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        referral?: string[];
      };
      message?: string;
    }
  | undefined;
