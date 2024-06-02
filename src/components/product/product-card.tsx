import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import { Product } from "@prisma/client";
import CoreButton from "../core/core-button";
import { useCartStore } from "@/stores/cart-store";
import toast from "react-hot-toast";
import React from "react";

// -----------------------------------------------------------

interface Props {
    product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
    const { addToCart, cart } = useCartStore();

    const handleAddToCart = () => {
        const item = cart.items.find((item) => item.item.id === product.id);

        if (item && item.quantity === product.countInStock)
            return toast.error("Item limit reached");

        if (product.countInStock === 0) return toast.error("Out of stock");

        addToCart(product);
    };

    return (
        <Card
            variant={"outlined"}
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <CardContent>
                <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.name}
                    sx={{
                        height: 200,
                        width: "auto",
                        objectFit: "cover",
                        borderRadius: 1,
                    }}
                />
                <Typography variant={"subtitle1"}>{product.name}</Typography>
            </CardContent>
            <CardActions
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Typography variant={"subtitle2"}>${product.price}</Typography>
                <CoreButton buttonVariant={"primary"} onClick={handleAddToCart}>
                    Add to Cart
                </CoreButton>
            </CardActions>
        </Card>
    );
};

export default ProductCard;
