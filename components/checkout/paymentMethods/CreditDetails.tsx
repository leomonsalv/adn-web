import { formatCreditValue, formatUsdCurrency } from '@/lib/utils';

interface CreditDetailsProps {
  totalUsd: number;
  creditAvailable: number;
}

export const CreditDetails = ({ totalUsd, creditAvailable }: CreditDetailsProps) => {
  return (
    <div className="flex flex-col gap-y-2">
      <h6 className="text-sm font-semibold">Paga con billetera Adan</h6>
      <div className="flex flex-col gap-y-1 bg-[#232F3E] p-4 rounded-lg">
        <span className="text-sm text-white font-semibold">Tu billetera Adan</span>
        <p className="text-sm text-white">
          Usarás &nbsp;<span className="font-semibold">{formatUsdCurrency(totalUsd)}</span> de los
          &nbsp;<span className="font-semibold">{formatCreditValue(creditAvailable)}</span>
          &nbsp;disponibles en tu billetera Adan para pagar la orden.
        </p>
      </div>
    </div>
  );
};
