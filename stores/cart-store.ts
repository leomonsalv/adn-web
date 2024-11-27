// stores/cart-store.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/types/cart";
import { Product } from "@/types/product";

interface CartState {
  cartItems: CartItem[];
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
  isItemInCart: (productId: number) => boolean;
  setLoading: (status: boolean) => void;
  decrementQuantity: (productId: number) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [
        // TODO: Remove this
        {
          id: 1,
          name: "Basic Tee",
          href: "#",
          price: "$32.00",
          color: "Sienna",
          inStock: true,
          size: "Large",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-01-product-01.jpg",
          imageAlt: "Front of men's Basic Tee in sienna.",
          quantity: 1,
          tax: 0.1,
        },
        {
          id: 2,
          name: "Basic Tee",
          href: "#",
          price: "$32.00",
          color: "Black",
          inStock: false,
          leadTime: "3–4 weeks",
          size: "Large",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-01-product-02.jpg",
          imageAlt: "Front of men's Basic Tee in black.",
          quantity: 1,
          tax: 0.1,
        },
        {
          id: 3,
          name: "Nomad Tumbler",
          href: "#",
          price: "$35.00",
          color: "White",
          inStock: true,
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-01-product-01.jpg",
          imageAlt: "Insulated bottle with white base and black snap lid.",
          quantity: 1,
          tax: 0.1,
        },
        {
          id: 4,
          name: "Nomad Tumbler 1",
          href: "#",
          price: "$50.00",
          color: "White",
          inStock: true,
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-01-product-02.jpg",
          imageAlt: "Insulated bottle with white base and black snap lid.",
          quantity: 1,
          tax: 0.1,
        },
        {
          id: 5,
          name: "Nomad Tumbler 2",
          href: "#",
          price: "$20.00",
          color: "White",
          inStock: true,
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-01-product-01.jpg",
          imageAlt: "Insulated bottle with white base and black snap lid.",
          quantity: 1,
          tax: 0.1,
        },
      ],
      isOpen: false,
      loading: false,
      addToCart: (product) => {
        console.log("🚀 ~ product:", product);
        const existingItem = get().cartItems.find(
          (item) => item.id === product.id,
        );
        if (existingItem) {
          set({
            cartItems: get().cartItems.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          });
        } else {
          set({ cartItems: [...get().cartItems, { ...product, quantity: 1 }] });
        }
      },
      removeFromCart: (productId) => {
        set({
          cartItems: get().cartItems.filter((item) => item.id !== productId),
        });
      },
      clearCart: () => set({ cartItems: [] }),
      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return;
        set({
          cartItems: get().cartItems.map((item) =>
            item.id === productId ? { ...item, quantity } : item,
          ),
        });
      },
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      getCartSubtotal: () => {
        return get().cartItems.reduce(
          (total, item) =>
            total + parseFloat(item.price.replace("$", "")) * item.quantity,
          0,
        );
      },
      getCartTotal: () => {
        return get().cartItems.reduce(
          (total, item) =>
            total +
            parseFloat(item.price.replace("$", "")) *
              item.quantity *
              (1 + (item.tax || 0)),
          0,
        );
      },
      getCartCount: () => {
        return get().cartItems.reduce(
          (count, item) => count + item.quantity,
          0,
        );
      },
      getCartTax: () => {
        return get().cartItems.reduce(
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
          get().cartItems.find((item) => item.id === productId)?.quantity || 0
        );
      },
      isItemInCart: (productId) => {
        return get().cartItems.some((item) => item.id === productId);
      },
      setLoading: (status) => set({ loading: status }),
      decrementQuantity: (productId) => {
        const item = get().cartItems.find((item) => item.id === productId);
        if (!item) return;

        if (item.quantity === 1) {
          get().removeFromCart(productId);
        } else {
          set({
            cartItems: get().cartItems.map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item,
            ),
          });
        }
      },
    }),
    {
      name: "cart-storage",
      skipHydration: true,
    },
  ),
);
