import { Cart } from "@/types/cart.type";
import { formatAmount } from "./format";

export const calculateSaving = (cart: Cart) => {
    const priceAfterDiscount = cart.items.reduce((acc, cartItem) => {
        return acc + cartItem.item.price * cartItem.quantity;
    }, 0);

    const priceBeforeDiscount = cart.items.reduce((acc, cartItem) => {
        return (
            acc +
            cartItem.item.price *
            (cartItem.item.discount / 100 + 1) *
            cartItem.quantity
        );
    }, 0);

    const s = priceBeforeDiscount - priceAfterDiscount;

    if (s === 0) {
        return formatAmount(0);
    }

    return `-${formatAmount(priceBeforeDiscount - priceAfterDiscount)}`;
};

export const priceBeforeDiscountOrVAT = (cart: Cart) => {
    const total = cart.items.reduce((acc, cartItem) => {
        return (
            acc +
            cartItem.item.price *
            (cartItem.item.discount / 100 + 1) *
            cartItem.quantity
        );
    }, 0);

    return formatAmount(total - (cart.total * 0.2));
}

export const calculateSavingsFromPromo = (cart: Cart) => {
    if (cart.promoCode) {
        const totalBefore = cart.total + (cart.promoCode?.discount / 100) * cart.total;
        return formatAmount(totalBefore - cart.total);
    }

    return formatAmount(0);
}

export const totalAmount = (cart: Cart, deliveryCost?: number) => {
    if (!deliveryCost) {
        return formatAmount(cart.total);
    }
    return formatAmount(cart.total + deliveryCost);
}


export const calculateVATPayment = (cart: Cart, vat: number) => {
    return `${formatAmount(cart.total * vat / 100)}`;
}