import { Box, Typography } from "@mui/material";
import React from "react";
import CoreIcon from "../core/core-icon";

interface Props {
    message: string | null;
}

const ErrorMessage: React.FC<Props> = ({ message }) => {
    if (!message) return null;

    return (
        <Box
            sx={{
                backgroundColor: "error.lighter",
                color: "error.main",
                px: 2,
                py: 1,
                borderRadius: 1,
            }}
        >
            <Typography
                variant="body1"
                color="error"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                }}
            >
                <CoreIcon.WarningCircle size={18} /> {message}
            </Typography>
        </Box>
    );
};

export default ErrorMessage;
