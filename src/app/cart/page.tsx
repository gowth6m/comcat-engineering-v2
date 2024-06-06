"use client";

import React from "react";
import Row from "@/components/core/row";
import Column from "@/components/core/column";
import { useCartStore } from "@/stores/cart-store";
import CartItem from "@/components/cart/cart-item";
import { Container, Divider, Typography } from "@mui/material";
import EmptyCartView from "@/components/cart/empty-cart-view";
import { formatAmount } from "@/utils/format";
import { Cart } from "@/types/cart.type";

// -----------------------------------------------------------

export default function CartPage() {
    const { cart } = useCartStore();

    if (cart.itemCount === 0) {
        return <EmptyCartView />;
    }

    return (
        <Container>
            <Row gap={4}>
                <Column marginY={4} flex={3}>
                    <Typography variant="h4">{`You have ${cart.itemCount} items in your cart`}</Typography>

                    {cart.items.map((item) => (
                        <CartItem
                            key={item.item.id}
                            item={item.item}
                            qty={item.quantity}
                        />
                    ))}

                    <Divider flexItem />

                    <Column gap={0.5}>
                        <Row
                            justifyContent={"space-between"}
                            alignItems={"center"}
                        >
                            <Typography variant="h5">Subtotal</Typography>
                            <Typography variant="h5">
                                {formatAmount(cart.total)}
                            </Typography>
                        </Row>

                        <Row
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            color={"text.secondary"}
                        >
                            <Typography variant="subtitle1">Savings</Typography>
                            <Typography variant="subtitle1">
                                {calculateSaving(cart)}
                            </Typography>
                        </Row>
                    </Column>
                </Column>

                {/*
                 * RIGHT COLUMN
                 */}
                <Column
                    marginY={4}
                    flex={1}
                    sx={{
                        backgroundColor: "secondary.light",
                        color: "secondary.contrastText",
                        borderRadius: 1,
                        padding: 2,
                    }}
                >
                    <Typography variant="h4">Cart summary</Typography>
                    <Typography variant="body1">
                        Total Items: {cart.itemCount}
                    </Typography>
                    <Typography variant="body1">
                        Total Price: {formatAmount(cart.total)}
                    </Typography>
                </Column>
            </Row>
        </Container>
    );
}

const calculateSaving = (cart: Cart) => {
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

    return formatAmount(priceBeforeDiscount - priceAfterDiscount);
};
