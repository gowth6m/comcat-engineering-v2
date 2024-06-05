import React from "react";
import { Box, Skeleton, Stack } from "@mui/material";
import Scrollbar from "../../scrollbar";

const ProductImageGallerySkeleton: React.FC = () => {
    return (
        <Stack
            sx={{
                flexDirection: "row",
                gap: 1,
                height: 300,
                overflow: "hidden",
            }}
        >
            {/* Gallery Skeleton */}
            <Scrollbar
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: 300,
                    width: 100,
                    gap: 1,
                }}
            >
                <Stack
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        paddingRight: 1,
                        gap: 1,
                    }}
                >
                    {[...Array(4)].map((_, index) => (
                        <Skeleton
                            key={index}
                            variant="rectangular"
                            width={100}
                            height={100}
                            sx={{
                                borderRadius: 1,
                                marginBottom: 1,
                            }}
                        />
                    ))}
                </Stack>
            </Scrollbar>

            {/* Main Image Skeleton */}
            <Box
                sx={{
                    width: 300,
                    height: 300,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Skeleton
                    variant="rectangular"
                    width={300}
                    height={300}
                    sx={{
                        borderRadius: 1,
                    }}
                />
            </Box>
        </Stack>
    );
};

export default ProductImageGallerySkeleton;
