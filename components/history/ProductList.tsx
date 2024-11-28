import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

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
      <h4 className="sr-only">Items</h4>
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
