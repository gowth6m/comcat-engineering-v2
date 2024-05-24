import React from "react";
import { Box, Typography } from "@mui/material";
import CoreIcon from "../core/core-icon";

// --------------------------------------------------

interface Props {
    message: string | null;
}

const ErrorMessage: React.FC<Props> = ({ message }) => {
    if (!message) return null;

    return (
        <Box
            sx={{
                backgroundColor: "error.main",
                color: "error.contrastText",
                borderRadius: 1,
                px: 2,
                py: 1,
            }}
        >
            <Typography
                variant="body1"
                sx={{
                    color: "error.contrastText",
                    alignItems: "center",
                    display: "flex",
                    gap: 1,
                }}
            >
                <CoreIcon.WarningCircle size={18} /> {message}
            </Typography>
        </Box>
    );
};

export default ErrorMessage;
