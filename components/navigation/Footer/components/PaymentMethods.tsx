import Image from 'next/image';

// Use dynamic imports for SVGs to avoid build issues
const PaymentIcon = ({ name, alt }: { name: string; alt: string }) => {
  return (
    <div className="h-6 w-auto flex items-center">
      <Image src={`/icons/${name}.svg`} alt={alt} width={40} height={24} className="h-6 w-auto" />
    </div>
  );
};

export function PaymentMethods() {
  const paymentMethods = [
    { name: 'cash_usd', alt: 'Cash payment method for Adan' },
    { name: 'pago_movil', alt: 'Pago Movil payment method for Adan' },
    { name: 'binance', alt: 'Binance payment method for Adan' },
    { name: 'master', alt: 'Master card payment method for Adan' },
    { name: 'visa', alt: 'Visa payment method for Adan' },
    { name: 'zelle', alt: 'Zelle payment method for Adan' },
  ];

  return (
    <section className="flex gap-2 items-center flex-wrap">
      {paymentMethods.map((method) => (
        <PaymentIcon key={method.name} name={method.name} alt={method.alt} />
      ))}
    </section>
  );
}
