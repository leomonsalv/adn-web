import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Method } from '@/schemas/payment-method-schema';
import { DniType } from '@/schemas/create-order-schema';

interface CheckoutState {
  currentStep: 1 | 2 | 3;
  paymentType: 'simple' | 'mixed';
  selectedPaymentMethod: Method | null;
  contactInformation: {
    name: string;
    email: string;
    dni: string;
    dniType: DniType;
  };
  shippingAddress: {
    phone: string;
    street: string;
    city: string;
    state: string;
    isDefault: boolean;
    lat: number;
    lng: number;
    id: string;
    alias: string;
    type?: 'pickup' | 'delivery' | 'zoom';
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
  getCheckoutData: () => CheckoutState;
  resetCheckout: () => void;
}

const initialState: CheckoutState = {
  currentStep: 1,
  paymentType: 'simple',
  selectedPaymentMethod: null,
  contactInformation: {
    email: '',
    dni: '',
    dniType: 'V',
    name: '',
  },
  shippingAddress: {
    phone: '',
    street: '',
    city: '',
    state: '',
    isDefault: false,
    lat: 0,
    lng: 0,
    id: '',
    alias: '',
  },
  billingInformation: {
    sameAsShipping: true,
  },
  deliveryMethod: null,
};

export const useCheckoutStore = create<CheckoutState & CheckoutActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      setCurrentStep: (step) => set({ currentStep: step }),
      setPaymentType: (type) => set({ paymentType: type }),
      setSelectedPaymentMethod: (method) => set({ selectedPaymentMethod: method }),
      setContactInformation: (info) => set({ contactInformation: info }),
      setShippingAddress: (address) => set({ shippingAddress: address }),
      setBillingInformation: (info) => set({ billingInformation: info }),
      setDeliveryMethod: (method) => set({ deliveryMethod: method }),
      resetCheckout: () => set(initialState),
      getCheckoutData: () => get(),
    }),
    {
      name: 'checkout-storage',
      skipHydration: true,
    },
  ),
);
