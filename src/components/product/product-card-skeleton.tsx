import { Card, CardContent, Skeleton, Stack } from "@mui/material";
import React from "react";

// -----------------------------------------------------------

const ProductCardSkeleton = () => {
    return (
        <Card
            variant={"outlined"}
            sx={{
                width: 240,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: 1,
            }}
        >
            <CardContent
                sx={{
                    flexGrow: 1,
                }}
            >
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={140}
                    sx={{
                        borderRadius: 1,
                    }}
                />
                <Skeleton
                    variant="text"
                    width="80%"
                    height={32}
                    sx={{
                        marginTop: 2,
                    }}
                />
            </CardContent>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
                sx={{ paddingX: 2, paddingBottom: 2 }}
            >
                <Skeleton variant="text" width="30%" height={24} />
                <Skeleton
                    variant="rectangular"
                    width={80}
                    height={36}
                    sx={{
                        borderRadius: 1,
                    }}
                />
            </Stack>
        </Card>
    );
};

export default ProductCardSkeleton;
