import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Verifica tus datos." }).trim(),
});

export type FormState =
  | {
      errors?: {
        email?: string[];
      };
      message?: string;
    }
  | undefined;
