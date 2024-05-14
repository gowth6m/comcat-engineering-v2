import React from "react";
import { CardMedia, SxProps } from "@mui/material";

// ------------------------------------------------------------

interface Props {
    sx?: SxProps;
}

const GCELogo: React.FC<Props> = ({ sx }) => {
    return (
        <CardMedia
            component="img"
            image={"/logo/logo_transparent.svg"}
            alt="Student Halls Logo"
            sx={{
                width: 64,
                height: 64,
                ...sx,
            }}
        />
    );
};

export default GCELogo;
