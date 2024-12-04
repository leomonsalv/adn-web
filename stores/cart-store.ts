// stores/cart-store.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Cart, CartProduct } from "@/types/cart";

interface CartState {
  cart: Cart;
  isOpen: boolean;
  loading: boolean;
  addToCart: (product: CartProduct) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  updateQuantity: (productId: number, quantity: number) => void;
  toggleCart: () => void;
  getCartTotal: () => number;
  getCartSubtotal: () => number;
  getCartTax: () => number;
  getCartCount: () => number;
  getItemCount: (productId: number) => number;
  isItemInCart: (productId: number) => boolean;
  setLoading: (status: boolean) => void;
  decrementQuantity: (productId: number) => void;
  setCart: (cart: Cart) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: {
        products: [],
        userId: "",
      },
      isOpen: false,
      loading: false,
      addToCart: (product) => {
        const existingItem = get().cart.products.find(
          (item) => item.id === product.id,
        );
        if (existingItem) {
          set({
            cart: {
              ...get().cart,
              products: get().cart.products.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            },
          });
        } else {
          set({
            cart: {
              ...get().cart,
              products: [...get().cart.products, { ...product, quantity: 1 }],
            },
          });
        }
      },
      removeFromCart: (productId) => {
        set({
          cart: {
            ...get().cart,
            products: get().cart.products.filter(
              (item) => item.id !== productId,
            ),
          },
        });
      },
      clearCart: () => set({ cart: { products: [], userId: "" } }),
      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return;
        set({
          cart: {
            ...get().cart,
            products: get().cart.products.map((item) =>
              item.id === productId ? { ...item, quantity } : item,
            ),
          },
        });
      },
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      getCartSubtotal: () => {
        return get().cart.products.reduce(
          (total, item) =>
            total + parseFloat(item.price.replace("$", "")) * item.quantity,
          0,
        );
      },
      getCartTotal: () => {
        return get().cart.products.reduce(
          (total, item) =>
            total +
            parseFloat(item.price.replace("$", "")) *
              item.quantity *
              (1 + (item.tax || 0)),
          0,
        );
      },
      getCartCount: () => {
        return get().cart.products.reduce(
          (count, item) => count + item.quantity,
          0,
        );
      },
      getCartTax: () => {
        return get().cart.products.reduce(
          (total, item) =>
            total +
            parseFloat(item.price.replace("$", "")) *
              item.quantity *
              (item.tax || 0),
          0,
        );
      },
      getItemCount: (productId) => {
        return (
          get().cart.products.find((item) => item.id === productId)?.quantity ||
          0
        );
      },
      isItemInCart: (productId) => {
        return get().cart.products.some((item) => item.id === productId);
      },
      setLoading: (status) => set({ loading: status }),
      decrementQuantity: (productId) => {
        const item = get().cart.products.find((item) => item.id === productId);
        if (!item) return;

        if (item.quantity === 1) {
          get().removeFromCart(productId);
        } else {
          set({
            cart: {
              ...get().cart,
              products: get().cart.products.map((item) =>
                item.id === productId
                  ? { ...item, quantity: item.quantity - 1 }
                  : item,
              ),
            },
          });
        }
      },
      setCart: (cart) => set({ cart }),
    }),
    {
      name: "cart-storage",
      skipHydration: true,
    },
  ),
);
