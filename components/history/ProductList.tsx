import ProductCard from "./ProductCard";
import { Product } from "@/schemas/orders";

interface ProductListProps {
  products: Product[];
  deliveredDate: string;
  deliveredDatetime: string;
}

export default function ProductList({
  products,
  deliveredDate,
  deliveredDatetime,
}: ProductListProps) {
  return (
    <>
      <h4 className="sr-only">Lista de productos</h4>
      <ul role="list" className="divide-y divide-gray-200">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            deliveredDate={deliveredDate}
            deliveredDatetime={deliveredDatetime}
          />
        ))}
      </ul>
    </>
  );
}
