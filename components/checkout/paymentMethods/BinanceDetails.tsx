import { Controller, useFormContext } from 'react-hook-form';
import { LabeledInput } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export const BinanceDetails = ({ totalUsd, qr }: { totalUsd: number; qr: string }) => {
  const form = useFormContext();

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-2">
        <h6 className="text-sm font-semibold">Pagos por Binance</h6>
        <p className="text-sm">
          Ingresa a tu cuenta de Binance y haz un pago por{' '}
          <span className="font-semibold">${totalUsd.toFixed(2)}</span> USD a los siguientes datos:
        </p>
      </div>
      <Card className="pt-6">
        <CardContent className="flex flex-col gap-y-1">
          {qr && (
            <Image src={qr} alt="Binance" width={300} height={300} className="rounded-lg w-full" />
          )}
        </CardContent>
      </Card>
      <form className="flex flex-col">
        <Controller
          control={form.control}
          name="details.nombre"
          render={({ field }) => (
            <LabeledInput
              {...field}
              label="Nombre del titular de Binance"
              inputProps={{ placeholder: 'Nombre del titular' }}
              labelProps={{ className: 'text-sm font-semibold' }}
            />
          )}
        />
      </form>
    </div>
  );
};
