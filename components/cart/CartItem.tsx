import { XMarkIcon, CheckIcon, ClockIcon } from '@heroicons/react/24/outline';

import { useCartStore } from '@/stores/cart-store';
import AmountSelector from '../products/AmountSelectors/AmountSelector';
import { Button } from '../ui/button';
import type { CartProduct } from '@/types/cart';
import Image from 'next/image';
import useCart from '@/hooks/use-cart';
import useProducts from '@/hooks/use-products';

interface CartItemProps {
  item: CartProduct;
  cartId: string;
}

export default function CartItem({ item, cartId }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCartStore();
  const { useMutateCart, useRemoveProductFromCart } = useCart();
  const { mutateAsync: mutateCart } = useMutateCart();
  const { mutateAsync: mutateRemoveCart } = useRemoveProductFromCart();

  const handleQuantityChange = async (quantity: number) => {
    try {
      updateQuantity(item.id, quantity);
      await mutateCart({
        cartId: cartId,
        userId: item.userId || '',
        products: {
          id: item.id,
          prescriptionImg: item.prescriptionImg || '',
          quantity: quantity,
        },
      });
    } catch (error) {
      console.error('Error updating quantity:', error);
      updateQuantity(item.id, item.quantity);
    }
  };

  const handleRemoveFromCart = async () => {
    await mutateRemoveCart({
      cartId: cartId,
      userId: item.userId || '',
      products: {
        id: item.id,
        prescriptionImg: item.prescriptionImg || '',
        quantity: item.quantity,
      },
    });
    removeFromCart(item.id);
  };

  return (
    <li className="flex py-6 sm:py-10">
      <div className="shrink-0">
        <Image
          width={100}
          height={100}
          alt={item.name}
          src={
            item.images?.[0] ||
            'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-featured-product-shot.jpg'
          }
          className="size-24 rounded-md object-cover object-center sm:size-48"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <div className="flex justify-between">
              <h3 className="text-sm">
                <a
                  href={`/producto-detalle/${item._id}`}
                  className="font-medium text-gray-700 hover:text-gray-800"
                >
                  {item.name}
                </a>
              </h3>
            </div>
            <p className="mt-1 text-sm font-medium text-gray-900">{`Bs. ${item.bsPrice}`}</p>
          </div>

          <div className="mt-4 sm:mt-0 sm:pr-9">
            <label htmlFor={`quantity-${item.id}`} className="sr-only">
              Quantity, {item.name}
            </label>
            <AmountSelector
              maxQuantity={item.inventary?.total}
              quantity={item.quantity}
              productId={item.id}
              productName={item.name}
              onChange={handleQuantityChange}
            />

            <div className="absolute right-0 top-0">
              <Button
                type="button"
                plain
                className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                onClick={handleRemoveFromCart}
              >
                <span className="sr-only">Remove</span>
                <XMarkIcon aria-hidden="true" className="size-5" />
              </Button>
            </div>
          </div>
        </div>

        <p className="mt-4 flex space-x-2 text-sm text-gray-700">
          {item.inventary?.total > 0 ? (
            <CheckIcon aria-hidden="true" className="size-5 shrink-0 text-green-500" />
          ) : (
            <ClockIcon aria-hidden="true" className="size-5 shrink-0 text-gray-300" />
          )}
          {/* Needs to be changed for a real number */}
          <span>{item.inventary?.total > 0 ? 'En stock' : 'Agotado'}</span>
        </p>
      </div>
    </li>
  );
}
