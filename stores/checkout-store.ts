import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Method } from '@/schemas/payment-method-schema';

interface CheckoutState {
  currentStep: number;
  paymentType: 'simple' | 'mixed';
  selectedPaymentMethod: Method | null;
  contactInformation: {
    email: string;
    phone: string;
    dni: string;
  };
  shippingAddress: {
    address: string;
    apartment: string;
    city: string;
    state: string;
    postal: string;
  };
  billingInformation: {
    sameAsShipping: boolean;
    address?: string;
    apartment?: string;
    city?: string;
    state?: string;
    postal?: string;
  };
  deliveryMethod: {
    id: number;
    title: string;
    turnaround: string;
    price: string;
  } | null;
}

interface CheckoutActions {
  setCurrentStep: (step: number) => void;
  setPaymentType: (type: 'simple' | 'mixed') => void;
  setSelectedPaymentMethod: (method: Method) => void;
  setContactInformation: (info: CheckoutState['contactInformation']) => void;
  setShippingAddress: (address: CheckoutState['shippingAddress']) => void;
  setBillingInformation: (info: CheckoutState['billingInformation']) => void;
  setDeliveryMethod: (method: CheckoutState['deliveryMethod']) => void;
  resetCheckout: () => void;
}

const initialState: CheckoutState = {
  currentStep: 1,
  paymentType: 'simple',
  selectedPaymentMethod: null,
  contactInformation: {
    email: '',
    phone: '',
    dni: '',
  },
  shippingAddress: {
    address: '',
    apartment: '',
    city: '',
    state: '',
    postal: '',
  },
  billingInformation: {
    sameAsShipping: true,
  },
  deliveryMethod: null,
};

export const useCheckoutStore = create<CheckoutState & CheckoutActions>()(
  persist(
    (set) => ({
      ...initialState,
      setCurrentStep: (step) => set({ currentStep: step }),
      setPaymentType: (type) => set({ paymentType: type }),
      setSelectedPaymentMethod: (method) => set({ selectedPaymentMethod: method }),
      setContactInformation: (info) => set({ contactInformation: info }),
      setShippingAddress: (address) => set({ shippingAddress: address }),
      setBillingInformation: (info) => set({ billingInformation: info }),
      setDeliveryMethod: (method) => set({ deliveryMethod: method }),
      resetCheckout: () => set(initialState),
    }),
    {
      name: 'checkout-storage',
      skipHydration: true,
    },
  ),
);
