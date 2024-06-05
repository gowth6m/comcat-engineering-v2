"use client";

import React from "react";
import Column from "@/components/core/column";
import { Container, Divider, Typography } from "@mui/material";
import { useCartStore } from "@/stores/cart-store";
import CartItem from "@/components/cart/cart-item";
import Row from "@/components/core/row";

// -----------------------------------------------------------

export default function CartPage() {
    const { cart } = useCartStore();

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

                    <Row justifyContent={"space-between"} alignItems={"center"}>
                        <Typography variant="h5">Subtotal:</Typography>
                        <Typography variant="h5">{`£${cart.total}`}</Typography>
                    </Row>
                </Column>

                <Column
                    marginY={4}
                    flex={1}
                    sx={{
                        backgroundColor: "secondary.light",
                        color: "secondary.contrastText",
                        padding: 2,
                        borderRadius: 1,
                    }}
                >
                    <Typography variant="h4">Cart Summary</Typography>
                    <Typography variant="body1">
                        Total Items: {cart.itemCount}
                    </Typography>
                    <Typography variant="body1">
                        Total Price: {cart.total}
                    </Typography>
                </Column>
            </Row>
        </Container>
    );
}
