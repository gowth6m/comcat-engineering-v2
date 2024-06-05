"use client";

import React, { useState } from "react";
import { useQuery } from "react-query";
import ApiClient from "@/services/api-client";
import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import LoadingTopbar from "../progress-bar/loading-topbar";
import ProductCard from "../product/product-card";
import ProductCardSkeleton from "../product/skeletons/product-card-skeleton";

// -----------------------------------------------------------

const HeroProductsListing = () => {
    const [view, setView] = useState<
        "bestSellers" | "newArrivals" | "clearance"
    >("bestSellers");

    const handleOnViewChange = (event: React.MouseEvent<HTMLElement>) => {
        setView(
            event.currentTarget.id as
                | "bestSellers"
                | "newArrivals"
                | "clearance"
        );
    };

    const productsListing = useQuery({
        queryKey: ["getHeroProducts"],
        queryFn: async () => {
            return await ApiClient.product.getHeroProducts();
        },
    });

    return (
        <>
            {productsListing.isLoading && <LoadingTopbar />}

            <Stack
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                    paddingY: 1,
                }}
            >
                <ToggleButtonGroup
                    size="small"
                    value={view}
                    exclusive
                    onChange={handleOnViewChange}
                    aria-label="text alignment"
                >
                    {["bestSellers", "newArrivals", "clearance"].map((view) => (
                        <ToggleButton
                            key={view}
                            id={view}
                            value={view}
                            sx={{
                                px: 4,
                            }}
                        >
                            {view[0].toUpperCase() +
                                view.slice(1).replace(/([A-Z])/g, " $1")}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>

                {productsListing.isLoading ? (
                    <div className="grid grid-cols-3 lg:grid-cols-5 gap-4 w-full">
                        {Array.from({ length: 15 }).map((_, index) => (
                            <ProductCardSkeleton key={index} />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-3 lg:grid-cols-5 gap-4 w-full">
                        {productsListing.data?.data[view].map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </Stack>
        </>
    );
};

export default HeroProductsListing;
