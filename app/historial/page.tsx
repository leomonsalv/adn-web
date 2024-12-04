"use client";
import OrderCard from "@/components/history/OrderCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useOrders from "@/hooks/use-orders";
import { Order } from "@/types/order";

function OrderCardSkeleton() {
  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="space-y-4">
        <Skeleton className="h-6 w-1/3 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-2" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
}

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

  const orders = rawData?.pages.flatMap((page) => page.orders) || [];

  if (isError) return <p>Error cargando el historial</p>;

  return (
    <div className="bg-white">
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
          <div className="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Historial de órdenes
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Chequea el estatus de tus órdenes realizadas
            </p>
          </div>
        </div>
        <div className="mt-16">
          <h2 className="sr-only">Órdenes recientes</h2>
          <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
            <div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
              {isLoading
                ? [...Array(5)].map((_, index) => (
                    <OrderCardSkeleton key={index} />
                  ))
                : orders.length > 0
                  ? orders.map((order, index) => (
                      <OrderCard
                        key={order.id || index}
                        order={order as unknown as Order}
                      />
                    ))
                  : !isLoading && (
                      <div className="text-gray-500">
                        No tienes órdenes recientes
                      </div>
                    )}

              {hasNextPage && (
                <Button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="w-full"
                >
                  {isFetchingNextPage ? "Cargando..." : "Cargar más"}
                </Button>
              )}

              {isFetchingNextPage &&
                [...Array(2)].map((_, index) => (
                  <OrderCardSkeleton key={`fetching-${index}`} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
