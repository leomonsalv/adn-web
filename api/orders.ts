import { collection, query, orderBy, startAfter, limit, getDocs, where } from 'firebase/firestore';
import { db, functions } from '@/lib/firebaseConfig';
import { z } from 'zod';
import { httpsCallable } from 'firebase/functions';
import { CREATE_ORDER } from '@/lib/urls';
import { Order } from '@/schemas/create-order-schema';

export const fetchOrdersHistoric = async (userId: string, pageSize = 5, lastVisible: any) => {
  try {
    const baseQuery = query(
      collection(db, 'orders'),
      where('clientId', '==', userId),
      orderBy('date', 'desc'),
      ...(lastVisible ? [startAfter(lastVisible)] : []),
      limit(pageSize),
    );

    const documentSnapshots = await getDocs(baseQuery);

    if (!documentSnapshots.size) {
      return { orders: [], lastVisible: null };
    }

    const orders = documentSnapshots.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const lastDoc = documentSnapshots.docs[documentSnapshots.docs.length - 1];

    return { orders, lastVisible: lastDoc };
  } catch (error) {
    console.error('Error fetching paginated orders:', error);
    throw error;
  }
};

export const createOrder = async (order: Order) => {
  try {
    const data = await httpsCallable(functions, CREATE_ORDER)(order);
    return data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};
