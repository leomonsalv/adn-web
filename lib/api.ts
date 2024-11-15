import { Product } from "@/types/product";

export const getAllProducts = async (): Promise<Product[]> => {
  const res = await fetch("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
  const data = await res.json();
  return data;
};

export const getProductById = async (id: string): Promise<Product | null> => {
  // Simulate fetching product by id
  return {
    id,
    name: `Product ${id}`,
    description: `Description ${id}`,
    price: 100,
    imageUrl: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  };
};
