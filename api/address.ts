import { httpsCallable } from 'firebase/functions';
import { db, functions } from '@/lib/firebaseConfig';
import { SAVE_ADDRESS } from '@/lib/urls';
import { Address } from '@/schemas/create-address-schema';

export const createAddress = async (address: Address) => {
  try {
    const data = httpsCallable(functions, SAVE_ADDRESS)(address);
    return data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};
