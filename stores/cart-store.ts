// stores/cart-store.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Cart, CartProduct } from '@/types/cart';
import { Product } from '@/types/product';

interface CartState {
  cart: Cart;
  isOpen: boolean;
  loading: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  updateQuantity: (productId: number, quantity: number) => void;
  toggleCart: () => void;
  getCartTotal: () => number;
  getCartSubtotal: () => number;
  getCartTax: () => number;
  getCartCount: () => number;
  getItemCount: (productId: number) => number;
  getCartRef: () => number;
  isItemInCart: (productId: number) => boolean;
  setLoading: (status: boolean) => void;
  decrementQuantity: (productId: number) => void;
  setCart: (cart: Cart) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: {
        id: '',
        products: [],
        userId: '',
      },
      isOpen: false,
      loading: false,
      // Cart actions
      addToCart: (product) => {
        const existingItem = get().cart.products.find((item) => item.id === product.id);
        if (existingItem) {
          set({
            cart: {
              ...get().cart,
              products: get().cart.products.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
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
            products: get().cart.products.filter((item) => item.id !== productId),
          },
        });
      },
      clearCart: () => set({ cart: { products: [], userId: '', id: '' } }),
      updateQuantity: (productId, quantity) => {
        if (quantity < 1) {
          set({
            cart: {
              ...get().cart,
              products: get().cart.products.filter((item) => item.id !== productId),
            },
          });
        }
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
      // Cart getters
      getCartSubtotal: () => {
        const subtotal = get().cart.products.reduce((total, item) => {
          const itemTotal = toSafeInteger(item.price) * item.quantity;
          return total + itemTotal;
        }, 0);
        return fromSafeInteger(subtotal);
      },
      getCartTotal: () => {
        const subtotal = get().cart.products.reduce((total, item) => {
          const itemTotal = toSafeInteger(item.price) * item.quantity;
          return total + itemTotal;
        }, 0);
        const tax = toSafeInteger(get().getCartTax());
        return fromSafeInteger(subtotal + tax);
      },
      getCartRef: () => {
        return get().cart.products.reduce(
          (total, item) => total + Number(item.price_ref) * item.quantity,
          0,
        );
      },
      getCartTax: () => {
        const tax = get().cart.products.reduce((total, item) => {
          const itemTax = toSafeInteger(item.taxes[0].amount) * item.quantity;
          return total + itemTax;
        }, 0);
        return fromSafeInteger(tax);
      },
      getCartCount: () => {
        return get().cart.products.reduce((count, item) => count + item.quantity, 0);
      },
      getItemCount: (productId) => {
        return get().cart.products.find((item) => item.id === productId)?.quantity || 0;
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
                item.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
              ),
            },
          });
        }
      },
      setCart: (cart) => set({ cart }),
    }),
    {
      name: 'cart-storage',
      skipHydration: true,
    },
  ),
);

// Convert float to integer by multiplying by a large enough factor
export const toSafeInteger = (float: number): number => {
  return Math.round(float * 100000); // 5 decimal places precision
};

// Convert back from safe integer to float by dividing
export const fromSafeInteger = (safeInt: number): number => {
  return safeInt / 100000;
};
