import React, { useState } from "react";
import { Product } from "@prisma/client";
import CoreButton from "../core/core-button";
import { MenuItem, Rating, Select, Stack, Typography } from "@mui/material";
import Row from "../core/row";
import Column from "../core/column";
import { useCartStore } from "@/stores/cart-store";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ProductDiscountLabel from "./product-discount-label";
import CoreLink from "../core/core-link";
import ProductInformInStock from "./product-inform-in-stock";
import ProductPriceLabel from "./product-price-label";
import ProductDispatchLocationInfo from "./product-dispatch-location-info";
import Spacer from "../core/spacer";
import { removeDashFromString } from "@/utils/format";

// -----------------------------------------------------------

interface Props {
    product: Product;
}

const ProductDetails: React.FC<Props> = ({ product }) => {
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
        <Stack
            sx={{
                height: "100%",
                flex: 2,
                flexDirection: {
                    xs: "column",
                    md: "row",
                },
                gap: 4,
                alignItems: "flex-start",
                justifyContent: "center",
            }}
        >
            <Column flex={2} gap={0.5}>
                <Typography variant="h6">{product.name}</Typography>
                <CoreLink
                    href={`/brand/${product.brand}`}
                >{`Brand: ${removeDashFromString(product.brand)}`}</CoreLink>
                <Row gap={1} alignItems={"center"}>
                    <Rating
                        name="product-rating"
                        value={product.rating}
                        size={"small"}
                        readOnly
                        sx={{
                            mx: 0,
                        }}
                    />
                    <CoreLink
                        href={"#product-reviews"}
                        sx={{
                            color: "text.secondary",
                            textDecoration: "none",
                            "&:hover": {
                                color: "primary.main",
                            },
                        }}
                    >{`(${product.numReviews} reviews)`}</CoreLink>
                </Row>

                <Typography variant="body1">{product.description}</Typography>

                <Column gap={1} my={1}>
                    <ProductDiscountLabel product={product} />
                    <ProductPriceLabel product={product} textVariant={"h5"} />
                </Column>

                <Spacer height={8} />

                <ProductDispatchLocationInfo />
            </Column>

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
                        {`£${product.price}`}
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
                            product.countInStock > 0
                                ? "success.main"
                                : "error.main"
                        }
                    >
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </Typography>
                </Row>

                <Select
                    size={"small"}
                    value={quantity}
                    onChange={(event) =>
                        setQuantity(event.target.value as number)
                    }
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
        </Stack>
    );
};

export default ProductDetails;
