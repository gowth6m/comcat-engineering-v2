"use client";

import React from "react";
import { useQuery } from "react-query";
import Row from "@/components/core/row";
import ApiClient from "@/services/api-client";
import Column from "@/components/core/column";
import Spacer from "@/components/core/spacer";
import { Container, Divider } from "@mui/material";
import ErrorView from "@/components/error/error-view";
import ProductDetails from "@/components/product/product-details";
import ProductReviews from "@/components/product/product-reviews";
import ProductActions from "@/components/product/product-actions";
import ProductImageGallery from "@/components/product/product-image-gallery";
import ProductSimilarProductsList from "@/components/product/product-similar-products-list";
import ProductDetailsSkeleton from "@/components/product/skeletons/product-details-skeleton";
import ProductActionsSkeleton from "@/components/product/skeletons/product-actions-skeleton";
import ProductReviewsSkeleton from "@/components/product/skeletons/product-reviews-skeleton";
import ProductImageGallerySkeleton from "@/components/product/skeletons/product-image-gallery-skeleton";
import ProductSimilarProductsListSkeleton from "@/components/product/skeletons/product-similar-products-list-skeleton";
import ProductHeaderBreadcrumb from "@/components/product/product-header-breadcrumb";

// -----------------------------------------------------------

interface Props {
    params: {
        slug: string;
    };
}

// -----------------------------------------------------------

export default function ProductPage({ params }: Props) {
    const productQuery = useQuery({
        queryKey: ["getProductBySlug", params.slug],
        queryFn: async () => {
            return await ApiClient.product.getProductBySlug(params.slug);
        },
    });

    if (productQuery.isLoading) return <SkeletalPage />;

    if (productQuery.isError || !productQuery.data?.data.data)
        return <ErrorView message={"Product not found"} statusCode={404} />;

    return (
        <Container>
            <Column margin={2}>
                <ProductHeaderBreadcrumb
                    product={productQuery.data?.data.data}
                />

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

// -----------------------------------------------------------

const SkeletalPage = () => {
    return (
        <Container>
            <Column marginY={2}>
                <ProductHeaderBreadcrumb product={null} />
                <Row gap={4}>
                    <ProductImageGallerySkeleton />
                    <ProductDetailsSkeleton />
                    <ProductActionsSkeleton />
                </Row>
                <Divider flexItem />
                <Row gap={4}>
                    <ProductReviewsSkeleton />
                    <ProductSimilarProductsListSkeleton />
                </Row>
            </Column>
            <Spacer height={4} />
        </Container>
    );
};
