import { PaymentMethodSelector } from '@/components/checkout/PaymentMethodSelector';
import { PaymentToggle } from '@/components/checkout/PaymentToggle';
import useCheckout, { getInitialPaymentState } from '@/hooks/use-checkout';

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
import PaymentMixed from '@/components/checkout/PaymentMixed';
import { useRouter } from 'next/navigation';
import { PaymentsModal } from '@/components/checkout/PaymentsModal';
import useCheckoutPreferences from '@/hooks/use-checkout-preferences';
import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  PaymentMethodType,
  PaymentMethod,
  PaymentMethodSchema,
  CashbackSchemaType,
} from '@/schemas/create-order-schema';

export function PaymentDetails() {
  const router = useRouter();
  const [paymentType, setPaymentType] = useState<'simple' | 'mixed'>('simple');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>();
  const [cashbackModal, setCashbackModal] = useState(false);
  const [vippoModal, setVippoModal] = useState(false);
  const [pagoMix, setPagoMix] = useState<any>(null);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const { user, isLoading } = useUser();
  const { useGetPaymentMethods, useValidateVippo } = useCheckout();
  const { useCreateOrder } = useOrders();
  const { data: paymentMethods, isLoading: isLoadingPaymentMethods } = useGetPaymentMethods();
  const { mutateAsync: createOrder, isPending: isCreatingOrder } = useCreateOrder();
  const { mutateAsync: validateVippo, isPending: isLoadingVippo } = useValidateVippo();
  const { getCartRef, getCartTotal, clearCart } = useCartStore();
  const { toast } = useToast();
  const { useSaveCheckoutPreferences, useGetCheckoutPreferences } = useCheckoutPreferences();
  const { mutateAsync: saveCheckoutPreferences } = useSaveCheckoutPreferences();
  const { data: savedPreferences, isLoading: isLoadingPreferences } = useGetCheckoutPreferences();

  const totalUsd = getCartRef();
  const totalBs = getCartTotal();
  const usd = parseFloat((totalBs / totalUsd).toFixed(2));

  const form = useForm<PaymentMethod>({
    resolver: zodResolver(PaymentMethodSchema),
  });

  const onSubmit = async (data: PaymentMethod, cashbackData?: CashbackSchemaType) => {
    try {
      if (
        (data.type === 'cash' || data.type === 'bolivarCash') &&
        !cashbackData &&
        !cashbackModal
      ) {
        setCashbackModal(true);
        return;
      }

      const newOrder = {
        methods: [data],
        cashbackData,
      };

      const response: any = await createOrder(newOrder);

      // Save payment method preference if user is logged in
      if (user && !user.isAnonymous) {
        try {
          await saveCheckoutPreferences({
            preferredPaymentMethod: data.type,
          });
        } catch (prefError) {
          console.error('Error saving payment preferences:', prefError);
          // Don't block the order completion if saving preferences fails
        }
      }

      clearCart();
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

  const mapPayments = (method: string, amount: number) => {
    const map: any = {
      Cash: 'cash',
      'Bolívares en Efectivo': 'bolivarCash',
      'Punto de Venta': 'motopos',
      'Billetera Adan': 'credit',
      REI: 'preCredit',
    };
    if (method === 'Cash' || 'Bolívares en Efectivo') {
      return {
        isConfirmed: true,
        type: map[method],
        details: {
          bills: [{ amount: amount, code: '4ef7ec97-8a26-4dfd-a3a0-5fec582969c9' }],
          comments: '',
        },
      };
    } else if (method === 'Punto de Venta' || method === 'Billetera Adan' || method === 'REI') {
      return {
        isConfirmed: true,
        type: map[method],
        details: {
          amount: amount,
        },
      };
    }
  };

  const handleSubmitMixed = async (
    data: any,
    setPagoMovil?: boolean,
    cashbackData?: CashbackSchemaType,
  ) => {
    if (cashbackData) {
      const newOrder: any = {
        methods: [
          mapPayments(pagoMix.method1, pagoMix.amount1),
          mapPayments(pagoMix.method2, pagoMix.amount2),
        ],
        cashbackData: data,
      };
      const response: any = await createOrder(newOrder);

      // Save first payment method preference if user is logged in
      if (user && !user.isAnonymous) {
        try {
          const method1Type = mapPayments(pagoMix.method1, pagoMix.amount1)?.type;
          if (method1Type) {
            await saveCheckoutPreferences({
              preferredPaymentMethod: method1Type as PaymentMethodType,
            });
          }
        } catch (prefError) {
          console.error('Error saving payment preferences:', prefError);
        }
      }

      clearCart();
      router.push(`/gracias?data=${encodeURIComponent(JSON.stringify(response.data))}`);
    } else {
      if (!setPagoMovil) {
        const isPagoMovil = data.method1 === 'Pago Movil' || data.method2 === 'Pago Movil';
        if (isPagoMovil) setPagoMix({ ...data, isPagoMovil });
        else {
          if (handleActiveCashback(data)) {
            setCashbackModal(true);
          } else {
            console.log('Aqui va el create');
            const newOrder: any = {
              methods: [
                mapPayments(data.method1, data.amount1),
                mapPayments(data.method2, data.amount2),
              ],
            };
            const response: any = await createOrder(newOrder);

            // Save first payment method preference if user is logged in
            if (user && !user.isAnonymous) {
              try {
                const method1Type = mapPayments(data.method1, data.amount1)?.type;
                if (method1Type) {
                  await saveCheckoutPreferences({
                    preferredPaymentMethod: method1Type as PaymentMethodType,
                  });
                }
              } catch (prefError) {
                console.error('Error saving payment preferences:', prefError);
              }
            }

            clearCart();
            router.push(`/gracias?data=${encodeURIComponent(JSON.stringify(response.data))}`);
          }
        }
      } else {
        const item = pagoMix.method1 === 'Pago Movil' ? pagoMix.method1 : pagoMix.method2;
        const amount = pagoMix.method1 === 'Pago Movil' ? pagoMix.amount1 : pagoMix.amount2;

        const newOrder = {
          methods: [data, mapPayments(item, amount)],
        };
        const response: any = await createOrder(newOrder);

        // Save pagomovil payment method preference if user is logged in
        if (user && !user.isAnonymous) {
          try {
            await saveCheckoutPreferences({
              preferredPaymentMethod: 'pagomovil',
            });
          } catch (prefError) {
            console.error('Error saving payment preferences:', prefError);
          }
        }

        clearCart();
        router.push(`/gracias?data=${encodeURIComponent(JSON.stringify(response.data))}`);
      }
    }
  };

  // Load initial payment method and saved preferences
  useEffect(() => {
    if (!isLoadingPaymentMethods && paymentMethods && !isLoadingPreferences) {
      // Check if there's a saved preferred payment method
      let preferredMethod = savedPreferences?.preferredPaymentMethod;

      // If there's a preferred method and it's available in current payment methods
      if (preferredMethod) {
        // Find the payment method in the available methods
        const methodExists = paymentMethods.some((method) => method.value === preferredMethod);

        if (methodExists) {
          // Set the selected method
          setSelectedMethod(preferredMethod);

          // Get the method details
          const method = paymentMethods.find((m) => m.value === preferredMethod);
          const requiresAmount = ['cash', 'bolivarCash'].includes(preferredMethod);
          const currency = method?.currency ?? 'Bs';

          // Initialize the form with the preferred payment method
          const initialState = getInitialPaymentState({
            paymentType: preferredMethod,
            requiresAmount,
            currency,
            totalUsd,
            totalBs,
            userEmail: user?.data?.email || '',
          });

          // Reset the form with the initial state
          form.reset({
            isConfirmed: true,
            ...initialState,
          } as PaymentMethod);
        }
      }
    }
  }, [
    isLoadingPaymentMethods,
    paymentMethods,
    isLoadingPreferences,
    savedPreferences,
    totalUsd,
    totalBs,
    user?.data?.email,
    form,
  ]);

  const handleActiveCashback = (data: any) => {
    let totalAmount = 0;
    const method1 = paymentMethods?.find((t) => t.name === data.method1);
    const method2 = paymentMethods?.find((t) => t.name === data.method2);
    if (method1?.currency === 'USD') {
      totalAmount = totalAmount + data.amount1 * usd;
    } else if (method1?.currency === 'Bs') {
      totalAmount = totalAmount + data.amount1;
    }

    if (method2?.currency === 'USD') {
      totalAmount = totalAmount + data.amount2 * usd;
    } else if (method1?.currency === 'Bs') {
      totalAmount = totalAmount + data.amount1;
    }
    setTotalAmount(totalAmount);
    return totalAmount > totalBs;
  };

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
      ) : paymentMethods ? (
        <PaymentMixed
          paymentMethods={paymentMethods}
          handleSubmit={handleSubmitMixed}
          isCreatingOrder={isCreatingOrder}
        />
      ) : (
        <>Loading</>
      )}
      {cashbackModal && (
        <CashbackModal
          open={cashbackModal}
          onClose={() => setCashbackModal(false)}
          amount={pagoMix ? totalAmount - totalBs : selectedMethod === 'cash' ? totalUsd : totalBs}
          currency={selectedMethod === 'cash' ? 'USD' : 'Bs'}
          onNext={(data, cashbackData) => {
            if (pagoMix) {
              handleSubmitMixed(null, false, data);
            } else {
              onSubmit(data, cashbackData);
            }
          }}
          previousData={form.getValues()}
        />
      )}
      {pagoMix?.isPagoMovil && (
        <PaymentsModal
          open={pagoMix.isPagoMovil}
          onClose={() => setPagoMix({ ...pagoMix, isPagoMovil: false })}
          onNext={handleSubmitMixed}
          pagoMix={pagoMix}
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
