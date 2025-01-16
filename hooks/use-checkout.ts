import { getPaymentMethods } from '@/api/checkout';
import { PaymentDetailsUnionType, PaymentMethodType } from '@/schemas/create-order-schema';
import { Method } from '@/schemas/payment-method-schema';
import { useQuery } from '@tanstack/react-query';
import { useUser } from './use-user';

// Constants
const PAYMENT_DETAILS_MAPS = {
  cashTypes: ['cash', 'bolivarCash'] as const,
  simpleAmountTypes: ['binance', 'credit', 'preCredit', 'mBinance', 'motopos'] as const,
} as const;

// Type guards with improved type inference
const isCashType = (
  type: PaymentMethodType,
): type is (typeof PAYMENT_DETAILS_MAPS.cashTypes)[number] =>
  PAYMENT_DETAILS_MAPS.cashTypes.includes(type as any);

const isSimpleAmountType = (
  type: PaymentMethodType,
): type is (typeof PAYMENT_DETAILS_MAPS.simpleAmountTypes)[number] =>
  PAYMENT_DETAILS_MAPS.simpleAmountTypes.includes(type as any);

// Specific payment type handlers with improved type safety
const getCashTypeState = (
  currency: 'Bs' | 'USD',
  totalBs: number,
  totalUsd: number,
  requiresAmount: boolean,
) => ({
  bills: [
    {
      amount: 0,
      requiredAmount: requiresAmount ? (currency === 'Bs' ? totalBs : totalUsd) : 0,
      image: '',
      code: '',
    },
  ],
  comments: '',
});

const getSimpleAmountState = (currency: 'Bs' | 'USD', totalBs: number, totalUsd: number) => ({
  amount: currency === 'Bs' ? totalBs : totalUsd,
});

// Specific payment type handlers with improved maintainability
const PAYMENT_TYPE_HANDLERS: Record<
  Exclude<
    PaymentMethodType,
    | (typeof PAYMENT_DETAILS_MAPS.cashTypes)[number]
    | (typeof PAYMENT_DETAILS_MAPS.simpleAmountTypes)[number]
  >,
  (currency: 'Bs' | 'USD', totalBs: number, totalUsd: number) => PaymentDetailsUnionType['details']
> = {
  pagomovil: (_, totalBs) => ({
    amount: totalBs,
    bank: '',
    prefix: '',
    phone: '',
    dniType: '',
    dni: '',
    destination: 'plaza',
    reference: '',
  }),
  zelle: (_, __, totalUsd) => ({
    amount: totalUsd,
    email: '',
    nombre: '',
  }),
  tdcve: () => ({
    cardNumber: '',
    codigoSeguridad: '',
    vencimiento: { mes: 0, ano: 0 },
    cedula: '',
  }),
  paypal: () => ({
    orderId: '',
  }),
  bncPos: () => ({
    tarjeta: 0,
    cvv: 0,
    vencimiento: '',
    cedula: 0,
    clave: 0,
    nombre: '',
    tipoCuenta: 'corriente',
  }),
  vippo: (_, __, totalUsd) => ({
    amount: totalUsd,
    holderName: '',
    cardNumber: '',
    vencimiento: { mes: 0, ano: 0 },
    codigoSeguridad: '',
    token: '',
  }),
  botonbanesco: () => ({}),
};

export default function useCheckout() {
  const useGetPaymentMethods = () => {
    const { user } = useUser();

    return useQuery({
      queryKey: ['payment-methods'],
      queryFn: getPaymentMethods,
      select: (data): Method[] =>
        data?.methods.filter((method: Method) => method.available && user?.emailVerified) ?? [],
      enabled: !!user,
    });
  };

  return { useGetPaymentMethods };
}

export const getInitialPaymentState = (
  paymentType: PaymentMethodType,
  requiresAmount: boolean,
  currency: 'Bs' | 'USD',
  totalUsd: number,
  totalBs: number,
): PaymentDetailsUnionType => {
  if (isCashType(paymentType)) {
    return {
      type: paymentType,
      details: getCashTypeState(currency, totalBs, totalUsd, requiresAmount),
    };
  }

  if (isSimpleAmountType(paymentType)) {
    return {
      type: paymentType,
      details: getSimpleAmountState(currency, totalBs, totalUsd),
    };
  }

  const handler = PAYMENT_TYPE_HANDLERS[paymentType];

  if (handler && paymentType in PAYMENT_TYPE_HANDLERS) {
    return {
      type: paymentType,
      details: handler(currency, totalBs, totalUsd),
    } as PaymentDetailsUnionType;
  }

  // Fallback for unknown payment types
  return {
    type: paymentType,
    details: {
      amount: 0,
      email: '',
      nombre: '',
      comments: '',
    },
  } as PaymentDetailsUnionType;
};
