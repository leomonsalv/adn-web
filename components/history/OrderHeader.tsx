import { Order } from "@/types/order";
import OrderActions from "./OrderActions";
import { formatVefCurrency } from "@/lib/utils";

interface OrderHeaderProps {
  order: Order;
}

export default function OrderHeader({ order }: OrderHeaderProps) {
  return (
    <div className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
      <dl className="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
        <div>
          <dt className="font-medium text-gray-900">Número de orden</dt>
          <dd className="mt-1 text-gray-500">{order.odooDataOrder.name}</dd>
        </div>
        <div className="hidden sm:block">
          <dt className="font-medium text-gray-900">Fecha de la compra</dt>
          <dd className="mt-1 text-gray-500">
            <time dateTime={order.odooDataOrder.create_date}>
              {order.odooDataOrder.create_date}
            </time>
          </dd>
        </div>
        <div>
          <dt className="font-medium text-gray-900">Monto total</dt>
          <dd className="mt-1 font-medium text-gray-900">
            {" "}
            {formatVefCurrency(Number(order.total))}
          </dd>
        </div>
      </dl>
      <OrderActions order={order} />
    </div>
  );
}
