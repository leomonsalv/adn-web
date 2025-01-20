import CheckoutSection from '@/components/checkout/CheckoutSection';
import { LabeledCheckbox } from '@/components/ui/checkbox';
import { FormState } from '@/types/forms';

interface BillingInformationProps {
  rememberBilling?: boolean;
  errors?: FormState['errors'];
}

export function BillingInformation({ rememberBilling, errors }: BillingInformationProps) {
  return (
    <CheckoutSection title="Billing information" className="mt-10">
      <div className="mt-6 flex items-center">
        <LabeledCheckbox
          checkboxProps={{
            id: 'same-as-shipping',
            name: 'same-as-shipping',
            defaultValue: rememberBilling?.toString(),
          }}
          label="Same as shipping information"
          labelProps={{ htmlFor: 'same-as-shipping' }}
          error={errors?.rememberBilling}
        />
      </div>
    </CheckoutSection>
  );
}
