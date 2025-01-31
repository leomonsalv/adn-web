import { Order } from '@/types/order';
import OrderHeader from './OrderHeader';
import ProductList from './ProductList';

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="border-b border-t border-gray-200 bg-white shadow-xs sm:rounded-lg sm:border">
      <h3 className="sr-only">
        Orden creada el:{' '}
        <time dateTime={order.odooDataOrder.create_date}>{order.odooDataOrder.create_date}</time>
      </h3>
      <OrderHeader order={order} />
      <ProductList
        products={order.odooDataOrder.products}
        deliveredDate={order.odooDataOrder.create_date}
        deliveredDatetime={order.odooDataOrder.create_date}
      />
    </div>
  );
}
