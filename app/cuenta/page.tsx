import ActionBox from '@/components/account/ActionBox';

export default function AccountPage() {
  return (
    <div className="bg-white text-black min-h-svh pt-40">
      <div className="mx-auto grid max-w-7xl xs:grid-cols-1 grid-cols-2 gap-x-16 lg:grid-cols-3 lg:px-8 xl:gap-x-28 gap-y-8">
        <ActionBox
          icon="icon"
          title="Términos y condiciones"
          label="Información legal y privacidad"
          route="/cuenta"
        />
        <ActionBox
          icon="icon"
          title="Tus órdenes"
          label="Sigue tus órdenes activas y verifica su estado"
          route="/cuenta"
        />
        <ActionBox
          icon="icon"
          title="Sesión y seguridad"
          label="Tu información y configuración de seguridad"
          route="/cuenta"
        />
      </div>
    </div>
  );
}
