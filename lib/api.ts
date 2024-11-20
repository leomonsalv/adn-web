import { Product } from "@/types/product";
import { products } from "./dummyData";

/**
 * Get all products.
 * @returns {Promise<Product[]>} Promise that resolves to an array of products.
 */
export const getAllProducts = async (): Promise<Product[]> => {
  // Simulating fetching all products from a data source
  return products;
};

/**
 * Get a product by its ID.
 * @param {string} id - The ID of the product.
 * @returns {Promise<Product | null>} Promise that resolves to a product or null if not found.
 */
export const getProductById = async (id: string): Promise<Product | null> => {
  const product = products.find((product) => product.id.toString() === id);
  return product || null;
};
