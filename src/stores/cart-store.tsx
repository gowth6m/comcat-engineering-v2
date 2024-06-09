import { createJSONStorage, persist } from "zustand/middleware";
import { Product, PromoCode } from "@prisma/client";
import { AppConfig } from "@/configs/app-config";
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
    totalBeforePromo: number;
    promoCode: PromoCode | null;
};

type CartStoreState = {
    cart: Cart;
    addToCart: (product: Product, quantity: number) => void; // add item to cart
    removeFromCart: (productId: string) => void; // reduce quantity by 1 or remove item if quantity is 1
    clearItemFromCart: (productId: string) => void; // remove item from cart
    clearCart: () => void; // remove all items from cart
    setCartItemQuantity: (productId: string, quantity: number) => void; // set quantity of item in cart
    setPromoCode: (promoCode: PromoCode | null) => void; // set promo code
};

/**
 * Calculate total price of items in cart after applying promo code
 * @param items - CartItem[]
 * @param promoCode - PromoCode | null
 * @returns number
 */
const calculateTotal = (
    items: CartItem[],
    promoCode: PromoCode | null,
    withoutPromo?: boolean
) => {
    let total = items.reduce(
        (sum, item) => sum + item.item.price * item.quantity,
        0
    );
    if (promoCode && !withoutPromo) {
        total = total - (promoCode.discount / 100) * total;
    }
    return total;
};

/**
 * Store for managing the cart state
 * - cart: Cart - cart object containing items, itemCount, and total
 * - addToCart: (product: Product) => void - add item to cart
 * - removeFromCart: (productId: string) => void - reduce quantity by 1 or remove item if quantity is 1
 * - clearItemFromCart: (productId: string) => void - remove item from cart
 * - clearCart: () => void - remove all items from cart
 * - setCartItemQuantity: (productId: string, quantity: number) => void - set quantity of item in cart
 * - setPromoCode: (promoCode: PromoCode | null) => void - set promo code
 *
 * @returns CartStoreState
 */
export const useCartStore = create<CartStoreState>()(
    persist(
        (set) => ({
            cart: {
                items: [],
                itemCount: 0,
                total: 0,
                totalBeforePromo: 0,
                promoCode: null,
            },
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

                    const updatedTotal = calculateTotal(
                        updatedItems,
                        state.cart.promoCode
                    );

                    const updatedTotalBeforePromo = calculateTotal(
                        updatedItems,
                        state.cart.promoCode,
                        true
                    );

                    return {
                        cart: {
                            items: updatedItems,
                            itemCount: updatedItemCount,
                            total: updatedTotal,
                            totalBeforePromo: updatedTotalBeforePromo,
                            promoCode: state.cart.promoCode,
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

                    const updatedTotal = calculateTotal(
                        updatedItems,
                        state.cart.promoCode
                    );

                    const updatedTotalBeforePromo = calculateTotal(
                        updatedItems,
                        state.cart.promoCode,
                        true
                    );

                    return {
                        cart: {
                            items: updatedItems,
                            itemCount: updatedItemCount,
                            total: updatedTotal,
                            totalBeforePromo: updatedTotalBeforePromo,
                            promoCode: state.cart.promoCode,
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

                    const updatedTotal = calculateTotal(
                        updatedItems,
                        state.cart.promoCode
                    );

                    const updatedTotalBeforePromo = calculateTotal(
                        updatedItems,
                        state.cart.promoCode,
                        true
                    );

                    return {
                        cart: {
                            items: updatedItems,
                            itemCount: updatedItemCount,
                            total: updatedTotal,
                            totalBeforePromo: updatedTotalBeforePromo,
                            promoCode: state.cart.promoCode,
                        },
                    };
                }),
            clearCart: () =>
                set({
                    cart: {
                        items: [],
                        itemCount: 0,
                        total: 0,
                        totalBeforePromo: 0,
                        promoCode: null,
                    },
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

                    const updatedTotal = calculateTotal(
                        updatedItems,
                        state.cart.promoCode
                    );

                    const updatedTotalBeforePromo = calculateTotal(
                        updatedItems,
                        state.cart.promoCode,
                        true
                    );

                    return {
                        cart: {
                            items: updatedItems,
                            itemCount: updatedItemCount,
                            total: updatedTotal,
                            totalBeforePromo: updatedTotalBeforePromo,
                            promoCode: state.cart.promoCode,
                        },
                    };
                }),
            setPromoCode: (promoCode) =>
                set((state) => {
                    const updatedTotal = calculateTotal(
                        state.cart.items,
                        promoCode
                    );
                    return {
                        cart: {
                            ...state.cart,
                            total: updatedTotal,
                            promoCode: promoCode,
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
