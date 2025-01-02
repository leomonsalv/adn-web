import Image from 'next/image';
import Binance from '@/components/icons/binance.svg';
import Zelle from '@/components/icons/zelle.svg';
import PagoMovil from '@/components/icons/pago_movil.svg';
import Visa from '@/components/icons/visa.svg';
import MasterCard from '@/components/icons/master.svg';
import Cash from '@/components/icons/cash_usd.svg';

export function PaymentMethods() {
  return (
    <section className="flex">
      <Image src={Cash} alt="Cash payment method for Adan" />
      <Image src={PagoMovil} alt="Pago Movil payment method for Adan" />
      <Image src={Binance} alt="Binance payment method for Adan" />
      <Image src={MasterCard} alt="Master card payment method for Adan" />
      <Image src={Visa} alt="Visa payment method for Adan" />
      <Image src={Zelle} alt="Zelle payment method for Adan" />
    </section>
  );
}
