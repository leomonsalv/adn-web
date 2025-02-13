'use client';

import MainIncentives from '@/components/incentives/MainIncentives';
import CartList from '@/components/cart/CartList';
import { useCartStore } from '@/stores/cart-store';
import CartOrderSummary from '@/components/cart/CartOrderSummary';
import useCart from '@/hooks/use-cart';
import { useEffect, useMemo } from 'react';
import { RecommendedProductsPayload } from '@/types/product';
import useProducts from '@/hooks/use-products';
import CarouselRecommened from '@/components/carousel/CarouselRecommened';

export default function Cart() {
  const { cart, setCart } = useCartStore();
  const { useGetCart } = useCart();
  const { data, isLoading } = useGetCart();
  const { useGetRecommendedProducts } = useProducts();

  const productIds = useMemo(() => {
    return cart?.products?.map((product) => product.productId) || [];
  }, [cart]);

  const payload: RecommendedProductsPayload | null = useMemo(() => {
    if (productIds.length === 0) return null;
    return {
      type: 'Cart',
      products: productIds,
      productBased: true,
    };
  }, [productIds]);

  const {
    data: recommendedData,
    isLoading: isRecommendedLoading,
    error: recommendedError,
  } = useGetRecommendedProducts(payload!);

  useEffect(() => {
    if (data) {
      setCart(data);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Carrito</h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <CartList items={cart.products} cartId={cart.id} />
          <CartOrderSummary />
        </form>
      </div>

      {productIds.length > 0 && (
        <section className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
          {isRecommendedLoading ? (
            <div className="flex justify-center items-center">
              <p>Cargando productos recomendados...</p>
            </div>
          ) : recommendedError ? (
            <div className="flex justify-center items-center">
              <p>Error cargando recomendaciones</p>
            </div>
          ) : (
            <CarouselRecommened
              title="Productos similares a"
              subtitle={cart.products[0]?.name || 'tus productos'}
              products={recommendedData || []}
            />
          )}
        </section>
      )}

      <MainIncentives />
    </div>
  );
}
