import { Button, Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { Controller, useForm } from 'react-hook-form';
import { LabeledInput } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { CashbackSchema, CashbackSchemaType, PaymentMethod } from '@/schemas/create-order-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { dniTypes } from '@/lib/utils';
import { DialogActions } from '../ui/dialog';
import { BANKS } from '@/constants/banks';

interface CashbackModalProps {
  open: boolean;
  onClose: () => void;
  amount: number;
  currency: 'USD' | 'Bs';
  previousData: PaymentMethod;
  onNext: (form: any, data: CashbackSchemaType) => void;
}

export function CashbackModal({
  open,
  onClose,
  amount,
  currency,
  previousData,
  onNext,
}: CashbackModalProps) {
  const form = useForm<CashbackSchemaType>({
    resolver: zodResolver(CashbackSchema),
  });

  const onSubmit = (data: CashbackSchemaType) => {
    onClose();
    onNext(previousData, data);
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/50 transition-opacity data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
            <h2 className="text-lg font-semibold text-gray-900">Datos para el vuelto</h2>
            <p className="mt-2 text-sm text-gray-500">
              Ingresa los datos para poder enviarte el vuelto por Pago Móvil
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <p className="text-sm">
                  Monto a recibir:{' '}
                  <span className="font-semibold">
                    {currency === 'USD' ? '$' : 'Bs.'} {amount}
                  </span>
                </p>
              </div>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
                <Controller
                  control={form.control}
                  name="banco"
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <div>
                      <label htmlFor="banco" className="block text-sm font-semibold mb-1">
                        Banco
                      </label>
                      <Select id="banco" value={value} onChange={onChange} className="w-full">
                        <option value="">Selecciona tu banco</option>
                        {BANKS.map((bank) => (
                          <option key={bank.value} value={bank.value}>
                            {bank.label}
                          </option>
                        ))}
                      </Select>
                      {error && <p className="mt-1 text-xs text-red-400">{error.message}</p>}
                    </div>
                  )}
                />

                <div className="flex flex-row gap-2">
                  <Controller
                    control={form.control}
                    name="cedula"
                    render={({ field, fieldState: { error } }) => (
                      <div className="w-1/4">
                        <label
                          htmlFor="dniType"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Tipo de DNI
                        </label>
                        <Select
                          {...field}
                          value={
                            dniTypes.find((t) => field.value?.startsWith(t.value))?.value ||
                            dniTypes[0].value
                          }
                          onChange={(e) => {
                            const newType = e.target.value;
                            const currentValue = field.value || '';
                            // Remove any existing DNI type prefix and add the new one
                            const numericPart = currentValue.replace(/^[VEJGPvejgp]+/i, '');
                            field.onChange(newType + numericPart);
                          }}
                          id="dniType"
                        >
                          {dniTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </Select>
                      </div>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="cedula"
                    render={({
                      field: { onChange, onBlur, value, name },
                      fieldState: { error },
                    }) => (
                      <LabeledInput
                        className="w-3/4"
                        error={error?.message}
                        labelProps={{
                          htmlFor: 'dni',
                        }}
                        inputProps={{
                          onChange: (e) => {
                            const currentType =
                              dniTypes.find((t) => value?.startsWith(t.value))?.value ||
                              dniTypes[0].value;
                            const newValue = e.target.value.replace(/\D/g, '');
                            onChange(currentType + newValue);
                          },
                          onBlur,
                          id: name,
                          name: name,
                          value: value?.replace(/^[VEJGPvejgp]+/i, ''),
                          type: 'text',
                          autoComplete: 'dni',
                        }}
                        label="DNI"
                      />
                    )}
                  />
                </div>

                <Controller
                  control={form.control}
                  name="telefono"
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <LabeledInput
                      label="Número de teléfono"
                      error={error?.message}
                      inputProps={{
                        placeholder: 'Ingresa tu teléfono',
                        value,
                        onChange,
                      }}
                      labelProps={{ className: 'text-sm font-semibold' }}
                    />
                  )}
                />
                <DialogActions>
                  <Button className="w-full bg-primary px-4 py-2 rounded-lg" type="submit">
                    <span className="text-white font-semibold text-sm">Finalizar Orden</span>
                  </Button>
                </DialogActions>
              </form>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
