import { PaymentMethodSelector } from '@/components/checkout/PaymentMethodSelector';
import { PaymentToggle } from '@/components/checkout/PaymentToggle';
import useCheckout, { getInitialPaymentState } from '@/hooks/use-checkout';
import {
  CashbackSchemaType,
  PaymentDetailsUnionType,
  PaymentMethod,
  PaymentMethodSchema,
  PaymentMethodType,
} from '@/schemas/create-order-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useCartStore } from '@/stores/cart-store';
import { LockClosedIcon } from '@heroicons/react/20/solid';
import { Button } from '@/components/ui/button';
import useOrders from '@/hooks/use-orders';
import { CashbackModal } from '@/components/checkout/CashbackModal';
import { PaymentDetailsSkeleton } from '@/components/skeletons/PaymentMethodsSkeleton';

export function PaymentDetails() {
  const [paymentType, setPaymentType] = useState<'simple' | 'mixed'>('simple');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>();
  const [cashbackModal, setCashbackModal] = useState(false);

  const { useGetPaymentMethods } = useCheckout();
  const { useCreateOrder } = useOrders();
  const { data: paymentMethods, isLoading, isError } = useGetPaymentMethods();
  const { mutate: createOrder } = useCreateOrder();
  const { getCartRef, getCartTotal } = useCartStore();

  const totalUsd = getCartRef();
  const totalBs = getCartTotal();

  const form = useForm<PaymentMethod>({
    resolver: zodResolver(PaymentMethodSchema),
    defaultValues: {
      isConfirmed: true,
      type: 'cash',
      details: {
        bills: [],
        comments: '',
      },
    },
  });

  const onSubmit = (data: PaymentMethod, cashbackData?: CashbackSchemaType) => {
    try {
      if ((data.type === 'cash' || data.type === 'bolivarCash') && !cashbackData) {
        setCashbackModal(true);
        return;
      }

      const newOrder = {
        methods: [data],
        cashbackData,
      };

      createOrder(newOrder);
    } catch (error) {
      console.log('🚀 ~ onSubmit ~ error:', error);
      throw new Error('Error creating order');
    }
  };

  const handleSubmit = form.handleSubmit((data) => onSubmit(data));

  useEffect(() => {
    if (!isLoading && paymentMethods) {
      const newMethod = paymentMethods.find((method) => method.value === 'cash')?.value!;
      const newCurrency = paymentMethods.find((method) => method.value === 'cash')?.currency!;
      const newRequiresAmount = newMethod === 'cash' || newMethod === 'bolivarCash';

      setSelectedMethod(newMethod);

      form.reset({
        isConfirmed: true,
        ...getInitialPaymentState(newMethod, newRequiresAmount, newCurrency, totalUsd, totalBs),
      } as PaymentMethod);
    }
  }, [paymentMethods]);

  if (isLoading) return <PaymentDetailsSkeleton />;

  return (
    <div className="flex flex-col gap-y-6">
      <PaymentToggle
        value={paymentType}
        onChange={(value) => {
          setPaymentType(value);
        }}
      />

      {paymentMethods && (
        <FormProvider {...form}>
          <form onSubmit={handleSubmit}>
            <PaymentMethodSelector
              paymentMethods={paymentMethods}
              selectedMethod={selectedMethod}
              setSelectedMethod={setSelectedMethod}
            />
            <span className="text-sm pt-3 text-gray-500 flex items-center gap-x-1 items-center">
              <LockClosedIcon className="w-4 h-4" />
              Compra segura y encriptada
            </span>
            <Button className="w-full mt-4 h-14" type="submit">
              Finalizar orden
            </Button>
          </form>
        </FormProvider>
      )}
      {cashbackModal && (
        <CashbackModal
          open={cashbackModal}
          onClose={() => setCashbackModal(false)}
          amount={selectedMethod === 'cash' ? totalUsd : totalBs}
          currency={selectedMethod === 'cash' ? 'USD' : 'Bs'}
          onNext={onSubmit}
          previousData={form.getValues()}
        />
      )}
    </div>
  );
}
