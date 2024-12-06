import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebaseConfig'
import { useCartStore } from '@/stores/cart-store'
import { Cart } from '@/types/cart'
import { z } from 'zod'
import { CartSchema } from '@/schemas/cart-schema'
import { Product } from '@/types/product'

// define empty cart
const emptyCart: any = { products: [], userId: '' }

export const getCart = async (userId: string) => {
  // get the cart store

  try {
    // get cart from firestore
    const cartSnapshot = await getDocs(collection(db, 'users', userId, 'shopCart'))

    // get the first cart
    const cartData = cartSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))[0]

    return cartData ?? emptyCart
  } catch (error) {
    // if error is zod error, log the error
    if (error instanceof z.ZodError) {
      console.error('Invalid cart data structure:', error.errors)
    } else {
      // if error is not zod error, log the error
      console.error('Error fetching cart items:', error)
      throw error
    }

    // return empty cart
    return emptyCart
  }
}

export const updateCart = async (userId: string, cartId: string, newCartData: Cart) => {
  try {
    // get the cart store
    const cartRef = doc(collection(db, 'users', userId, 'shopCart'), cartId)

    await updateDoc(cartRef, newCartData)
  } catch (error) {
    console.error('Error updating cart:', error)
    throw error
  }
}
