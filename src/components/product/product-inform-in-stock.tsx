import React from "react";
import { Typography } from "@mui/material";
import { Product } from "@prisma/client";
import CoreIcon from "../core/core-icon";
import CoreLink from "../core/core-link";
import Column from "../core/column";
import Row from "../core/row";

// -----------------------------------------------------------

// TODO: Add to user's notify list

interface Props {
    product: Product;
}

const ProductInformInStock: React.FC<Props> = ({ product }) => {
    if (product.countInStock > 0) return null;

    return (
        <Column justifyContent={"center"} alignItems={"center"}>
            <CoreLink href={`/product/${product.slug}/notify`}>
                <Row alignItems={"center"} gap={1}>
                    <CoreIcon.Bell />
                    <Typography variant="caption" color={"primary"}>
                        Notify when back in stock
                    </Typography>
                </Row>
            </CoreLink>
        </Column>
    );
};

export default ProductInformInStock;
