import { useCartStore } from "@/stores/cart-store";
import { formatAmount } from "@/utils/format";
import { Typography, Select, MenuItem } from "@mui/material";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Column from "../core/column";
import CoreButton from "../core/core-button";
import Row from "../core/row";
import ProductInformInStock from "./product-inform-in-stock";

// -----------------------------------------------------------

interface Props {
    product: Product;
}

const ProductActions: React.FC<Props> = ({ product }) => {
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);
    const { addToCart, cart } = useCartStore();

    const handleAddToCart = () => {
        const item = cart.items.find((item) => item.item.id === product.id);

        if (item && item.quantity === product.countInStock) {
            return toast.error("Item limit reached");
        }

        if (product.countInStock === 0) {
            return toast.error("Out of stock");
        }

        addToCart(product, quantity);
        toast.success("Added to cart");

        router.push("/cart");
    };

    return (
        <Column
            sx={{
                flex: 1,
                padding: 2,
                borderRadius: 1,
                border: 1,
                borderColor: "divider",
                backgroundColor: "secondary.lighter",
                color: "secondary.contrastText",
            }}
        >
            <Row alignItems={"center"} justifyContent={"space-between"}>
                <Typography
                    variant={"subtitle1"}
                    color={"secondary.contrastText"}
                >
                    Price
                </Typography>
                <Typography variant={"subtitle1"}>
                    {formatAmount(product.price)}
                </Typography>
            </Row>

            <Row alignItems={"center"} justifyContent={"space-between"}>
                <Typography
                    variant={"subtitle1"}
                    color={"secondary.contrastText"}
                >
                    Status
                </Typography>
                <Typography
                    variant={"subtitle1"}
                    color={
                        product.countInStock > 0 ? "success.main" : "error.main"
                    }
                >
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </Typography>
            </Row>

            <Select
                size={"small"}
                value={quantity}
                onChange={(event) => setQuantity(event.target.value as number)}
                sx={{
                    width: "100%",
                    borderRadius: 1,
                    backgroundColor: "secondary.contrastText",
                    display: product.countInStock === 0 ? "none" : "block",
                }}
                disabled={product.countInStock === 0}
            >
                {Array.from(
                    { length: product.countInStock },
                    (_, index) => index + 1
                ).map((value) => (
                    <MenuItem key={value} value={value}>
                        {value}
                    </MenuItem>
                ))}
            </Select>

            <CoreButton
                buttonVariant={"primary"}
                fullWidth
                onClick={handleAddToCart}
                disabled={product.countInStock === 0}
            >
                Add to cart
            </CoreButton>

            <CoreButton
                buttonVariant={"secondary"}
                fullWidth
                onClick={() => router.push("/cart")}
            >
                Go to cart
            </CoreButton>

            <ProductInformInStock product={product} />
        </Column>
    );
};

export default ProductActions;
