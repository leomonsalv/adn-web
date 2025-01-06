import CheckoutSection from '@/components/checkout/CheckoutSection';
import { PaymentMethodSelector } from '@/components/checkout/PaymentMethodSelector';
import { PaymentToggle } from '@/components/checkout/PaymentToggle';
import { LabeledInput } from '@/components/ui/input';
import useCheckout from '@/hooks/use-checkout';
import { FormState } from '@/types/forms';
import { useState } from 'react';

export function PaymentDetails() {
  const [paymentType, setPaymentType] = useState<'simple' | 'mixed'>('simple');
  const { useGetPaymentMethods } = useCheckout();
  const { data, isLoading, isError } = useGetPaymentMethods();

  return (
    <div className="flex flex-col gap-y-6">
      <PaymentToggle
        value={paymentType}
        onChange={(value) => {
          setPaymentType(value);
        }}
      />

      {data && <PaymentMethodSelector paymentMethods={data} />}
    </div>
  );
}
