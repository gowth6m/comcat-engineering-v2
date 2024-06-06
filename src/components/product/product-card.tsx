import React from "react";
import { Box, Card, CardMedia, Rating, Stack, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { Product } from "@prisma/client";
import CoreButton from "../core/core-button";
import { useCartStore } from "@/stores/cart-store";
import { useRouter } from "next/navigation";
import ProductDiscountLabel from "./product-discount-label";
import ProductPriceLabel from "./product-price-label";

// -----------------------------------------------------------

interface Props {
    product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
    const router = useRouter();
    const { addToCart, cart } = useCartStore();

    /**
     * Function to add product to cart
     */
    const handleAddToCart = () => {
        const item = cart.items.find((item) => item.item.id === product.id);

        if (item && item.quantity === product.countInStock)
            return toast.error("Item limit reached");

        if (product.countInStock === 0) return toast.error("Out of stock");

        addToCart(product, 1);

        toast.success("Added to cart");
    };

    /**
     * Function to open product details
     */
    const handleOpenProductDetails = () => {
        router.push(`/product/${product.slug}`, { scroll: true });
    };

    return (
        <Card
            component={"button"}
            elevation={0}
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                paddingY: 2,
                gap: 1,
            }}
            onClick={handleOpenProductDetails}
        >
            <CardMedia
                component="img"
                image={product.images?.[0]}
                alt={product.name}
                sx={{
                    height: 200,
                    width: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    borderRadius: 1,
                }}
            />

            <Typography
                variant={"subtitle2"}
                sx={{
                    textAlign: "left",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    fontWeight: 600,
                }}
            >
                {product.name}
            </Typography>

            <ProductDiscountLabel product={product} />

            <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                <Rating
                    name="product-rating"
                    value={product.rating}
                    size={"small"}
                    readOnly
                    sx={{
                        mx: 0,
                    }}
                />

                <Typography variant={"body2"} color={"text.secondary"}>
                    {`(${product.numReviews} reviews)`}
                </Typography>
            </Stack>

            <ProductPriceLabel product={product} />

            <CoreButton
                buttonVariant={"primary"}
                onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart();
                }}
                fullWidth
                sx={{
                    marginTop: "auto",
                }}
            >
                Add to Cart
            </CoreButton>
        </Card>
    );
};

export default ProductCard;
