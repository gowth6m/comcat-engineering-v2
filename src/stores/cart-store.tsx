import { createJSONStorage, persist } from "zustand/middleware";
import { AppConfig } from "@/configs/app-config";
import { Product } from "@prisma/client";
import { create } from "zustand";

// -----------------------------------------------------------

export type CartItem = {
    item: Product;
    quantity: number;
};

export type Cart = {
    items: CartItem[];
    itemCount: number;
    total: number;
};

type CartStoreState = {
    cart: Cart;
    addToCart: (product: Product, quantity: number) => void; // add item to cart
    removeFromCart: (productId: string) => void; // reduce quantity by 1 or remove item if quantity is 1
    clearItemFromCart: (productId: string) => void; // remove item from cart
    clearCart: () => void; // remove all items from cart
    setCartItemQuantity: (productId: string, quantity: number) => void; // set quantity of item in cart
};

/**
 * Store for managing the cart state
 * - cart: Cart - cart object containing items, itemCount, and total
 * - addToCart: (product: Product) => void - add item to cart
 * - removeFromCart: (productId: string) => void - reduce quantity by 1 or remove item if quantity is 1
 * - clearItemFromCart: (productId: string) => void - remove item from cart
 * - clearCart: () => void - remove all items from cart
 *
 * @returns CartStoreState
 */
export const useCartStore = create<CartStoreState>()(
    persist(
        (set) => ({
            cart: { items: [], itemCount: 0, total: 0 },
            addToCart: (product, quantity) =>
                set((state) => {
                    const existingCartItem = state.cart.items.find(
                        (item) => item.item.id === product.id
                    );

                    let updatedItems;
                    if (existingCartItem) {
                        updatedItems = state.cart.items.map((item) =>
                            item.item.id === product.id
                                ? {
                                      ...item,
                                      quantity: item.quantity + quantity,
                                  }
                                : item
                        );
                    } else {
                        updatedItems = [
                            ...state.cart.items,
                            { item: product, quantity: quantity },
                        ];
                    }

                    const updatedItemCount = updatedItems.reduce(
                        (count, item) => count + item.quantity,
                        0
                    );

                    const updatedTotal = updatedItems.reduce(
                        (sum, item) => sum + item.item.price * item.quantity,
                        0
                    );

                    return {
                        cart: {
                            items: updatedItems,
                            itemCount: updatedItemCount,
                            total: updatedTotal,
                        },
                    };
                }),
            removeFromCart: (productId) =>
                set((state) => {
                    const updatedItems = state.cart.items
                        .map((item) =>
                            item.item.id === productId
                                ? { ...item, quantity: item.quantity - 1 }
                                : item
                        )
                        .filter((item) => item.quantity > 0);

                    const updatedItemCount = updatedItems.reduce(
                        (count, item) => count + item.quantity,
                        0
                    );

                    const updatedTotal = updatedItems.reduce(
                        (sum, item) => sum + item.item.price * item.quantity,
                        0
                    );

                    return {
                        cart: {
                            items: updatedItems,
                            itemCount: updatedItemCount,
                            total: updatedTotal,
                        },
                    };
                }),
            clearItemFromCart: (productId) =>
                set((state) => {
                    const updatedItems = state.cart.items.filter(
                        (item) => item.item.id !== productId
                    );

                    const updatedItemCount = updatedItems.reduce(
                        (count, item) => count + item.quantity,
                        0
                    );

                    const updatedTotal = updatedItems.reduce(
                        (sum, item) => sum + item.item.price * item.quantity,
                        0
                    );

                    return {
                        cart: {
                            items: updatedItems,
                            itemCount: updatedItemCount,
                            total: updatedTotal,
                        },
                    };
                }),
            clearCart: () =>
                set({
                    cart: { items: [], itemCount: 0, total: 0 },
                }),
            setCartItemQuantity: (productId, quantity) =>
                set((state) => {
                    const updatedItems = state.cart.items.map((item) =>
                        item.item.id === productId
                            ? { ...item, quantity: quantity }
                            : item
                    );

                    const updatedItemCount = updatedItems.reduce(
                        (count, item) => count + item.quantity,
                        0
                    );

                    const updatedTotal = updatedItems.reduce(
                        (sum, item) => sum + item.item.price * item.quantity,
                        0
                    );

                    return {
                        cart: {
                            items: updatedItems,
                            itemCount: updatedItemCount,
                            total: updatedTotal,
                        },
                    };
                }),
        }),
        {
            name: AppConfig.localStorageKeys.cart,
            storage: createJSONStorage(() => localStorage),
        }
    )
);
