import { Controller, useFormContext } from 'react-hook-form';
import { LabeledInput } from '@/components/ui/input';

export const CashDetails = ({ totalUsd }: { totalUsd: number }) => {
  const form = useFormContext();

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-2">
        <h6 className="text-sm font-semibold">Pagos por Efectivo</h6>
        <h5 className="text-base font-semibold">¿Con cuánto dinero vas a pagar?</h5>
        <p className="text-sm">
          Recuerda que el valor del pedido es de &nbsp;
          <span className="font-semibold">${totalUsd.toFixed(2)}</span> USD y el vuelto se da por
          Pago Móvil.
        </p>
      </div>
      <div className="flex flex-col">
        <Controller
          control={form.control}
          name="details.bills.0.amount"
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { error },
            formState: { errors },
          }) => (
            <LabeledInput
              ref={ref}
              error={
                error?.message || (errors?.details as unknown as any)?.bills?.[0]?.root?.message
              }
              label="Ingresa el monto de efectivo"
              inputProps={{
                placeholder: 'Ingresa el monto',
                onChange: (e) => onChange(Number(e.target.value.replace(/[^-?\d]/g, ''))),
                onBlur: onBlur,
                value: value,
                name: name,
                type: 'text',
              }}
              labelProps={{ className: 'text-sm font-semibold' }}
            />
          )}
        />
      </div>
    </div>
  );
};
