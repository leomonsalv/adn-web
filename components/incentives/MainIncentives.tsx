import { Truck, Clock, CreditCard, Gift } from 'lucide-react';

const incentives = [
  {
    name: 'Envío gratuito',
    description:
      'Envío gratuito en compras superiores a $10. Aprovecha esta oferta y ahorra en tus envíos.',
    icon: Truck,
  },
  {
    name: 'Compras 24/7',
    description:
      'Nuestra tienda está abierta 24/7. Puedes comprar en cualquier momento y desde cualquier lugar.',
    icon: Clock,
  },
  {
    name: 'Compra rapida',
    description:
      'Puedes comprar de forma rapida y sencilla. Solo tienes que añadir tus productos al carrito y proceder al pago.',
    icon: CreditCard,
  },
  {
    name: 'Gift Cards',
    description:
      'Compra gift cards para tus amigos y familiares. No hay mejor regalo que el de la compra.',
    icon: Gift,
  },
];

export default function MainIncentives() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
          {incentives.map((incentive) => (
            <div key={incentive.name} className="flex flex-col items-center text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                <incentive.icon className="h-12 w-12 text-gray-900" />
              </div>
              <h3 className="mt-6 text-sm font-medium text-gray-900">{incentive.name}</h3>
              <p className="mt-2 text-sm text-gray-500">{incentive.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
