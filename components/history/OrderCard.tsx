import { Order } from "@/types/order";
import OrderHeader from "./OrderHeader";
import ProductList from "./ProductList";

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border">
      <h3 className="sr-only">
        Order placed on{" "}
        <time dateTime={order.createdDatetime}>{order.createdDate}</time>
      </h3>
      <OrderHeader order={order} />
      <ProductList
        products={order.products}
        deliveredDate={order.deliveredDate}
        deliveredDatetime={order.deliveredDatetime}
      />
    </div>
  );
}
