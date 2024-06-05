import React from "react";
import { Card, CardMedia, Typography } from "@mui/material";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import ProductDiscountLabel from "./product-discount-label";
import ProductPriceLabel from "./product-price-label";
import Row from "../core/row";
import Column from "../core/column";

interface Props {
    product: Product;
}

// -----------------------------------------------------------

const ProductSimilarCard: React.FC<Props> = ({ product }) => {
    const router = useRouter();

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
                gap: 1,
            }}
            onClick={handleOpenProductDetails}
        >
            <Row>
                <CardMedia
                    component="img"
                    image={product.images?.[0]}
                    alt={product.name}
                    sx={{
                        height: 100,
                        width: 100,
                        objectFit: "cover",
                        objectPosition: "center",
                        borderRadius: 1,
                    }}
                />
                <Column gap={1}>
                    <Typography
                        variant={"body1"}
                        sx={{
                            textAlign: "left",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            fontWeight: 500,
                        }}
                    >
                        {product.name}
                    </Typography>

                    <ProductDiscountLabel product={product} />

                    <ProductPriceLabel product={product} />
                </Column>
            </Row>
        </Card>
    );
};

export default ProductSimilarCard;
