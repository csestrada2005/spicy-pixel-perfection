import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  addLineToShopifyCart,
  createShopifyCart,
  fetchCartStatus,
  fetchFirstVariantByHandle,
  removeLineFromShopifyCart,
  updateShopifyCartLine,
  type ShopifyMoney,
} from "@/lib/shopify";

export type CartItem = {
  lineId: string | null;
  variantId: string;
  handle: string;
  title: string;
  variantTitle: string;
  image: string;
  price: ShopifyMoney;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  isLoading: boolean;
  isSyncing: boolean;
  addByHandle: (handle: string, fallbackTitle?: string, fallbackImage?: string) => Promise<void>;
  updateQuantity: (variantId: string, quantity: number) => Promise<void>;
  removeItem: (variantId: string) => Promise<void>;
  clearCart: () => void;
  syncCart: () => Promise<void>;
  getCheckoutUrl: () => string | null;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,
      checkoutUrl: null,
      isLoading: false,
      isSyncing: false,

      addByHandle: async (handle, fallbackTitle, fallbackImage) => {
        set({ isLoading: true });
        try {
          const variant = await fetchFirstVariantByHandle(handle);
          if (!variant) {
            const { toast } = await import("sonner");
            toast.error("Producto no disponible", {
              description: `No encontramos "${fallbackTitle ?? handle}" en la tienda.`,
            });
            return;
          }
          if (!variant.availableForSale) {
            const { toast } = await import("sonner");
            toast.error("Agotado", {
              description: `${variant.product.title} no está disponible por ahora.`,
            });
            return;
          }

          const newItem: CartItem = {
            lineId: null,
            variantId: variant.id,
            handle: variant.product.handle,
            title: variant.product.title || fallbackTitle || handle,
            variantTitle: variant.title,
            image:
              variant.image?.url ||
              variant.product.featuredImage?.url ||
              fallbackImage ||
              "",
            price: variant.price,
            quantity: 1,
          };

          const { items, cartId, clearCart } = get();
          const existing = items.find((i) => i.variantId === variant.id);

          if (!cartId) {
            const result = await createShopifyCart(variant.id, 1);
            if (result) {
              set({
                cartId: result.cartId,
                checkoutUrl: result.checkoutUrl,
                items: [{ ...newItem, lineId: result.lineId }],
              });
              const { toast } = await import("sonner");
              toast.success("Añadido al carrito", { description: newItem.title });
            }
          } else if (existing && existing.lineId) {
            const newQty = existing.quantity + 1;
            const result = await updateShopifyCartLine(cartId, existing.lineId, newQty);
            if (result.success) {
              set({
                items: get().items.map((i) =>
                  i.variantId === variant.id ? { ...i, quantity: newQty } : i,
                ),
              });
              const { toast } = await import("sonner");
              toast.success("Cantidad actualizada", { description: newItem.title });
            } else if (result.cartNotFound) {
              clearCart();
            }
          } else {
            const result = await addLineToShopifyCart(cartId, variant.id, 1);
            if (result.success) {
              set({
                items: [...get().items, { ...newItem, lineId: result.lineId ?? null }],
              });
              const { toast } = await import("sonner");
              toast.success("Añadido al carrito", { description: newItem.title });
            } else if (result.cartNotFound) {
              clearCart();
            }
          }
        } catch (err) {
          console.error("addByHandle failed:", err);
          const { toast } = await import("sonner");
          toast.error("Error al añadir al carrito");
        } finally {
          set({ isLoading: false });
        }
      },

      updateQuantity: async (variantId, quantity) => {
        if (quantity <= 0) {
          await get().removeItem(variantId);
          return;
        }
        const { items, cartId, clearCart } = get();
        const item = items.find((i) => i.variantId === variantId);
        if (!item?.lineId || !cartId) return;

        set({ isLoading: true });
        try {
          const result = await updateShopifyCartLine(cartId, item.lineId, quantity);
          if (result.success) {
            set({
              items: get().items.map((i) =>
                i.variantId === variantId ? { ...i, quantity } : i,
              ),
            });
          } else if (result.cartNotFound) {
            clearCart();
          }
        } finally {
          set({ isLoading: false });
        }
      },

      removeItem: async (variantId) => {
        const { items, cartId, clearCart } = get();
        const item = items.find((i) => i.variantId === variantId);
        if (!item?.lineId || !cartId) return;

        set({ isLoading: true });
        try {
          const result = await removeLineFromShopifyCart(cartId, item.lineId);
          if (result.success) {
            const remaining = get().items.filter((i) => i.variantId !== variantId);
            if (remaining.length === 0) clearCart();
            else set({ items: remaining });
          } else if (result.cartNotFound) {
            clearCart();
          }
        } finally {
          set({ isLoading: false });
        }
      },

      clearCart: () => set({ items: [], cartId: null, checkoutUrl: null }),
      getCheckoutUrl: () => get().checkoutUrl,

      syncCart: async () => {
        const { cartId, isSyncing, clearCart } = get();
        if (!cartId || isSyncing) return;
        set({ isSyncing: true });
        try {
          const status = await fetchCartStatus(cartId);
          if (!status) return;
          if (!status.exists || status.totalQuantity === 0) clearCart();
        } catch (err) {
          console.error("syncCart failed:", err);
        } finally {
          set({ isSyncing: false });
        }
      },
    }),
    {
      name: "spicy-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        cartId: state.cartId,
        checkoutUrl: state.checkoutUrl,
      }),
    },
  ),
);
