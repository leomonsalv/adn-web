export const PreCreditDetails = ({
  totalUsd,
  creditAvailable,
}: {
  totalUsd: number;
  creditAvailable: number;
}) => {
  return (
    <div className="flex flex-col gap-y-2">
      <h6 className="text-sm font-semibold">Paga con billetera REI</h6>
      <div className="flex flex-col gap-y-1 bg-[#232F3E] p-4 rounded-lg">
        <span className="text-sm text-white">Tu billetera REI</span>
        <p className="text-sm text-white">
          Usaras&nbsp;
          <span className="font-semibold">${totalUsd} USD</span> de los ${creditAvailable} USD
          disponibles en tu billetera Adan para pagar la orden.
        </p>
      </div>
    </div>
  );
};
