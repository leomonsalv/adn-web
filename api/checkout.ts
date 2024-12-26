import { db } from '@/lib/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export const getPaymentMethods = async () => {
  try {
    const response = await getDoc(doc(db, 'config', 'paymentMethods'));
    return response.data();
  } catch (error) {
    console.error('Error getting payment methods:', error);
    throw error;
  }
};
