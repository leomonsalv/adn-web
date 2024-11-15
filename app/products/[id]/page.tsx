import { Product } from "../../../types/product";
import ProductPageClient from "./ProductPageClient";
import { getProductById } from "@/lib/api";

interface ProductPageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product: Product | null = await getProductById(params.id);

  if (!product) {
    return <p>Product not found</p>;
  }

  return <ProductPageClient product={product} />;
}
