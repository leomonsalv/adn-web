import React from 'react';
import { footerNavigation } from '@/lib/dummyData';
import Link from 'next/link';
import { ArrowUpToLine, FacebookIcon, InstagramIcon, MailIcon } from 'lucide-react';
import { WhatsappIcon } from '@/components/icons/WhatsappIcon';
import { AdanLogo } from '@/components/icons/AdanLogo';
import { LanguagePicker } from '@/components/language-picker/LanguagePicker';
import { GoogleTrust } from './components/GoogleTrust';
import { PaymentMethods } from './components/PaymentMethods';

type Props = {};

function Footer({}: Props) {
  return (
    <footer
      aria-labelledby="footer-heading"
      className="border-t border-gray-200 bg-[#232F3E] text-white"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-8 text-sm">
          <div className="flex w-full justify-between border-b border-white/10 pt-11 pb-8 mb-4">
            <AdanLogo />
            <LanguagePicker />
          </div>
          <div className="py-4 grid grid-cols-4 lg:grid-cols-12 lg:gap-12">
            <div className="col-span-2 lg:col-span-3">
              <h2 className="font-bold mb-3">Categorías</h2>
              {footerNavigation?.categories?.map((category) => (
                <div className="text-xs my-2 lg:text-sm" key={category.name}>
                  <Link href={category.href}>{category.name}</Link>
                </div>
              ))}
            </div>
            <div className="col-span-2 lg:col-span-3">
              <h2 className="font-bold mb-3">Necesitas ayuda para comprar?</h2>
              <p className="text-xs lg:text-sm">
                Estamos disponibles para responder a tus dudas entre las 8:00 y las 17:00.
              </p>
              <section className="space-y-4 mt-4">
                <div className="p-2 bg-[#37424F] rounded-sm text-xs lg:text-sm flex gap-2 items-center">
                  <WhatsappIcon className="w-4 h-4 fill-white" />
                  <Link href="https://wa.me/584241613016" target="_blank">
                    (+58) 424-1613016
                  </Link>
                </div>
                <div className="p-2 bg-[#37424F] rounded-sm text-xs lg:text-sm flex gap-2 items-center">
                  <MailIcon className="min-w-4 w-4" />
                  <Link
                    href="mailto:soporte@adanfarmacia.com"
                    target="_blank"
                    className="text-ellipsis overflow-x-auto"
                  >
                    soporte@adanfarmacia.com
                  </Link>
                </div>
              </section>
            </div>
            <div className="col-span-2 mt-6 lg:col-span-3 lg:mt-0">
              <h2 className="font-bold mb-3">Más</h2>
              {footerNavigation?.more?.map((item) => (
                <div className="text-xs lg:text-sm my-2" key={item.name}>
                  <Link href={item.href}>{item.name}</Link>
                </div>
              ))}
            </div>
            <div className="col-span-2 text-xs lg:text-sm mt-6 space-y-2 lg:mt-0">
              <p>Calle Vargas Edificio Rusegal Piso PB, Local PB, Boleita Norte.</p>
              <p>Tlf: (+58) 424-1613016</p>
              <p>RIF: J-500594313</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#161E28]">
        <div className="hidden lg:block max-w-7xl mx-auto">
          <div className="py-10 sm:mx-6 mx-4 flex flex-col justify-center items-center lg:flex-row lg:justify-between border-b border-white/10">
            <GoogleTrust />
            <section>
              <Link href="" className="font-semibold flex gap-x-1">
                <ArrowUpToLine className="w-5 text-[#A1A1AA]/70" />
                Volver arriba
              </Link>
            </section>
            <PaymentMethods />
          </div>
        </div>
        <div className="py-10 mx-auto sm:px-6 px-4 flex flex-col justify-center items-center lg:flex-row lg:justify-between max-w-7xl">
          <section className="text-sm flex flex-col order-2 lg:order-1 space-y-1 lg:flex-row lg:items-center lg:w-4/5 lg:text-base lg:justify-evenly lg:space-x-10">
            <p className="order-3 text-center lg:w-fit lg:order-1 lg:text-ellipsis lg:text-left">
              &copy; 2021 Adan. Todos los derechos reservados.
            </p>
            <div className="flex justify-between items-center align-middle py-4 lg:w-full lg:flex-1 lg:order-2 lg:justify-start underline lg:space-x-10">
              <Link href="#">Términos y condiciones</Link>
              <Link href="#">Políticas de privacidad</Link>
            </div>
          </section>
          <section className="order-1 lg:order-2 space-x-4 text-sm flex lg:text-base">
            <Link href="#">
              <FacebookIcon className="w-6" />
            </Link>
            <Link href="#">
              <InstagramIcon className="w-6" />
            </Link>
          </section>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
