import { db, functions } from '@/lib/firebaseConfig';
import { API_URL, VIPPO_VALIDATE } from '@/lib/urls';
import { doc, getDoc } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';

export const getPaymentMethods = async () => {
  try {
    const response = await getDoc(doc(db, 'config', 'paymentMethods'));
    return response.data();
  } catch (error) {
    console.error('Error getting payment methods:', error);
    throw error;
  }
};

export const validateVippo = async (vippo: any) => {
  try {
    return await httpsCallable(functions, VIPPO_VALIDATE)(vippo);
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const getRate = async (): Promise<Number> => {
  try {
    const response = await fetch(`${API_URL}/api/rate`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const rate = await response.json();
    return rate.rate;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching rate:', error.message);
      throw error;
    }
    throw new Error('An unknown error occurred while fetching the rate');
  }
};
