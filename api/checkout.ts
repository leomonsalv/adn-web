import { db, functions } from '@/lib/firebaseConfig';
import { VIPPO_VALIDATE } from '@/lib/urls';
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
