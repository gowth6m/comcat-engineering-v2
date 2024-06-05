import { Box, Stack, Typography } from "@mui/material";
import { Product } from "@prisma/client";
import React from "react";

interface Props {
    product: Product;
}

const ProductDiscountLabel: React.FC<Props> = ({ product }) => {
    if (product.discount > 0)
        return (
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
        );

    return null;
};

export default ProductDiscountLabel;
