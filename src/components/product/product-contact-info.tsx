import React from "react";
import Column from "../core/column";
import { Box, Typography } from "@mui/material";
import CoreIcon from "../core/core-icon";
import CoreLink from "../core/core-link";
import Row from "../core/row";

// -----------------------------------------------------------

interface Props {
    email?: string;
    phone?: string;
    fontVariant?: "body1" | "caption";
    justifyContent?: "flex-start" | "center" | "flex-end";
    alignItems?: "flex-start" | "center" | "flex-end";
}

const ProductContactInfo: React.FC<Props> = ({
    email = "contact@greatcomcatengineering.com",
    phone = "+44 123 456 789",
    fontVariant = "caption",
    justifyContent,
    alignItems,
}) => {
    return (
        <Column
            gap={0.5}
            justifyContent={justifyContent}
            alignItems={alignItems}
        >
            <Typography variant={fontVariant}>
                For more information, please contact us at{" "}
            </Typography>
            <Box>
                <Row gap={1} alignItems={"center"}>
                    <CoreIcon.Phone size={16} />
                    <Typography variant={fontVariant} color="textSecondary">
                        {phone}
                    </Typography>
                </Row>
            </Box>
            <CoreLink
                href={`mailto:${email}`}
                underline="hover"
                target={"_blank"}
                sx={{
                    display: "block",
                    color: "text.secondary",
                    width: "fit-content",
                    "&:hover": {
                        color: "primary.main",
                    },
                }}
            >
                <Row gap={1} alignItems={"center"}>
                    <CoreIcon.EnvelopeSimple size={16} />
                    <Typography variant={fontVariant}>{email}</Typography>
                </Row>
            </CoreLink>
        </Column>
    );
};

export default ProductContactInfo;
