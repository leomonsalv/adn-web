import { getPaymentMethods, validateVippo } from '@/api/checkout';
import { PaymentMethod, PaymentMethodType } from '@/schemas/create-order-schema';
import { Method } from '@/schemas/payment-method-schema';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuth } from './use-auth';
import { useCheckoutStore } from '@/stores/checkout-store';

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
const getCashTypeState = ({
  currency,
  totalBs,
  totalUsd,
  requiresAmount,
}: {
  currency: 'Bs' | 'USD';
  totalBs: number;
  totalUsd: number;
  requiresAmount: boolean;
}) => ({
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

const getSimpleAmountState = ({
  currency,
  totalBs,
  totalUsd,
  userEmail,
}: {
  currency: 'Bs' | 'USD';
  totalBs: number;
  totalUsd: number;
  userEmail: string;
}) => ({
  amount: currency === 'Bs' ? totalBs : totalUsd,
  email: userEmail,
});

// Specific payment type handlers with improved maintainability
const PAYMENT_TYPE_HANDLERS: Record<
  Exclude<
    PaymentMethodType,
    | (typeof PAYMENT_DETAILS_MAPS.cashTypes)[number]
    | (typeof PAYMENT_DETAILS_MAPS.simpleAmountTypes)[number]
  >,
  ({
    currency,
    totalBs,
    totalUsd,
    userEmail,
  }: {
    currency: 'Bs' | 'USD';
    totalBs: number;
    totalUsd: number;
    userEmail: string;
  }) => PaymentMethod['details']
> = {
  pagomovil: (data) => ({
    amount: data.currency === 'Bs' ? data.totalBs : data.totalUsd,
    bank: '',
    prefix: '',
    phone: '',
    dniType: '',
    dni: '',
    destination: 'plaza',
    reference: '',
  }),
  zelle: (data) => ({
    amount: data.totalUsd,
    email: data.userEmail,
    name: '',
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
  vippo: (data) => ({
    amount: data.totalUsd,
    holderName: '',
    cardNumber: '',
    vencimiento: { mes: 0, ano: 0 },
    codigoSeguridad: '',
    token: 420,
  }),
  botonbanesco: () => ({}),
};

export default function useCheckout() {
  const useGetPaymentMethods = () => {
    const { user } = useAuth();

    return useQuery({
      queryKey: ['payment-methods'],
      queryFn: getPaymentMethods,
      select: (data): Method[] => data?.methods.filter((method: Method) => method.available) ?? [],
      enabled: !!user,
    });
  };

  const useValidateVippo = () => {
    const { getCheckoutData } = useCheckoutStore();
    const checkoutData = getCheckoutData();
    const dniType = (type: string) => {
      if (type === 'V' || type === 'E') {
        return 'CI';
      }
      return 'RIF';
    };

    return useMutation({
      mutationFn: (data: any) => {
        const dataVippo = data.details;
        const newData = {
          cardNumber: dataVippo.cardNumber,
          expirationMonth: Number(dataVippo.vencimiento.mes),
          expirationYear: Number(dataVippo.vencimiento.ano),
          holderName: dataVippo.holderName,
          holderIdDoc: dniType(checkoutData.contactInformation.dniType),
          holderId: checkoutData.contactInformation.dni,
          cvc: dataVippo.codigoSeguridad,
          currency: 'VES',
        };
        return validateVippo(newData);
      },
    });
  };

  return { useGetPaymentMethods, useValidateVippo };
}

export const getInitialPaymentState = ({
  paymentType,
  requiresAmount,
  currency,
  totalUsd,
  totalBs,
  userEmail,
}: {
  paymentType: PaymentMethodType;
  requiresAmount: boolean;
  currency: 'Bs' | 'USD';
  totalUsd: number;
  totalBs: number;
  userEmail: string;
}) => {
  if (isCashType(paymentType)) {
    return {
      type: paymentType,
      details: getCashTypeState({ currency, totalBs, totalUsd, requiresAmount }),
    };
  }

  if (isSimpleAmountType(paymentType)) {
    return {
      type: paymentType,
      details: getSimpleAmountState({ currency, totalBs, totalUsd, userEmail }),
    };
  }

  const handler = PAYMENT_TYPE_HANDLERS[paymentType];

  if (handler && paymentType in PAYMENT_TYPE_HANDLERS) {
    return {
      type: paymentType,
      details: handler({ currency, totalBs, totalUsd, userEmail }),
    };
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
  };
};
