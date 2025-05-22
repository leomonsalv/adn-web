// stores/cart-store.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Cart, CouponCalculationResponse, CartStore } from '@/types/cart';
import { Product } from '@/types/product';

interface CartState {
  cart: Cart;
  isOpen: boolean;
  loading: boolean;
  deliveryFee: number;
  couponData: CouponCalculationResponse | null;
  addToCart: (data: {
    userId: string;
    products: { id: number; prescriptionImg: string; quantity: number };
  }) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  updateQuantity: (productId: number, quantity: number) => void;
  toggleCart: () => void;
  getCartTotal: () => number;
  getCartSubtotal: () => number;
  getCartTax: () => number;
  getRefCartTax: () => number;
  getCartCount: () => number;
  getItemCount: (productId: number) => number;
  getCartRef: () => number;
  isItemInCart: (productId: number) => boolean;
  setLoading: (status: boolean) => void;
  decrementQuantity: (productId: number) => void;
  setCart: (cart: Cart) => void;
  setDeliveryFee: (fee: number) => void;
  setCouponData: (data: CouponCalculationResponse | null) => void;
  updateCartWithFullProducts: (products: Product[]) => void;
  getSimplifiedCart: () => {
    id: string;
    products: { id: number; prescriptionImg: string; quantity: number }[];
    userId: string;
    updatedAt: Date;
  };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: {
        id: '',
        products: [],
        userId: '',
        updatedAt: new Date(),
      },
      isOpen: false,
      loading: false,
      deliveryFee: 0,
      couponData: null,
      // Cart actions
      addToCart: (data) => {
        const { userId, products } = data;
        if (
          process.env.NEXT_PUBLIC_DELIVERY_PRODUCT_ID &&
          products.id.toString() === process.env.NEXT_PUBLIC_DELIVERY_PRODUCT_ID
        ) {
          console.log('Producto de entrega no agregado al carrito:', products.id);
          return;
        }

        const existingItem = get().cart.products.find((item) => item.id === products.id);
        if (existingItem) {
          set({
            cart: {
              ...get().cart,
              userId: userId || get().cart.userId,
              products: get().cart.products.map((item) =>
                item.id === products.id ? { ...item, quantity: item.quantity + 1 } : item,
              ),
            },
          });
        } else {
          set({
            cart: {
              ...get().cart,
              userId: userId || get().cart.userId,
              products: [
                ...get().cart.products,
                {
                  id: products.id,
                  prescriptionImg: products.prescriptionImg,
                  quantity: products.quantity || 1,
                },
              ],
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
      clearCart: () =>
        set({
          cart: {
            products: [],
            userId: '',
            id: '',
            updatedAt: new Date(),
          },
          deliveryFee: 0,
        }),
      updateQuantity: (productId, quantity) => {
        if (quantity < 1) {
          set({
            cart: {
              ...get().cart,
              products: get().cart.products.filter((item) => item.id !== productId),
            },
          });
        } else {
          set({
            cart: {
              ...get().cart,
              products: get().cart.products.map((item) =>
                item.id === productId ? { ...item, quantity } : item,
              ),
            },
          });
        }
      },
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      // Cart getters
      getCartSubtotal: () => {
        if (get().couponData) return Number(get().couponData?.subtotal);
        const subtotal = get().cart.products.reduce((total, item) => {
          const itemTotal = toSafeInteger(Number(item.bsPrice)) * item.quantity;
          return total + itemTotal;
        }, 0);
        return fromSafeInteger(subtotal);
      },
      getCartTotal: () => {
        if (get().couponData) return Number(get().couponData?.total);
        const subtotal = get().cart.products.reduce((total, item) => {
          const itemTotal = toSafeInteger(Number(item.bsPrice)) * item.quantity;
          return total + itemTotal;
        }, 0);
        const tax = toSafeInteger(get().getCartTax());
        const deliveryFee = toSafeInteger(get().deliveryFee);
        return fromSafeInteger(subtotal + tax + deliveryFee);
      },
      getCartRef: () => {
        if (get().couponData) return Number(get().couponData?.ref);
        return get().cart.products.reduce(
          (total, item) => total + Number(item.refPrice) * item.quantity,
          0,
        );
      },
      getCartTax: () => {
        if (get().couponData) return Number(get().couponData?.taxes);
        const tax = get().cart.products.reduce((total, item) => {
          const itemPrice = toSafeInteger(Number(item.bsPrice));
          const taxRate =
            item?.taxes &&
            Array.isArray(item.taxes) &&
            item.taxes.length > 0 &&
            item.taxes[0].amount
              ? Number(item.taxes[0].amount) / 100
              : 0;
          const itemTax = itemPrice * taxRate * item.quantity;
          return total + itemTax;
        }, 0);
        return fromSafeInteger(tax);
      },
      getRefCartTax: () => {
        const tax = get().cart.products.reduce((total, item) => {
          const itemPrice = toSafeInteger(Number(item.refPrice));
          const taxRate =
            item?.taxes &&
            Array.isArray(item.taxes) &&
            item.taxes.length > 0 &&
            item.taxes[0].amount
              ? Number(item.taxes[0].amount) / 100
              : 0;
          const itemTax = itemPrice * taxRate * item.quantity;
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
      setCart: (cart) => {
        const currentProducts = get().cart.products;

        const currentProductMap = new Map();
        currentProducts.forEach((product) => {
          currentProductMap.set(product.id.toString(), product);
        });

        // Filtrar el producto de entrega del carrito que viene del servidor
        const filteredCartProducts = process.env.NEXT_PUBLIC_DELIVERY_PRODUCT_ID
          ? cart.products.filter(
              (item) => item.id.toString() !== process.env.NEXT_PUBLIC_DELIVERY_PRODUCT_ID,
            )
          : cart.products;

        const mergedProducts = filteredCartProducts.map((item) => {
          const existingProduct = currentProductMap.get(item.id.toString());
          if (existingProduct) {
            return {
              ...existingProduct,
              id: item.id,
              prescriptionImg: item.prescriptionImg || existingProduct.prescriptionImg || '',
              quantity: item.quantity,
            };
          }
          return item;
        });

        set({
          cart: {
            ...cart,
            products: mergedProducts,
          },
        });
      },
      setDeliveryFee: (fee) => set({ deliveryFee: fee }),
      setCouponData: (data) => set({ couponData: data }),
      updateCartWithFullProducts: (products) => {
        const currentProducts = get().cart.products;

        const productMap = new Map();
        products.forEach((product) => {
          const productId = product.productId || product.id;
          productMap.set(productId.toString(), product);
        });

        // Actualizar los productos del carrito con la información completa
        // pero solo en el estado local, no en Firebase
        const updatedProducts = currentProducts.map((item) => {
          const fullProduct =
            productMap.get(item.id.toString()) ||
            Array.from(productMap.values()).find(
              (p) =>
                (p.productId && p.productId.toString() === item.id.toString()) ||
                (p.id && p.id.toString() === item.id.toString()),
            );

          if (fullProduct) {
            // Mantener la estructura mínima para Firebase (id, prescriptionImg, quantity)
            // pero agregar todos los detalles completos para el estado local
            return {
              ...item,
              ...fullProduct,
              quantity: item.quantity,
              id: item.id,
            };
          }
          console.log('No se encontró información completa para el producto:', item.id);
          return item;
        });

        set({
          cart: {
            ...get().cart,
            products: updatedProducts,
          },
        });
      },
      getSimplifiedCart: () => {
        const { id, userId, products } = get().cart;
        return {
          id,
          userId,
          updatedAt: new Date(),
          products: products.map((item) => ({
            id: item.id,
            prescriptionImg: item.prescriptionImg || '',
            quantity: item.quantity,
          })),
        };
      },
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
