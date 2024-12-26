import CheckoutSection from '@/components/checkout/CheckoutSection';
import { Button } from '@/components/ui/button';
import { LabeledInput } from '@/components/ui/input';
import {
  ContactInformationSchema,
  contactInformationSchema,
} from '@/schemas/contact-information-schema';
import { FormState } from '@/types/forms';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export function ContactInformation({ ...data }: ContactInformationSchema) {
  const { control } = useForm({
    resolver: zodResolver(contactInformationSchema),
    defaultValues: {
      email: data.email || '',
      phone: data.phone || '',
      dni: data.dni || '',
      dniType: data.dniType || '',
    },
  });

  return (
    <section className="flex flex-col gap-4 min-w-full">
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
          <LabeledInput
            inputProps={{
              id: name,
              name: name,
              type: 'email',
              onChange,
              onBlur,
              value,
              autoComplete: 'email',
            }}
            label="Email address"
            labelProps={{ htmlFor: 'email-address' }}
            error={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
          <LabeledInput
            inputProps={{
              id: name,
              name: name,
              type: 'tel',
              onChange,
              onBlur,
              value,
              autoComplete: 'phone',
            }}
            label="Phone number"
            labelProps={{ htmlFor: 'phone-number' }}
            error={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="dni"
        render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
          <LabeledInput
            inputProps={{
              id: name,
              name: name,
              type: 'text',
              onChange,
              onBlur,
              value,
              autoComplete: 'dni',
            }}
            label="DNI"
            labelProps={{ htmlFor: 'dni' }}
            error={error?.message}
          />
        )}
      />
      <div className="flex justify-end">
        <Button>Continue</Button>
      </div>
    </section>
  );
}
