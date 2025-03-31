import { CartSchema } from '@/schemas/cart-schema';
import { z } from 'zod';

// export the type derived from the schema
export type Cart = z.infer<typeof CartSchema>;
export type CartProducts = z.infer<typeof CartSchema>['products'];
export type CartProduct = z.infer<typeof CartSchema>['products'][number];

interface Tax {
  id: number;
  name: string;
  type: string;
  amount_type: string;
  company: {
    id: number;
    name: string;
  };
  amount: string;
  description: string;
  price_include: boolean;
}

interface Product {
  id: number;
  barcode: string;
  x_studio_product_type: string;
  price_ref: number;
  taxes_ids: number[];
  name: string;
  price: number;
  taxes: Tax[];
  cantidad: number;
  subtotal: string;
  tax: string;
}

export interface CouponCalculationResponse {
  subtotalSinDescuento: number;
  tasaDolar2: number;
  prescription: boolean;
  subtotal: string;
  taxes: string;
  total: string;
  ref: string;
  discount: string;
  discountRef: string;
  products2: Product[];
  code: string;
}
