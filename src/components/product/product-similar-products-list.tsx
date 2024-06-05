import ApiClient from "@/services/api-client";
import { Typography } from "@mui/material";
import { Product } from "@prisma/client";
import React from "react";
import { useQuery } from "react-query";
import Column from "../core/column";
import ProductSimilarCard from "./product-similar-card";
import ProductSimilarCardSkeleton from "./skeletons/product-similar-card-skeleton";

// -----------------------------------------------------------

interface Props {
    product: Product;
}

const ProductSimilarProductsList: React.FC<Props> = ({ product }) => {
    const similarProducts = useQuery({
        queryKey: ["getSimilarProducts", product.slug],
        queryFn: async () => {
            return await ApiClient.product.getSimilarProducts(product.slug);
        },
    });

    if (similarProducts.isLoading)
        return (
            <Column flex={1}>
                <Typography variant="h5" gutterBottom>
                    Similar Products
                </Typography>
                <Column gap={2}>
                    {Array(4)
                        .fill(0)
                        .map((_, index) => (
                            <ProductSimilarCardSkeleton key={index} />
                        ))}
                </Column>
            </Column>
        );

    if (similarProducts.isError || !similarProducts.data?.data.data)
        return (
            <Column flex={1}>
                <Typography variant="h5" gutterBottom>
                    Similar Products
                </Typography>
                <Typography variant="body1" color="error">
                    Failed to load similar products
                </Typography>
            </Column>
        );

    return (
        <Column flex={1}>
            <Typography variant="h5" gutterBottom>
                Similar Products
            </Typography>
            <Column gap={2}>
                {similarProducts.data?.data.data.map((product) => (
                    <ProductSimilarCard key={product.id} product={product} />
                ))}
            </Column>
        </Column>
    );
};

export default ProductSimilarProductsList;
