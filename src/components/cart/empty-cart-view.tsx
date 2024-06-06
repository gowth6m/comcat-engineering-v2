import { Container, Divider, Link, Typography } from "@mui/material";
import React from "react";
import Column from "../core/column";
import CoreButton from "../core/core-button";
import ProductContactInfo from "../product/product-contact-info";

// -----------------------------------------------------------

const EmptyCartView = () => {
    return (
        <Container>
            <Column marginY={4} justifyContent={"center"} alignItems={"center"}>
                <Typography variant="h3">Your cart is empty.</Typography>

                <CoreButton
                    size="medium"
                    buttonVariant="primary"
                    href={"/"}
                    variant="contained"
                    sx={{
                        width: "fit-content",
                    }}
                >
                    Continue shopping
                </CoreButton>
            </Column>
            <Divider flexItem />

            <Column marginY={4} justifyContent={"center"} alignItems={"center"}>
                <ProductContactInfo
                    fontVariant="body1"
                    alignItems="center"
                    justifyContent="center"
                />
            </Column>
        </Container>
    );
};

export default EmptyCartView;
