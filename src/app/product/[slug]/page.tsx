"use client";

import React from "react";
import { Container, Stack } from "@mui/material";
import { useQuery } from "react-query";
import ApiClient from "@/services/api-client";
import LoadingTopbar from "@/components/progress-bar/loading-topbar";
import ProductImageGallery from "@/components/product/product-image-gallery";
import ProductDetails from "@/components/product/product-details";

// -----------------------------------------------------------

export default function ProductPage({
    params,
}: {
    params: {
        slug: string;
    };
}) {
    const productQuery = useQuery({
        queryKey: ["product", params.slug],
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
        </Container>
    );
}
