import { Card, CardContent } from '@/components/ui/card';
import { Controller, useFormContext } from 'react-hook-form';
import { LabeledInput } from '@/components/ui/input';

export const ZelleDetails = ({ totalUsd }: { totalUsd: number }) => {
  const form = useFormContext();

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-2">
        <h6 className="text-sm font-semibold">Pagos por Zelle</h6>
        <p className="text-sm">
          Ingresa a la plataforma de tu banco y haz un pago por $8.1 USD a los siguientes datos:
        </p>
      </div>
      <Card className="bg-[#232F3E] pt-6">
        <CardContent className="flex flex-col gap-y-1">
          <span className="text-white">Monto</span>
          <span className="text-white text-sm font-semibold">${totalUsd.toFixed(2)}</span>
        </CardContent>
        <CardContent className="flex flex-col gap-y-1">
          <span className="text-white">A nombre de</span>
          <span className="text-white text-sm font-semibold">Modu LLC</span>
        </CardContent>
        <CardContent className="flex flex-col gap-y-1">
          <span className="text-white">Correo</span>
          <span className="text-white text-sm font-semibold">pagos@adanfarmacia.com</span>
        </CardContent>
      </Card>
      <div className="flex flex-col">
        <Controller
          control={form.control}
          name="details.nombre"
          render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => (
            <LabeledInput
              ref={ref}
              error={error?.message}
              label="Nombre del titular"
              inputProps={{
                placeholder: 'Nombre del titular',
                onChange: onChange,
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
