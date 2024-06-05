import React from "react";
import { Skeleton, Typography, Stack } from "@mui/material";
import Column from "@/components/core/column";
import Row from "@/components/core/row";

// -----------------------------------------------------------

const ProductActionsSkeleton: React.FC = () => {
    return (
        <Column
            sx={{
                flex: 1,
                padding: 2,
                borderRadius: 1,
                border: 1,
                borderColor: "divider",
            }}
        >
            <Row alignItems={"center"} justifyContent={"space-between"}>
                <Skeleton variant="text" width={80} height={24} />
                <Skeleton variant="text" width={60} height={24} />
            </Row>

            <Row alignItems={"center"} justifyContent={"space-between"}>
                <Skeleton variant="text" width={80} height={24} />
                <Skeleton variant="text" width={80} height={24} />
            </Row>

            <Skeleton
                variant="rectangular"
                width="100%"
                height={40}
                sx={{ borderRadius: 1, display: "block" }}
            />

            <Stack gap={2} mt={2}>
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={40}
                    sx={{ borderRadius: 1 }}
                />
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={40}
                    sx={{ borderRadius: 1 }}
                />
            </Stack>
        </Column>
    );
};

export default ProductActionsSkeleton;
