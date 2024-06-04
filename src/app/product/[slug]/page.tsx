"use client";

import React from "react";
import { useQuery } from "react-query";
import ApiClient from "@/services/api-client";
import { Container, Stack } from "@mui/material";
import ProductDetails from "@/components/product/product-details";
import LoadingTopbar from "@/components/progress-bar/loading-topbar";
import ProductImageGallery from "@/components/product/product-image-gallery";
import ProductReviews from "@/components/review/product-reviews";

// -----------------------------------------------------------

export default function ProductPage({
    params,
}: {
    params: {
        slug: string;
    };
}) {
    const productQuery = useQuery({
        queryKey: ["getProductBySlug", params.slug],
        queryFn: async () => {
            return await ApiClient.product.getProductBySlug(params.slug);
        },
    });

    if (productQuery.isLoading) return <LoadingTopbar />;

    if (productQuery.isError || !productQuery.data?.data.data)
        return <div>Error</div>;

    return (
        <Container>
            <Stack
                sx={{
                    flexDirection: {
                        xs: "column",
                        md: "row",
                    },
                    gap: 4,
                    alignItems: "flex-start",
                    justifyContent: "center",
                    height: "100%",
                    margin: 2,
                    marginY: 4,
                }}
            >
                <ProductImageGallery product={productQuery.data?.data.data} />

                <ProductDetails product={productQuery.data?.data.data} />
            </Stack>
            <ProductReviews product={productQuery.data?.data.data} />
        </Container>
    );
}
