import React from "react";
import { Product } from "@prisma/client";
import { Rating, Stack, Typography } from "@mui/material";
import Row from "../core/row";
import Column from "../core/column";
import ProductDiscountLabel from "./product-discount-label";
import CoreLink from "../core/core-link";
import ProductPriceLabel from "./product-price-label";
import ProductDispatchLocationInfo from "./product-dispatch-location-info";
import Spacer from "../core/spacer";
import { removeDashFromString } from "@/utils/format";

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
        </Stack>
    );
};

export default ProductDetails;
