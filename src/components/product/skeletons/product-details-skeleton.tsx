import React from "react";
import { Skeleton, Stack } from "@mui/material";
import Column from "@/components/core/column";
import Row from "@/components/core/row";
import Spacer from "@/components/core/spacer";

// -----------------------------------------------------------

const ProductDetailsSkeleton: React.FC = () => {
    return (
        <Stack
            sx={{
                height: "100%",
                flex: 2,
                flexDirection: {
                    xs: "column",
                    md: "row",
                },
                gap: 4,
                alignItems: "flex-start",
                justifyContent: "center",
            }}
        >
            <Column flex={2} gap={0.5}>
                <Skeleton variant="text" width="60%" height={32} />
                <Skeleton variant="text" width="40%" height={24} />
                <Row gap={1} alignItems={"center"}>
                    <Skeleton variant="circular" width={20} height={20} />
                    <Skeleton variant="text" width="60px" height={24} />
                </Row>
                <Skeleton variant="text" width="80%" height={24} />
                <Column gap={1} my={1}>
                    <Skeleton variant="text" width="40%" height={24} />
                    <Skeleton variant="text" width="60%" height={32} />
                </Column>
                <Spacer height={8} />
                <Skeleton variant="rectangular" width="100%" height={40} />
            </Column>
        </Stack>
    );
};

export default ProductDetailsSkeleton;
