import {
    Card,
    CardMedia,
    Skeleton,
    Stack,
    Typography,
    Box,
} from "@mui/material";
import React from "react";

// -----------------------------------------------------------

const ProductCardSkeleton = () => {
    return (
        <Card
            component={"div"}
            elevation={0}
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                paddingY: 1,
                gap: 1,
            }}
        >
            <Skeleton
                variant="rectangular"
                sx={{
                    height: 200,
                    width: "100%",
                    borderRadius: 1,
                }}
            />

            <Skeleton
                variant="text"
                width="80%"
                sx={{
                    textAlign: "left",
                    marginTop: 1,
                }}
            />

            <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                <Skeleton
                    variant="rectangular"
                    width="50px"
                    height="24px"
                    sx={{
                        borderRadius: 0.5,
                    }}
                />
                <Skeleton variant="text" width="100px" />
            </Stack>

            <Skeleton
                variant="text"
                width="90%"
                sx={{
                    textAlign: "left",
                    marginTop: 1,
                }}
            />
            <Skeleton
                variant="text"
                width="90%"
                sx={{
                    textAlign: "left",
                    marginTop: 0.5,
                }}
            />

            <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                <Skeleton variant="text" width="60px" />
                <Skeleton variant="text" width="60px" />
            </Stack>

            <Skeleton
                variant="rectangular"
                width="100%"
                height="36px"
                sx={{
                    borderRadius: 1,
                    marginTop: "auto",
                }}
            />
        </Card>
    );
};

export default ProductCardSkeleton;
