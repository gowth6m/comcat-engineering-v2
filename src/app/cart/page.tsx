"use client";

import React from "react";
import { useCartStore } from "@/stores/cart-store";
import { Container } from "@mui/material";
import Column from "@/components/core/column";

// -----------------------------------------------------------

export default function CartPage() {
    const { cart } = useCartStore();

    return (
        <Container>
            <Column marginY={4}>
                <h1>Cart</h1>
                <h2>Items in cart: {cart.itemCount}</h2>
            </Column>
        </Container>
    );
}
