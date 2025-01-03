import { GoogleLogo } from '@/components/icons/GoogleLogo';
import { LockIcon } from '@/components/icons/LockIcon';

export function GoogleTrust() {
  return (
    <section className="flex text-[#E4E4E7]/70">
      <GoogleLogo />
      <div className="flex flex-col ml-3 self-center">
        <div className="flex align-middle  font-semibold text-sm gap-x-1">
          <LockIcon />
          <span className="">Compra con confianza</span>
        </div>
        <span className="text-xs">Compras 100% seguras por Google Trust Services</span>
      </div>
    </section>
  );
}
