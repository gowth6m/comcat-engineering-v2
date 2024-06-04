import React from "react";
import { Box, Card, CardMedia, Rating, Stack, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { Product } from "@prisma/client";
import CoreButton from "../core/core-button";
import { useCartStore } from "@/stores/cart-store";
import { useRouter } from "next/navigation";

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

        addToCart(product);

        toast.success("Added to cart");
    };

    /**
     * Function to open product details
     */
    const handleOpenProductDetails = () => {
        router.push(`/product/${product.slug}`);
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

            {product.discount > 0 && (
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            backgroundColor: "error.main",
                            color: "error.contrastText",
                            borderRadius: 0.5,
                            paddingY: 0.5,
                            paddingX: 1,
                            fontWeight: 700,
                            fontSize: 12,
                        }}
                    >
                        {`${product.discount}% off`}
                    </Box>
                    <Typography color={"error"} fontWeight={700} fontSize={12}>
                        Limited time deal
                    </Typography>
                </Stack>
            )}

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

            <Typography variant={"subtitle1"}>
                {`£${product.price}`}

                {product.discount > 0 && (
                    <Typography
                        component={"span"}
                        color={"text.secondary"}
                        sx={{ mx: 1 }}
                    >
                        {`RRP: `}{" "}
                        <span className="line-through">
                            {`£${
                                product.discount > 0
                                    ? calculateDiscountedPrice(
                                          product.price,
                                          product.discount
                                      )
                                    : ""
                            }`}
                        </span>
                    </Typography>
                )}
            </Typography>

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

/**
 * Calculate discounted price based on the discount percentage and rounded to 2 decimal places
 */
const calculateDiscountedPrice = (price: number, discount: number) => {
    return (price + (price * discount) / 100).toFixed(2);
};

export default ProductCard;
