import { Product } from "@/types/product";
import { getProductById } from "@/lib/api";
import ProductPageClient from "./[id]/page";

interface ProductPageProps {
  params: { id: string };
}
//FIXME: WHY THIS DOES NOT WORK ?
export default async function ProductDetailsPage({ params }: ProductPageProps) {
  console.log("🚀 ~ ProductDetailsPage ~ params:", params);
  const productId = Array.isArray(params.id) ? params.id[0] : params.id;
  console.log("🚀 ~ ProductDetailsPage ~ productId:", productId);

  if (!productId) {
    console.error("Product ID is missing or undefined.");
    return <p>Invalid product ID</p>;
  }

  try {
    const product: Product | null = await getProductById(productId);
    console.log("🚀 ~ ProductDetailsPage ~ product:", product);
    if (!product) {
      return <p>Product not found</p>;
    }
    return <ProductPageClient product={product} />;
  } catch (error) {
    console.error("Error fetching product:", error);
    return <p>Error loading product details</p>;
  }
}
