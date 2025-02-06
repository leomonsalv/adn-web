import { Button } from '@/components/ui/button';
import { LabeledInput } from '@/components/ui/input';
import {
  ContactInformationSchema,
  contactInformationSchema,
} from '@/schemas/contact-information-schema';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { dniTypes } from '@/lib/utils';
import { Select } from '@/components/ui/select';

interface ContactInformationProps extends Partial<ContactInformationSchema> {
  onSubmit: (data: ContactInformationSchema) => void;
}

export function ContactInformation({
  name,
  email,
  dni,
  dniType,
  onSubmit,
}: ContactInformationProps) {
  console.log(name, email, dni, dniType);
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(contactInformationSchema),
    defaultValues: {
      name: name || '',
      email: email || '',
      dni: dni || '',
      dniType: dniType || 'V',
    },
  });

  return (
    <section className="flex flex-col gap-4">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
            render={({ field, fieldState: { error } }) => (
              <div className="w-1/4">
                <label htmlFor="dniType" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de DNI
                </label>
                <Select {...field} id="dniType">
                  {dniTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </Select>
                {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
              </div>
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
