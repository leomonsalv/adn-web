// app/api/products/route.ts

import { NextResponse } from "next/server";
import { Product } from "@/types/product";
import { getAllProducts } from "@/lib/api";

export async function GET() {
  const products: Product[] = await getAllProducts();
  return NextResponse.json(products);
}
