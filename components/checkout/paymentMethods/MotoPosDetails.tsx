import { Controller, useFormContext } from 'react-hook-form';
import { LabeledInput } from '@/components/ui/input';

export const MotoPosDetails = ({ totalBs }: { totalBs: number }) => {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-2">
        <h6 className="text-sm font-semibold">Pagos por Punto de Venta</h6>
        <p className="text-sm">
          El motorizado llevará el punto de venta a tu domicilio. Deberás pagar el total de &nbsp;
          <span className="font-semibold">Bs. {totalBs.toFixed(2)}</span>.
        </p>
      </div>
    </div>
  );
};
