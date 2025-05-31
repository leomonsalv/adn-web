import Image from 'next/image';

// Import SVGs as static assets
import BinanceIcon from '@/components/icons/binance.svg';
import ZelleIcon from '@/components/icons/zelle.svg';
import PagoMovilIcon from '@/components/icons/pago_movil.svg';
import VisaIcon from '@/components/icons/visa.svg';
import MasterCardIcon from '@/components/icons/master.svg';
import CashIcon from '@/components/icons/cash_usd.svg';

export function PaymentMethods() {
  return (
    <section className="flex gap-2 items-center">
      <Image
        src={CashIcon}
        alt="Cash payment method for Adan"
        width={40}
        height={24}
        className="h-6 w-auto"
      />
      <Image
        src={PagoMovilIcon}
        alt="Pago Movil payment method for Adan"
        width={40}
        height={24}
        className="h-6 w-auto"
      />
      <Image
        src={BinanceIcon}
        alt="Binance payment method for Adan"
        width={40}
        height={24}
        className="h-6 w-auto"
      />
      <Image
        src={MasterCardIcon}
        alt="Master card payment method for Adan"
        width={40}
        height={24}
        className="h-6 w-auto"
      />
      <Image
        src={VisaIcon}
        alt="Visa payment method for Adan"
        width={40}
        height={24}
        className="h-6 w-auto"
      />
      <Image
        src={ZelleIcon}
        alt="Zelle payment method for Adan"
        width={40}
        height={24}
        className="h-6 w-auto"
      />
    </section>
  );
}
