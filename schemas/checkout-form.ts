import { z } from "zod";

export const checkoutFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  name: z.string({ message: "Name is required" }).min(1, "Name is required"),
  cardNumber: z.coerce
    .number({ message: "Card Number is required" })
    .min(1, "Card Number must be 1 or greater"),
  expirationDate: z.coerce
    .number({ message: "Expiration Date is required" })
    .min(1, "Expiration Date must be 1 or greater"),
  cvc: z.coerce
    .number({ message: "CVC is required" })
    .min(1, "CVC must be 1 or greater")
    .max(999),
  deliveryMethod: z
    .string({ message: "Method is required" })
    .min(1, "Method is required"),
  shippingAddress: z
    .string({ message: "Shipping Address is required" })
    .min(1, "Shipping Address is required"),
  address: z
    .string({ message: "Address is required" })
    .min(1, "Address is required"),
  apartment: z
    .string({ message: "Apartment is required" })
    .min(1, "Apartment is required"),
  city: z.string({ message: "City is required" }).min(1, "City is required"),
  state: z.string({ message: "State is required" }).min(1, "State is required"),
  postal: z.coerce
    .number({ message: "Postal number is required" })
    .min(1, "Postal number must be 1 or greater"),
  rememberBilling: z.string(),
});

export type Checkout = z.infer<typeof checkoutFormSchema>;
