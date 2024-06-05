import { Typography } from "@mui/material";
import React from "react";
import Column from "../core/column";
import CoreIcon from "../core/core-icon";
import CoreLink from "../core/core-link";
import Row from "../core/row";

// -----------------------------------------------------------

interface Props {
    email?: string;
    phone?: string;
}

const ProductContactInfo: React.FC<Props> = ({
    email = "contact@greatcomcatengineering.com",
    phone = "+44 123 456 789",
}) => {
    return (
        <Column gap={0.5}>
            <Typography variant="caption">
                For more information, please contact us at{" "}
            </Typography>

            <Row gap={1}>
                <CoreIcon.Phone size={16} />
                <Typography variant="caption" color="textSecondary">
                    {phone}
                </Typography>
            </Row>

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
                <Row gap={1}>
                    <CoreIcon.EnvelopeSimple size={16} />
                    <Typography variant="caption">{email}</Typography>
                </Row>
            </CoreLink>
        </Column>
    );
};

export default ProductContactInfo;
