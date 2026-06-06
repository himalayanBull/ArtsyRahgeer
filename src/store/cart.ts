import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Artwork, CartItem } from "@/types";

interface CartState {
  items: CartItem[];
  addItem: (artwork: Artwork) => void;
  removeItem: (artworkId: string) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (artwork) => {
        const existing = get().items.find(
          (item) => item.artwork.id === artwork.id
        );
        if (existing) return;
        set({ items: [...get().items, { artwork, quantity: 1 }] });
      },
      removeItem: (artworkId) => {
        set({
          items: get().items.filter((item) => item.artwork.id !== artworkId),
        });
      },
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.length,
      totalPrice: () =>
        get().items.reduce((sum, item) => sum + item.artwork.price, 0),
    }),
    { name: "art-cart" }
  )
);
