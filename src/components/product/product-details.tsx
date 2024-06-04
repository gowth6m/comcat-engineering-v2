import React from "react";
import { Product } from "@prisma/client";
import CoreButton from "../core/core-button";
import { Rating, Stack, Typography } from "@mui/material";

// -----------------------------------------------------------

interface Props {
    product: Product;
}

const ProductDetails: React.FC<Props> = ({ product }) => {
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
            <Stack direction={"column"} flex={2} gap={1}>
                <Typography variant="h6">{product.name}</Typography>
                <Stack direction={"row"} gap={1} alignItems={"center"}>
                    <Rating
                        name="product-rating"
                        value={product.rating}
                        size={"small"}
                        readOnly
                        sx={{
                            mx: 0,
                        }}
                    />
                    <Typography variant="body2">{`${product.numReviews} reviews`}</Typography>
                </Stack>
                <Typography variant="body1">{product.description}</Typography>
                <Typography variant="h5">{`£${product.price}`}</Typography>
            </Stack>

            <Stack
                direction={"column"}
                flex={1}
                gap={1}
                sx={{
                    padding: 2,
                    borderRadius: 1,
                    border: 1,
                    borderColor: "divider",
                }}
            >
                <Stack
                    direction={"row"}
                    gap={1}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Typography variant={"subtitle1"} color={"text.secondary"}>
                        Price
                    </Typography>
                    <Typography variant={"subtitle1"}>
                        {`£${product.price}`}
                    </Typography>
                </Stack>

                <Stack
                    direction={"row"}
                    gap={1}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Typography variant={"subtitle1"} color={"text.secondary"}>
                        Status
                    </Typography>
                    <Typography variant={"subtitle1"}>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </Typography>
                </Stack>

                <CoreButton buttonVariant={"primary"} fullWidth>
                    Add to Cart
                </CoreButton>
            </Stack>
        </Stack>
    );
};

export default ProductDetails;
