import * as React from 'react';
import { LabeledInput } from '../ui/input';
import { Button } from '@/components/ui/button';
import useCart from '@/hooks/use-cart';
import { toast } from '@/hooks/use-toast';
import { useCartStore } from '@/stores/cart-store';
import { X } from 'lucide-react';
import Tags from '../../public/icons/discount.svg';
import Image from 'next/image';

export const Coupon = () => {
  const { useValidateCoupon } = useCart();
  const { setCouponData, couponData } = useCartStore();
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

  const handleRemoveCoupon = () => {
    setCouponData(null);
    setValue('');
  };
  return (
    <>
      <dl className="space-y-6 border-t border-gray-200 py-6 text-sm font-medium text-gray-900 lg:block">
        <div className="flex flex-col gap-2">
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
                disabled: isLoadingCoupon || !!couponData,
                value: value,
              }}
              labelProps={{
                htmlFor: 'coupon',
              }}
              className="w-full"
            />
            <div>
              <Button
                onClick={handleCheckCoupon}
                disabled={value === '' || isLoadingCoupon || !!couponData}
                className="w-full h-[36px] cursor-pointer"
              >
                Aplicar
              </Button>
            </div>
          </div>
          {couponData && (
            <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg w-fit">
              <Image src={Tags} alt="Descuento" className="w-5 h-5" />
              <span className="text-gray-900 font-medium">{couponData.code}</span>
              <button
                onClick={() => {
                  handleRemoveCoupon();
                }}
                className="text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
          )}
        </div>
      </dl>
    </>
  );
};
