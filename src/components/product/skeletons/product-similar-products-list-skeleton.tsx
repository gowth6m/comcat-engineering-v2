import Column from "@/components/core/column";
import { Skeleton } from "@mui/material";
import React from "react";
import ProductSimilarCardSkeleton from "./product-similar-card-skeleton";

const ProductSimilarProductsListSkeleton = () => {
    return (
        <Column flex={1}>
            <Skeleton
                variant={"text"}
                width={200}
                height={40}
                sx={{
                    marginBottom: 1,
                    marginLeft: 1,
                }}
            />
            <Column gap={2}>
                {Array(4)
                    .fill(0)
                    .map((_, index) => (
                        <ProductSimilarCardSkeleton key={index} />
                    ))}
            </Column>
        </Column>
    );
};

export default ProductSimilarProductsListSkeleton;
