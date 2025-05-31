const incentives = [
  {
    name: 'Envío gratuito',
    description:
      'Envío gratuito en compras superiores a $10. Aprovecha esta oferta y ahorra en tus envíos.',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce/icons/icon-delivery-light.svg',
  },
  {
    name: 'Compras 24/7',
    description:
      'Nuestra tienda está abierta 24/7. Puedes comprar en cualquier momento y desde cualquier lugar.',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce/icons/icon-chat-light.svg',
  },
  {
    name: 'Compra rápida',
    description:
      'Puedes comprar de forma rápida y sencilla. Solo tienes que añadir tus productos al carrito y proceder al pago.',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce/icons/icon-fast-checkout-light.svg',
  },
  {
    name: 'Gift Cards',
    description:
      'Compra gift cards para tus amigos y familiares. No hay mejor regalo que el de la compra.',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce/icons/icon-gift-card-light.svg',
  },
];

export default function Example() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
          {incentives.map((incentive) => (
            <div key={incentive.name}>
              <img alt="" src={incentive.imageSrc} className="h-24 w-auto" />
              <h3 className="mt-6 text-sm font-medium text-gray-900">{incentive.name}</h3>
              <p className="mt-2 text-sm text-gray-500">{incentive.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
