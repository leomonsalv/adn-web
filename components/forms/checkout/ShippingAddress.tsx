import CheckoutSection from '@/components/checkout/CheckoutSection';
import { LabeledInput } from '@/components/ui/input';
import { FormState } from '@/types/forms';

interface ShippingAddressProps {
  shippingAddress?: string;
  address?: string;
  apartment?: string;
  city?: string;
  state?: string;
  postal?: string;
  errors?: FormState['errors'];
}

export function ShippingAddress({
  shippingAddress,
  address,
  apartment,
  city,
  state,
  postal,
  errors,
}: ShippingAddressProps) {
  return (
    <section className="flex flex-col gap-4 min-w-full">
      <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
        <div className="sm:col-span-3">
          <LabeledInput
            label="Company"
            inputProps={{
              id: 'company',
              name: 'company',
              defaultValue: shippingAddress,
              type: 'text',
            }}
            labelProps={{
              htmlFor: 'company',
            }}
            error={errors?.shippingAddress}
          />
        </div>

        <div className="sm:col-span-3">
          <LabeledInput
            label="Address"
            inputProps={{
              id: 'address',
              name: 'address',
              defaultValue: address,
              type: 'text',
            }}
            labelProps={{
              htmlFor: 'address',
            }}
            error={errors?.address}
          />
        </div>

        <div className="sm:col-span-3">
          <LabeledInput
            label="Apartment, suite, etc."
            inputProps={{
              id: 'apartment',
              name: 'apartment',
              defaultValue: apartment,
              type: 'text',
            }}
            labelProps={{
              htmlFor: 'apartment',
            }}
            error={errors?.apartment}
          />
        </div>

        <div>
          <LabeledInput
            label="City"
            inputProps={{
              id: 'city',
              name: 'city',
              defaultValue: city,
              type: 'text',
            }}
            labelProps={{
              htmlFor: 'city',
            }}
            error={errors?.city}
          />
        </div>

        <div>
          <LabeledInput
            label="State / Province"
            inputProps={{
              id: 'region',
              name: 'region',
              defaultValue: state,
              type: 'text',
            }}
            labelProps={{
              htmlFor: 'region',
            }}
            error={errors?.state}
          />
        </div>

        <div>
          <LabeledInput
            label="Postal code"
            inputProps={{
              id: 'postal-code',
              name: 'postal-code',
              defaultValue: postal,
              type: 'text',
            }}
            labelProps={{
              htmlFor: 'postal-code',
            }}
            error={errors?.postal}
          />
        </div>
      </div>
    </section>
  );
}
