"use client";

import React from "react";
import Row from "@/components/core/row";
import Column from "@/components/core/column";
import { useCartStore } from "@/stores/cart-store";
import CartItem from "@/components/cart/cart-item";
import { Container, Divider, Typography } from "@mui/material";
import EmptyCartView from "@/components/cart/empty-cart-view";
import { formatAmount } from "@/utils/format";
import CartSummary from "@/components/cart/cart-summary";
import { calculateSaving } from "@/utils/cart";
import { useQuery } from "react-query";
import ApiClient from "@/services/api-client";
import LoadingTopbar from "@/components/progress-bar/loading-topbar";

// -----------------------------------------------------------

export default function CartPage() {
    const { cart } = useCartStore();

    const settings = useQuery({
        queryKey: "settings",
        queryFn: () => ApiClient.settings.get(),
    });

    if (cart.itemCount === 0) {
        return <EmptyCartView />;
    }

    return (
        <Container>
            {settings.isLoading && <LoadingTopbar />}
            <Row gap={6}>
                {/*
                 * LEFT COLUMN (Cart items)
                 */}
                <Column marginY={4} flex={4}>
                    <Typography variant="h4">{`You have ${cart.itemCount} items in your cart`}</Typography>

                    <Divider flexItem />

                    {cart.items.map((item) => (
                        <React.Fragment key={item.item.id}>
                            <CartItem
                                key={item.item.id}
                                item={item.item}
                                qty={item.quantity}
                            />
                            <Divider flexItem />
                        </React.Fragment>
                    ))}

                    <Column gap={0.5}>
                        <Row
                            justifyContent={"space-between"}
                            alignItems={"center"}
                        >
                            <Typography variant="h5">{`Subtotal (${cart.itemCount} item)`}</Typography>
                            <Typography variant="h5">
                                <Typography
                                    variant="caption"
                                    color={"text.secondary"}
                                    sx={{ marginRight: 0.5 }}
                                >
                                    {`(incl. VAT)`}
                                </Typography>{" "}
                                {formatAmount(cart.totalBeforePromo)}
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
                 * RIGHT COLUMN (Cart summary)
                 */}
                <CartSummary settings={settings?.data?.data.data ?? null} />
            </Row>
        </Container>
    );
}
