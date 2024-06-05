import React from "react";
import Row from "../../core/row";
import Column from "../../core/column";
import { Card, Skeleton } from "@mui/material";

// -----------------------------------------------------------

const ProductSimilarCardSkeleton: React.FC = () => {
    return (
        <Card
            component={"div"}
            elevation={0}
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 1,
                padding: 1,
            }}
        >
            <Row>
                <Skeleton
                    variant="rectangular"
                    width={100}
                    height={100}
                    sx={{ borderRadius: 1 }}
                />
                <Column gap={1} sx={{ flex: 1 }}>
                    <Skeleton variant="text" width="100%" height={24} />
                    <Skeleton variant="text" width="60%" height={24} />
                    <Skeleton variant="text" width="40%" height={24} />
                </Column>
            </Row>
        </Card>
    );
};

export default ProductSimilarCardSkeleton;
