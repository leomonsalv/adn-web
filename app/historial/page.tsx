"use client";
import OrderCard from "@/components/history/OrderCard";
import { Button } from "@/components/ui/button";
import useOrders from "@/hooks/use-orders";
import { Order } from "@/types/order";

export default function Historial() {
  const { useGetOrders } = useOrders();
  const {
    data: rawData,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetOrders();
  const data = rawData || [];

  const orders = rawData?.pages.flatMap((page) => page.orders) || [];

  console.log("🚀 ~ Historial ~ data:", data);

  if (isLoading) return <div>Cargando...</div>;

  if (isError) return <p>Error cargando el historial</p>;

  return (
    <div className="bg-white">
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
          <div className="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Historial de ordenes
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Chequea el estatus de tus ordenes realizadas
            </p>
          </div>
        </div>
        <div className="mt-16">
          <h2 className="sr-only">Ordenes recientes</h2>
          <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
            <div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
              {orders.length > 0 ? (
                orders.map((order: Order, index: number) => (
                  <OrderCard key={order.id || index} order={order} />
                ))
              ) : (
                <div>No tienes ordenes recientes</div>
              )}
              {/* {Array.isArray(data) ? (
                data.map((order, index) => (
                  <OrderCard key={index} order={order as Order} />
                ))
              ) : (
                <div>No tienes ordenes recientes</div>
              )} */}
              {hasNextPage && (
                <Button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? "Cargando..." : "Cargar más"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
