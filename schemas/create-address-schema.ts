import * as z from 'zod';

// Main Address Schema
export const AddressSchema = z.object({
  alias: z.string(), // Required - Name/alias for the address
  city: z.string(), // Required - City name
  house: z.string(), // Required - House or building number/name
  phone: z.string(), // Required - Contact phone number (11 digits)
  position: z.object({
    lat: z.number(), // Required - Latitude coordinate
    lng: z.number(), // Required - Longitude coordinate
  }),
  state: z.string(), // Required - State name
  street: z.string(), // Required - Street name
  zone: z.string(), // Required - Zone/area name
  default: z.boolean(), // Required - Whether this is the default address
  instructions: z.string().optional(), // Optional - Additional delivery instructions
});

export type Address = z.infer<typeof AddressSchema>;
