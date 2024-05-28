"use client";

import ApiClient from "@/services/api-client";
import React from "react";
import { useQuery } from "react-query";

const AllProductGallery = () => {
    const allProducts = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            return await ApiClient.product.getAllProducts();
        },
    });

    return (
        <div>
            <div className="grid grid-cols-5 gap-2">
                {allProducts.data?.data?.data?.map((product: any) => (
                    <div key={product.id}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <img src={product.image} alt={product.name} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProductGallery;
