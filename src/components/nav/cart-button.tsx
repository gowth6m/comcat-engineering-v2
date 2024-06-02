"use client";

import React from "react";
import CoreIcon from "../core/core-icon";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cart-store";
import { Badge, IconButton, Tooltip } from "@mui/material";

// -----------------------------------------------------------

const CartButton = () => {
    const router = useRouter();
    const { cart } = useCartStore();

    return (
        <>
            <Tooltip
                title={`
                ${cart.length} items in cart
            `}
            >
                <IconButton onClick={() => router.push("/cart")}>
                    <Badge badgeContent={cart.length} color="primary">
                        <CoreIcon.ShoppingCart size={24} />
                    </Badge>
                </IconButton>
            </Tooltip>
        </>
    );
};

export default CartButton;
