"use client";

import React from "react";
import { useQuery } from "react-query";
import ApiClient from "@/services/api-client";
import { Container, Divider } from "@mui/material";
import ProductDetails from "@/components/product/product-details";
import LoadingTopbar from "@/components/progress-bar/loading-topbar";
import ProductImageGallery from "@/components/product/product-image-gallery";
import ProductReviews from "@/components/review/product-reviews";
import Row from "@/components/core/row";
import Column from "@/components/core/column";
import Spacer from "@/components/core/spacer";
import ProductSimilarProductsList from "@/components/product/product-similar-products-list";
import ProductActions from "@/components/product/product-actions";

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
            <Column marginY={4}>
                <Row gap={4}>
                    <ProductImageGallery
                        product={productQuery.data?.data.data}
                    />

                    <ProductDetails product={productQuery.data?.data.data} />

                    <ProductActions product={productQuery.data?.data.data} />
                </Row>

                <Divider flexItem />

                <Row gap={4}>
                    <ProductReviews product={productQuery.data?.data.data} />

                    <ProductSimilarProductsList
                        product={productQuery.data?.data.data}
                    />
                </Row>
            </Column>

            <Spacer height={4} />
        </Container>
    );
}
