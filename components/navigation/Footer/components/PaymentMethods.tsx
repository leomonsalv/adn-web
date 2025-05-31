import Image from 'next/image';

export function PaymentMethods() {
  return (
    <section className="flex gap-2 items-center flex-wrap">
      <Image
        src="/components/icons/cash_usd.svg"
        alt="Cash payment method for Adan"
        width={40}
        height={24}
        className="h-6 w-auto"
      />
      <Image
        src="/components/icons/pago_movil.svg"
        alt="Pago Movil payment method for Adan"
        width={40}
        height={24}
        className="h-6 w-auto"
      />
      <Image
        src="/components/icons/binance.svg"
        alt="Binance payment method for Adan"
        width={40}
        height={24}
        className="h-6 w-auto"
      />
      <Image
        src="/components/icons/master.svg"
        alt="Master card payment method for Adan"
        width={40}
        height={24}
        className="h-6 w-auto"
      />
      <Image
        src="/components/icons/visa.svg"
        alt="Visa payment method for Adan"
        width={40}
        height={24}
        className="h-6 w-auto"
      />
      <Image
        src="/components/icons/zelle.svg"
        alt="Zelle payment method for Adan"
        width={40}
        height={24}
        className="h-6 w-auto"
      />
    </section>
  );
}
