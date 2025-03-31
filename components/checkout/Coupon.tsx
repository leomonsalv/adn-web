import * as React from 'react';
import { LabeledInput } from '../ui/input';
import { Button } from '@/components/ui/button';
import useCart from '@/hooks/use-cart';
import { toast } from '@/hooks/use-toast';
import { useCartStore } from '@/stores/cart-store';

export const Coupon = () => {
  const { useValidateCoupon } = useCart();
  const { setCouponData } = useCartStore();
  const { mutateAsync: checkCoupon, isPending: isLoadingCoupon } = useValidateCoupon();
  const [value, setValue] = React.useState<string>('');

  const handleCheckCoupon = async () => {
    if (value === '') return;
    try {
      const response: any = await checkCoupon(value);
      setCouponData({ ...response.data, code: value });
    } catch (error) {
      if (error instanceof Error) {
        if ('code' in error && (error as any).message === 'couponNotAvailable') {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'El cupón no está disponible.',
          });
        } else {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: error.message,
          });
        }
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Error desconocido al verificar el cupón',
        });
      }
    }
  };
  return (
    <>
      <dl className="hidden space-y-6 border-t border-gray-200 py-6 text-sm font-medium text-gray-900 lg:block">
        <div className="flex items-center justify-between gap-2">
          <LabeledInput
            label=""
            inputProps={{
              id: 'coupon',
              name: 'coupon',
              type: 'text',
              autoComplete: '',
              placeholder: 'Código de descuento',
              onChange: (e) => setValue(e.target.value),
            }}
            labelProps={{
              htmlFor: 'coupon',
            }}
            className="w-full"
          />
          <div>
            <Button
              onClick={handleCheckCoupon}
              disabled={value === '' || isLoadingCoupon}
              className="w-full h-[36px]"
            >
              Aplicar
            </Button>
          </div>
        </div>
      </dl>
    </>
  );
};
