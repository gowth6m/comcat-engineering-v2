import React from "react";
import { Skeleton, List, ListItem, Rating } from "@mui/material";
import Column from "@/components/core/column";
import Row from "@/components/core/row";

// -----------------------------------------------------------

const ProductReviewsSkeleton: React.FC = () => {
    return (
        <Column
            id={"product-reviews"}
            sx={{
                flex: 2,
            }}
        >
            {/********************************
             * ADD REVIEW FORM SKELETON
             *******************************/}
            <Column
                component="div"
                gap={1}
                sx={{ paddingBottom: 2, borderBottom: "1px solid #e0e0e0" }}
            >
                <Skeleton variant="text" width="40%" height={32} />
                <Row alignItems={"center"} gap={1}>
                    <Skeleton variant="text" width="60%" height={24} />
                    <Rating name="simple-controlled" value={0} readOnly />
                </Row>
                <Skeleton variant="rectangular" width="100%" height={80} />
                <Skeleton
                    variant="rectangular"
                    width="30%"
                    height={40}
                    sx={{ marginTop: 1 }}
                />
            </Column>

            {/********************************
             * LIST OF REVIEWS SKELETON
             *******************************/}
            <Column gap={1} mt={2}>
                <Skeleton variant="text" width="40%" height={32} />
                <List>
                    {[...Array(3)].map((_, index) => (
                        <ListItem key={index} dense>
                            <Row gap={2} width="100%">
                                <Skeleton
                                    variant="circular"
                                    width={32}
                                    height={32}
                                />
                                <Column gap={0.5} flex={1}>
                                    <Row
                                        alignItems={"center"}
                                        justifyContent={"space-between"}
                                        gap={1}
                                    >
                                        <Skeleton
                                            variant="text"
                                            width="30%"
                                            height={24}
                                        />
                                        <Skeleton
                                            variant="text"
                                            width="20%"
                                            height={20}
                                        />
                                    </Row>
                                    <Rating value={0} size={"small"} readOnly />
                                    <Skeleton
                                        variant="text"
                                        width="80%"
                                        height={24}
                                    />
                                </Column>
                            </Row>
                        </ListItem>
                    ))}
                </List>
            </Column>
        </Column>
    );
};

export default ProductReviewsSkeleton;
