import { useCallback } from 'react';

import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { Method } from '@/schemas/payment-method-schema';
import {
  Accordion,
  AccordionContent,
  AccordionTriggerContent,
  AccordionItem,
} from '../ui/accordion';
import { useCartStore } from '@/stores/cart-store';
import { useFormContext } from 'react-hook-form';
import type { PaymentMethodType, PaymentMethod } from '@/schemas/create-order-schema';
import { getInitialPaymentState } from '@/hooks/use-checkout';
import { ZelleDetails } from './paymentMethods/ZelleDetails';
import { CashDetails } from './paymentMethods/CashDetails';
import { BinanceDetails } from './paymentMethods/BinanceDetails';
import { BolivarCashDetails } from './paymentMethods/BolivarCashDetails';
import { MotoPosDetails } from './paymentMethods/MotoPosDetails';
import { BotonBanescoDetails } from './paymentMethods/BotonBanescoDetails';
import { PaypalDetails } from './paymentMethods/PaypalDetails';
import { TdcveDetails } from './paymentMethods/TdcveDetails';
import { CreditDetails } from './paymentMethods/CreditDetails';
import { PreCreditDetails } from './paymentMethods/PreCreditDetails';
import { VippoDetails } from './paymentMethods/VippoDetails';
import { PagoMovilDetails } from './paymentMethods/PagoMovilDetails';
import { BncPosDetails } from './paymentMethods/BncPosDetails';
import { Radio, RadioField, RadioGroup } from '../ui/radio';
import useUser from '@/hooks/use-user';

interface PaymentMethodSelectorProps {
  paymentMethods: Method[];
  selectedMethod: PaymentMethodType | undefined;
  setSelectedMethod: (value: PaymentMethodType) => void;
}

export function PaymentMethodSelector({
  paymentMethods,
  selectedMethod,
  setSelectedMethod,
}: PaymentMethodSelectorProps) {
  const form = useFormContext<PaymentMethod>();

  const { getCartRef, getCartTotal } = useCartStore();
  const { user } = useUser();

  const totalUsd = getCartRef();
  const totalBs = getCartTotal();

  const handleRadioChange = useCallback(
    (value: PaymentMethodType) => {
      setSelectedMethod(value);
      // Get the initial state for the payment method
      const method = paymentMethods.find((m) => m.value === value);
      const requiresAmount = ['cash', 'bolivarCash'].includes(value);
      const currency = method?.currency ?? 'Bs';
      const initialState = getInitialPaymentState({
        paymentType: value,
        requiresAmount,
        currency,
        totalUsd,
        totalBs,
        userEmail: user?.data?.email!,
      });

      // Reset the form with the initial state
      form.reset({
        isConfirmed: true,
        ...initialState,
      } as PaymentMethod);
    },
    [paymentMethods, form, totalUsd, totalBs, user?.data?.email],
  );

  const showPaymentDetails = useCallback(
    (method: Method) => {
      const detailProps = {
        totalUsd,
        totalBs,
        form,
      };

      const creditAvailable = user?.data?.wallet?.credit ?? 0;
      const preCreditAvailable = user?.data?.preWallet?.credit ?? 0;

      const detailsMap: Record<PaymentMethodType, React.ReactNode> = {
        zelle: <ZelleDetails {...detailProps} />,
        cash: <CashDetails {...detailProps} />,
        bolivarCash: <BolivarCashDetails {...detailProps} />,
        motopos: <MotoPosDetails {...detailProps} />,
        mBinance: <BinanceDetails {...detailProps} qr={method.qr ?? ''} />,
        pagomovil: <PagoMovilDetails {...detailProps} />,
        binance: <BinanceDetails {...detailProps} qr={method.qr ?? ''} />,
        ...(creditAvailable > 0 && {
          credit: <CreditDetails {...detailProps} creditAvailable={creditAvailable} />,
        }),
        tdcve: <TdcveDetails {...detailProps} />,
        paypal: <PaypalDetails {...detailProps} />,
        botonbanesco: <BotonBanescoDetails {...detailProps} />,
        bncPos: <BncPosDetails {...detailProps} />,
        ...(preCreditAvailable > 0 && {
          preCredit: <PreCreditDetails {...detailProps} creditAvailable={preCreditAvailable} />,
        }),
        vippo: <VippoDetails {...detailProps} />,
      };

      return detailsMap[method.value] ?? null;
    },
    [totalUsd, totalBs, form],
  );

  // Filter out REI, Billetera, and TDC Vippo payment methods if user is not logged in
  const filteredPaymentMethods = paymentMethods.filter((method) => {
    // If user is not logged in, hide these payment methods
    if (!user?.data) {
      return !['preCredit', 'credit', 'vippo'].includes(method.value);
    }
    return true;
  });

  return (
    <Accordion
      type="single"
      value={selectedMethod}
      onValueChange={handleRadioChange}
      onKeyDown={(e) => {
        if (!(e.target instanceof HTMLInputElement)) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      className="flex flex-col w-full border rounded-lg"
    >
      {filteredPaymentMethods.map((method, index) => (
        <AccordionItem key={method.value} value={method.value} className="border-0 focus:ring-0">
          <Card
            className={cn(
              'border-0 rounded-none focus:ring-0 shadow-none bg-transparent mt-0',
              selectedMethod === method.value || paymentMethods.length - 1 !== index
                ? 'border-b'
                : '',
            )}
          >
            <AccordionTriggerContent className="flex w-full px-4 py-3 items-center justify-between">
              <div className="flex items-center justify-between w-full">
                <div className="flex gap-x-3 items-center">
                  <RadioGroup value={selectedMethod} onChange={handleRadioChange}>
                    <RadioField>
                      <Radio value={method.value} />
                    </RadioField>
                  </RadioGroup>

                  {method.icon && (
                    <Image src={method.icon} alt={method.name} width={24} height={24} />
                  )}
                  <span className="font-medium">{method.name}</span>
                </div>
              </div>
            </AccordionTriggerContent>
          </Card>
          <AccordionContent className={cn('px-3 border-b bg-gray-50')}>
            <div className="flex flex-col gap-y-4 px-2 pt-4 pb-2">{showPaymentDetails(method)}</div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
