import { Typography } from "@mui/material";
import { Product } from "@prisma/client";
import React from "react";

interface Props {
    product: Product;
    textVariant?: "h5" | "h6" | "subtitle1" | "subtitle2" | "body1";
}

const ProductPriceLabel: React.FC<Props> = ({ product, textVariant }) => {
    return (
        <Typography variant={textVariant ?? "subtitle1"}>
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
    );
};

/**
 * Calculate discounted price based on the discount percentage and rounded to 2 decimal places
 */
const calculateDiscountedPrice = (price: number, discount: number) => {
    return (price + (price * discount) / 100).toFixed(2);
};

export default ProductPriceLabel;
