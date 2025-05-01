import { addDoc, collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { db, functions } from '@/lib/firebaseConfig';
import type { Cart } from '@/types/cart';
import { z } from 'zod';
import { httpsCallable } from 'firebase/functions';
import { CART_CALCULATION } from '@/lib/urls';

// define empty cart
const emptyCart: any = { products: [], userId: '', updatedAt: '' };

export const getCart = async (userId: string) => {
  // get the cart store
  if (!userId) {
    console.warn('getCart called with empty userId');
    return emptyCart;
  }

  try {
    // get cart from firestore
    const cartSnapshot = await getDocs(collection(db, 'users', userId, 'shopCart'));

    const cartData = cartSnapshot.docs
      .filter((doc) => doc.id !== 'wishList')
      .map((doc) => {
        const data = doc.data();
        const updatedAt = data.updatedAt?.toDate?.() || new Date(data.lastUpdate || 0);
        return {
          id: doc.id,
          updatedAt,
          ...data,
        };
      })
      .sort((a, b) => b.updatedAt - a.updatedAt)?.[0];
    // If no cart found, return empty cart instead of undefined
    if (!cartData) {
      return { ...emptyCart, userId };
    }

    return cartData;
  } catch (error) {
    // if error is zod error, log the error
    if (error instanceof z.ZodError) {
      console.error('Invalid cart data structure:', error.errors);
    } else {
      // if error is not zod error, log the error
      console.error('Error fetching cart items:', error);
      throw error;
    }

    // return empty cart
    return { ...emptyCart, userId };
  }
};

export const getOrCreateCart = async (userId: string) => {
  // get the cart store

  try {
    // get cart from firestore
    const cartSnapshot = await getDocs(collection(db, 'users', userId, 'shopCart'));

    // get the first cart
    const cartData = cartSnapshot.docs
      .filter((doc) => doc.id !== 'wishList')
      .map((doc) => ({
        id: doc.id,
        updatedAt: doc.data().updatedAt || new Date(),
        ...doc.data(),
      }))
      .sort((a, b) => b.updatedAt.toDate() - a.updatedAt.toDate())?.[0];

    if (!cartData) {
      const doc = await addDoc(collection(db, 'users', userId, 'shopCart'), {
        ...emptyCart,
        userId,
      });
      return { ...emptyCart, userId, id: doc.id };
    }

    return cartData;
  } catch (error) {
    // if error is zod error, log the error
    if (error instanceof z.ZodError) {
      console.error('Invalid cart data structure:', error.errors);
    } else {
      // if error is not zod error, log the error
      console.error('Error fetching cart items:', error);
      throw error;
    }

    // return empty cart
    return emptyCart;
  }
};

export const updateCart = async (userId: string, cartId: string, newCartData: Cart) => {
  try {
    // get the cart store
    const cartRef = doc(collection(db, 'users', userId, 'shopCart'), cartId);

    return await updateDoc(cartRef, newCartData);
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
};

export const checkCoupon = async (couponData: any) => {
  try {
    return await httpsCallable(functions, CART_CALCULATION)(couponData);
  } catch (error) {
    throw error;
  }
};
