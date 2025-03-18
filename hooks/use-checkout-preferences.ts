'use client';

import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import { useAuth } from './use-auth';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ContactInformationSchema } from '@/schemas/contact-information-schema';
import { ShippingAddressSchema } from '@/schemas/shipping-address-schema';
import { PaymentMethodType } from '@/schemas/create-order-schema';

interface CheckoutPreferences {
  contactInformation?: ContactInformationSchema;
  shippingAddress?: Omit<ShippingAddressSchema, 'id'>;
  preferredPaymentMethod?: PaymentMethodType;
}

/**
 * Hook for managing user checkout preferences
 * Allows saving and retrieving contact information, shipping address, and payment method
 */
export default function useCheckoutPreferences() {
  const { user } = useAuth();

  /**
   * Save user checkout preferences to Firestore
   */
  const useSaveCheckoutPreferences = () => {
    return useMutation({
      mutationFn: async (preferences: CheckoutPreferences) => {
        if (!user?.uid) {
          throw new Error('User not authenticated');
        }

        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          throw new Error('User document not found');
        }

        // Update only the provided preferences
        const updates: Record<string, any> = {};

        if (preferences.contactInformation) {
          updates['checkoutPreferences.contactInformation'] = preferences.contactInformation;

          // Also update invoice data if available
          updates['invoiceData.fullname'] = preferences.contactInformation.name;
          updates['invoiceData.email'] = preferences.contactInformation.email;
          updates['invoiceData.dni'] = preferences.contactInformation.dni;
          updates['invoiceData.dniType'] = preferences.contactInformation.dniType;
        }

        if (preferences.shippingAddress) {
          updates['checkoutPreferences.shippingAddress'] = preferences.shippingAddress;
        }

        if (preferences.preferredPaymentMethod) {
          updates['checkoutPreferences.preferredPaymentMethod'] =
            preferences.preferredPaymentMethod;
        }

        await updateDoc(userDocRef, updates);
        return { success: true };
      },
    });
  };

  /**
   * Get user checkout preferences from Firestore
   */
  const useGetCheckoutPreferences = () => {
    return useQuery({
      queryKey: ['checkoutPreferences', user?.uid],
      queryFn: async () => {
        if (!user?.uid) {
          return null;
        }

        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          return null;
        }

        const userData = userDoc.data();
        return (userData.checkoutPreferences as CheckoutPreferences) || null;
      },
      enabled: !!user?.uid,
    });
  };

  return {
    useSaveCheckoutPreferences,
    useGetCheckoutPreferences,
  };
}
