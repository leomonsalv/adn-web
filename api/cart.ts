import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { useCartStore } from "@/stores/cart-store";
import { Cart } from "@/types/cart";
import { z } from "zod";
import { CartSchema } from "@/schemas/cart";

// define empty cart
const emptyCart: any = { products: [], userId: "" };

export const getCart = async (userId: string) => {
  // get the cart store

  try {
    // get cart from firestore
    const cartSnapshot = await getDocs(
      collection(db, "users", userId, "shopCart"),
    );

    // get the first cart
    return cartSnapshot.docs.map((doc) => doc.data())[0] ?? emptyCart;
  } catch (error) {
    // if error is zod error, log the error
    if (error instanceof z.ZodError) {
      console.error("Invalid cart data structure:", error.errors);
    } else {
      // if error is not zod error, log the error
      console.error("Error fetching cart items:", error);
    }

    // return empty cart
    return emptyCart;
  }
};
