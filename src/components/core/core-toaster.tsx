"use client";

import React from "react";
import { useTheme } from "@mui/material";
import { Toaster, ToasterProps } from "react-hot-toast";

// --------------------------------------------------

interface Props extends ToasterProps {}

const CoreToaster: React.FC<Props> = ({ ...props }) => {
    const theme = useTheme();

    return (
        <Toaster
            toastOptions={{
                style: {
                    width: "360px",
                },
                success: {
                    style: {
                        background: theme.palette.success.main,
                        color: theme.palette.common.white,
                    },
                },
                error: {
                    style: {
                        background: theme.palette.error.main,
                        color: theme.palette.common.white,
                    },
                },
            }}
            position="top-center"
            {...props}
        />
    );
};

export default CoreToaster;
