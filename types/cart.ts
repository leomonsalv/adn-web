import { CartSchema } from "@/schemas/cart";
import { z } from "zod";

// export the type derived from the schema
export type Cart = z.infer<typeof CartSchema>;
export type CartProducts = z.infer<typeof CartSchema>["products"];
export type CartProduct = z.infer<typeof CartSchema>["products"][number];
