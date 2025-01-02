import { z } from 'zod';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export const SignInFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z.string().min(6, { message: 'Be at least 8 characters long' }).trim(),
});

export type FormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
