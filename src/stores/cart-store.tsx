import { AppConfig } from "@/configs/app-config";
import { Product } from "@prisma/client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type CartStoreState = {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
};

export const useCartStore = create<CartStoreState>()(
    persist(
        (set) => ({
            cart: [],
            addToCart: (product) =>
                set((state) => ({
                    cart: [...state.cart, product],
                })),
            removeFromCart: (productId) =>
                set((state) => ({
                    cart: state.cart.filter(
                        (product) => product.id !== productId
                    ),
                })),
            clearCart: () => set({ cart: [] }),
        }),
        {
            name: AppConfig.localStorageKeys.cart,
            storage: createJSONStorage(() => localStorage),
        }
    )
);
