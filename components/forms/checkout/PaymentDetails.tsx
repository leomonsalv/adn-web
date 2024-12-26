import CheckoutSection from '@/components/checkout/CheckoutSection';
import { PaymentMethodSelector } from '@/components/checkout/PaymentMethodSelector';
import { PaymentToggle } from '@/components/checkout/PaymentToggle';
import { LabeledInput } from '@/components/ui/input';
import useCheckout from '@/hooks/use-checkout';
import { FormState } from '@/types/forms';
import { useState } from 'react';

interface PaymentDetailsProps {
  name?: string;
  cardNumber?: string;
  expirationDate?: string;
  cvc?: string;
  errors?: FormState['errors'];
}

export function PaymentDetails({
  name,
  cardNumber,
  expirationDate,
  cvc,
  errors,
}: PaymentDetailsProps) {
  const [paymentType, setPaymentType] = useState<'simple' | 'mixed'>('simple');
  const { useGetPaymentMethods } = useCheckout();
  const { data, isLoading, isError } = useGetPaymentMethods();

  return (
    <div>
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
