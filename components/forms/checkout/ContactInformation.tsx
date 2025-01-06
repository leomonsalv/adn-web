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
import { useUser } from '@/hooks/use-user';

export function ContactInformation({
  name,
  email,
  dni,
  dniType,
}: Partial<ContactInformationSchema>) {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(contactInformationSchema),
    defaultValues: {
      name: name || '',
      email: email || '',
      dni: dni || '',
      dniType: dniType || '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <section className="flex flex-col gap-4">
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
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
              label="Dirección de correo"
              labelProps={{ htmlFor: 'email-address' }}
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
            <LabeledInput
              inputProps={{
                id: name,
                name: name,
                onChange,
                onBlur,
                value,
                autoComplete: 'name',
              }}
              label="Nombre Completo"
              labelProps={{ htmlFor: 'name' }}
              error={error?.message}
            />
          )}
        />

        <div className="flex flex-row gap-2">
          <Controller
            control={control}
            name="dniType"
            render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
              <LabeledInput
                className="w-1/4"
                labelProps={{
                  htmlFor: 'dniType',
                }}
                inputProps={{
                  id: 'dniType',
                  name: 'dniType',
                  onChange,
                  onBlur,
                  value,
                  autoComplete: 'dniType',
                }}
                label="Tipo de DNI"
                error={error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="dni"
            render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
              <LabeledInput
                className="w-3/4"
                error={error?.message}
                labelProps={{
                  htmlFor: 'dni',
                }}
                inputProps={{
                  onChange,
                  onBlur,
                  id: name,
                  name: name,
                  value,
                  type: 'text',
                  autoComplete: 'dni',
                }}
                label="DNI"
              />
            )}
          />
        </div>

        <div className="flex self-start">
          <Button type="submit">Continuar con el envío</Button>
        </div>
      </form>
    </section>
  );
}
