"use client";

import React, { useState } from "react";
import { useQuery } from "react-query";
import ApiClient from "@/services/api-client";
import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import LoadingTopbar from "../progress-bar/loading-topbar";

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
                }}
            >
                <ToggleButtonGroup
                    size="small"
                    value={view}
                    exclusive
                    onChange={handleOnViewChange}
                    aria-label="text alignment"
                >
                    <ToggleButton id="bestSellers" value="bestSellers">
                        Best Sellers
                    </ToggleButton>
                    <ToggleButton id="newArrivals" value="newArrivals">
                        New Arrivals
                    </ToggleButton>
                    <ToggleButton id="clearance" value="clearance">
                        Clearance
                    </ToggleButton>
                </ToggleButtonGroup>

                <div className="grid grid-cols-3 lg:grid-cols-5 gap-4">
                    {productsListing.data?.data[view].map((product) => (
                        <div key={product.id}>
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <img src={product.image} alt={product.name} />
                        </div>
                    ))}
                </div>
            </Stack>
        </>
    );
};

export default HeroProductsListing;
