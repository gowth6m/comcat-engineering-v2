import { Box, Chip, Stack, Typography } from "@mui/material";
import { Product } from "@prisma/client";
import React from "react";

interface Props {
    product: Product;
    flexDirection?: "row" | "column";
    justifyContent?: "flex-start" | "flex-end" | "center";
    width?: string | number;
    variant?: "product" | "cart";
}

const ProductDiscountLabel: React.FC<Props> = ({
    product,
    flexDirection = "row",
    variant = "product",
}) => {
    if (product.discount <= 0) {
        return null;
    }

    switch (variant) {
        case "product":
            return (
                <Stack
                    flexDirection={flexDirection}
                    alignItems={"center"}
                    gap={1}
                >
                    <Chip
                        size="small"
                        label={`${product.discount}% off`}
                        color={"error"}
                        sx={{
                            borderRadius: 0.5,
                            fontWeight: 600,
                            height: 26,
                        }}
                    />
                    <Typography color={"error"} fontWeight={700} fontSize={12}>
                        Limited time deal
                    </Typography>
                </Stack>
            );

        case "cart":
            return (
                <Stack
                    flexDirection={"column"}
                    alignItems={"flex-end"}
                    justifyContent={"flex-start"}
                    gap={1}
                >
                    <Chip
                        size="small"
                        label={`${product.discount}% off`}
                        color={"error"}
                        sx={{
                            borderRadius: 0.5,
                            fontWeight: 600,
                            height: 26,
                        }}
                    />
                    <Typography
                        color={"error"}
                        fontWeight={700}
                        fontSize={12}
                        textAlign={"right"}
                        sx={{
                            textWrap: "nowrap",
                        }}
                    >
                        Limited time deal
                    </Typography>
                </Stack>
            );

        default:
            return null;
    }
};

export default ProductDiscountLabel;
