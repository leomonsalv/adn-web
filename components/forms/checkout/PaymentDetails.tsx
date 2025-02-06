import { PaymentMethodSelector } from '@/components/checkout/PaymentMethodSelector';
import { PaymentToggle } from '@/components/checkout/PaymentToggle';
import useCheckout, { getInitialPaymentState } from '@/hooks/use-checkout';
import {
  type CashbackSchemaType,
  type PaymentMethod,
  PaymentMethodSchema,
  type PaymentMethodType,
} from '@/schemas/create-order-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useCartStore } from '@/stores/cart-store';
import { LockClosedIcon } from '@heroicons/react/20/solid';
import { Button } from '@/components/ui/button';
import useOrders from '@/hooks/use-orders';
import { VippoModal } from '@/components/checkout/VippoModal';
import { CashbackModal } from '@/components/checkout/CashbackModal';
import { PaymentDetailsSkeleton } from '@/components/skeletons/PaymentMethodsSkeleton';
import { Loader2 } from 'lucide-react';
import useUser from '@/hooks/use-user';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export function PaymentDetails() {
  const router = useRouter();
  const [paymentType, setPaymentType] = useState<'simple' | 'mixed'>('simple');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>();
  const [cashbackModal, setCashbackModal] = useState(false);
  const [vippoModal, setVippoModal] = useState(false);

  const { user, isLoading } = useUser();
  const { useGetPaymentMethods, useValidateVippo } = useCheckout();
  const { useCreateOrder } = useOrders();
  const { data: paymentMethods, isLoading: isLoadingPaymentMethods } = useGetPaymentMethods();
  const { mutateAsync: createOrder, isPending: isCreatingOrder } = useCreateOrder();
  const { mutateAsync: validateVippo, isPending: isLoadingVippo } = useValidateVippo();
  const { getCartRef, getCartTotal } = useCartStore();
  const { toast } = useToast();

  const totalUsd = getCartRef();
  const totalBs = getCartTotal();

  const form = useForm<PaymentMethod>({
    resolver: zodResolver(PaymentMethodSchema),
  });

  const onSubmit = async (data: PaymentMethod, cashbackData?: CashbackSchemaType) => {
    try {
      if ((data.type === 'cash' || data.type === 'bolivarCash') && !cashbackData) {
        setCashbackModal(true);
        return;
      }

      const newOrder = {
        methods: [data],
        cashbackData,
      };

      const response: any = await createOrder(newOrder);
      router.push(`/gracias?data=${encodeURIComponent(JSON.stringify(response.data))}`);
    } catch (error) {
      throw new Error('Error creating order');
    }
  };

  const handleSubmit = form.handleSubmit(async (data) => {
    let newData: any = data;
    if (data.type === 'vippo') {
      try {
        const splitVencimiento = newData?.details?.expiration?.split('/');
        const expirationMonth = splitVencimiento[0];
        const expirationYear = splitVencimiento[1];
        const preNewData = {
          ...newData,
          details: {
            ...newData.details,
            vencimiento: {
              mes: expirationMonth,
              ano: expirationYear,
            },
            cardNumber: newData.details.cardNumber.replace(/ /g, ''),
          },
        };
        delete preNewData.details.expiration;
        await validateVippo(preNewData);
        newData = preNewData;
      } catch (error) {
        console.log(error);
        const errorObject = JSON.parse((error as Error)?.message || '{}');
        if (errorObject.error?.details?.resultCredicardServices?.cardInfo?.pinRequired) {
          setVippoModal(true);
        } else {
          toast({
            title: 'Verificación fallida',
            description: 'Por favor revisa tus datos.',
            variant: 'destructive',
          });
        }
        return;
      }
    }
    onSubmit(newData);
  });

  useEffect(() => {
    if (!isLoadingPaymentMethods && paymentMethods) {
      // Get the initial state for the payment method
      const newMethod = paymentMethods.find((method) => method.value === 'cash')?.value!;
      const newCurrency = paymentMethods.find((method) => method.value === 'cash')?.currency!;
      const newRequiresAmount = newMethod === 'cash' || newMethod === 'bolivarCash';

      // Set the selected method
      setSelectedMethod(newMethod);

      // Reset the form with the initial state
      form.reset({
        isConfirmed: true,
        ...getInitialPaymentState({
          paymentType: newMethod,
          requiresAmount: newRequiresAmount,
          currency: newCurrency,
          totalUsd,
          totalBs,
          userEmail: user?.data?.email!,
        }),
      } as PaymentMethod);
    }
  }, [paymentMethods, user?.data?.email]);

  if (isLoadingPaymentMethods || isLoading) return <PaymentDetailsSkeleton />;

  return (
    <div className="flex flex-col gap-y-6">
      <PaymentToggle
        value={paymentType}
        onChange={(value) => {
          setPaymentType(value);
        }}
      />

      {paymentMethods && paymentType === 'simple' ? (
        <FormProvider {...form}>
          <form onSubmit={handleSubmit}>
            <PaymentMethodSelector
              paymentMethods={paymentMethods}
              selectedMethod={selectedMethod}
              setSelectedMethod={setSelectedMethod}
            />
            <span className="text-sm pt-3 text-gray-500 flex items-center gap-x-1">
              <LockClosedIcon className="w-4 h-4" />
              Compra segura y encriptada
            </span>
            <Button className="w-full mt-4 h-14" type="submit" disabled={isCreatingOrder}>
              {isCreatingOrder || isLoadingVippo ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Finalizar orden'
              )}
            </Button>
          </form>
        </FormProvider>
      ) : (
        <></>
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
      {vippoModal && (
        <VippoModal
          open={vippoModal}
          onClose={() => setVippoModal(false)}
          onNext={onSubmit}
          previousData={form.getValues()}
        />
      )}
    </div>
  );
}
