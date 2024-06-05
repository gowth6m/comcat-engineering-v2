import useIsMobile from "@/hooks/useIsMobile";
import { Stack, StackProps, SxProps } from "@mui/material";
import React from "react";

interface Props extends StackProps {
    children: React.ReactNode;
    mobileDirection?: "column" | "row" | "column-reverse" | "row-reverse";
    fullWidth?: boolean;
    fullHeight?: boolean;
    gap?: number;
    sx?: SxProps;
}

const Column: React.FC<Props> = ({
    children,
    mobileDirection = "column",
    fullWidth = true,
    fullHeight = true,
    gap = 2,
    sx,
    ...props
}) => {
    const isMobile = useIsMobile();

    return (
        <Stack
            flexDirection={isMobile ? mobileDirection : "column"}
            sx={{
                width: fullWidth ? "100%" : null,
                height: fullHeight ? "100%" : null,
                gap: gap,
                ...sx,
            }}
            {...props}
        >
            {children}
        </Stack>
    );
};

export default Column;
