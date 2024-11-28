import { Product } from "./product";

export interface Order {
  number: string;
  href: string;
  invoiceHref: string;
  createdDate: string;
  createdDatetime: string;
  deliveredDate: string;
  deliveredDatetime: string;
  total: string;
  products: Product[];
}
