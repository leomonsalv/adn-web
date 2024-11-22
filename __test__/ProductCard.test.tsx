// tests/ProductCard.test.tsx

import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import ProductCard from "../components/cart/ProductCard";
import { Product } from "../types/product";

const mockProduct: Product = {
  id: "1",
  name: "Test Product",
  description: "Test Description",
  price: 99.99,
  imageUrl: "/test.jpg",
};

test("renders product card with correct name", () => {
  render(<ProductCard product={mockProduct} />);
  const productName = screen.getByText(/Test Product/i);
  expect(productName).toBeInTheDocument();
});
