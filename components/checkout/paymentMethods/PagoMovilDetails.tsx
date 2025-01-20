import { LabeledInput } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { BANKS } from '@/constants/banks';
import { dniTypes } from '@/lib/utils';

import { Controller, useFormContext } from 'react-hook-form';

export const PagoMovilDetails = ({ totalBs }: { totalBs: number }) => {
  const form = useFormContext();

  return (
    <div className="flex flex-col gap-y-4">
      <h6 className="text-sm font-semibold">Paga con Pago Móvil</h6>
      <p className="text-sm">
        Ingresa a la plataforma de tu banco y haz un pago por Bs. {totalBs} a los siguientes datos:
      </p>
      <div className="flex flex-col gap-y-1 bg-[#232F3E] p-4 rounded-lg">
        <div>
          <span className="font-semibold text-white">Información bancaria</span>
        </div>
        <div className="flex flex-row justify-between gap-y-1 py-2">
          <span className="text-white">Nombre del banco</span>
          <span className="text-white text-sm font-semibold">Bancamiga</span>
        </div>
        <div className="h-[1px] w-full bg-white" />
        <div className="flex flex-row justify-between gap-y-1 py-2">
          <span className="text-white">Teléfono</span>
          <span className="text-white text-sm font-semibold">0424-1611374</span>
        </div>
        <div className="h-[1px] w-full bg-white" />
        <div className="flex flex-row justify-between gap-y-1 py-2">
          <span className="text-white">RIF</span>
          <span className="text-white text-sm font-semibold">J-500594313</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
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
                <label htmlFor="dniType" className="block text-sm font-medium text-gray-700 mb-1">
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
            render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
              <LabeledInput
                className="w-3/4"
                error={error?.message}
                labelProps={{
                  htmlFor: 'dni',
                }}
                inputProps={{
                  onChange: (e) => {
                    const currentType =
                      dniTypes.find((t) => value?.startsWith(t.value))?.value || dniTypes[0].value;
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
      </div>
    </div>
  );
};
