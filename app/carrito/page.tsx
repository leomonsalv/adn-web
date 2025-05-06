'use client';

import MainIncentives from '@/components/incentives/MainIncentives';
import CartList from '@/components/cart/CartList';
import { useCartStore } from '@/stores/cart-store';
import CartOrderSummary from '@/components/cart/CartOrderSummary';
import useCart from '@/hooks/use-cart';
import { useEffect, useMemo } from 'react';
import type { SuggestionsProductsPayload } from '@/types/product';
import useProducts from '@/hooks/use-products';
import { useAuth } from '@/hooks/use-auth';
import CarouselRecommened from '@/components/carousel/CarouselRecommened';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Cart() {
  const { cart, setCart } = useCartStore();
  const { useGetCart } = useCart();
  const { data, isLoading } = useGetCart();
  const { useGetRecommendations } = useProducts();
  const { user } = useAuth();

  const productIds = useMemo(() => {
    return cart?.products?.map((product) => product.productId) || [];
  }, [cart]);

  const payload: SuggestionsProductsPayload | null = useMemo(() => {
    return {
      type: 'Details',
      products: user?.uid ? [user.uid] : [],
      productBased: true,
    };
  }, [user?.uid]);

  const {
    data: recommendationsData,
    isLoading: isRecommendedLoading,
    error: recommendedError,
  } = useGetRecommendations(payload!);

  useEffect(() => {
    if (data && !isLoading) {
      const serverItemCount = data.products.reduce(
        (sum: number, item: { quantity: number }) => sum + item.quantity,
        0,
      );
      const localItemCount = cart.products.reduce(
        (sum: number, item: { quantity: number }) => sum + item.quantity,
        0,
      );

      if (Math.abs(serverItemCount - localItemCount) > 1) {
        setCart(data);
      }
    }
  }, [data, isLoading]);

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Carrito</h1>

        {cart.products.length === 0 ? (
          <div className="mt-12 text-center py-16">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Tu carrito está vacío</h2>
            <p className="text-gray-500 mb-8">
              Parece que aún no has agregado productos a tu carrito.
            </p>
            <Button color="dark/white" className="w-1/2 h-12 hover:bg-gray-800">
              <Link href="/">Continuar comprando</Link>
            </Button>
          </div>
        ) : (
          <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <CartList items={cart.products} cartId={cart.id} />
            <CartOrderSummary />
          </form>
        )}
      </div>

      {/* Only show recommended products if there are items in the cart */}
      {productIds.length > 0 &&
        !recommendedError &&
        recommendationsData &&
        recommendationsData.length > 0 && (
          <section className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
            {isRecommendedLoading ? (
              <div className="flex justify-center items-center py-8">
                <p>Cargando productos recomendados...</p>
              </div>
            ) : (
              <CarouselRecommened
                title="Usuarios como tú también compraron"
                subtitle={''}
                products={recommendationsData}
              />
            )}
          </section>
        )}

      <MainIncentives />
    </div>
  );
}
