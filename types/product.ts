// types/product.ts

export interface Product {
  // TODO: ACTUALIZAR POR PRODUCTOS REALES
  id: number;
  name: string;
  href: string;
  price: string;
  description?: string;
  options?: string;
  imageSrc: string;
  imageAlt: string;
  color?: string;
  inStock?: boolean;
  size?: string;
  leadTime?: string;
  tax?: number;
}
