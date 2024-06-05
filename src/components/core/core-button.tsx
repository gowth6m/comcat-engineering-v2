import React from "react";
import { Button, ButtonProps } from "@mui/material";

// -----------------------------------------------------------

interface Props extends ButtonProps {
    buttonVariant: "primary" | "secondary" | "tertiary" | "text";
    children: React.ReactNode;
    size?: "small" | "medium" | "large";
}

const CoreButton: React.FC<Props> = ({
    buttonVariant,
    children,
    size = "small",
    ...props
}) => {
    switch (buttonVariant) {
        case "primary":
            props.variant = "contained";
            props.color = "primary";
            break;
        case "secondary":
            props.variant = "outlined";
            props.color = "primary";
            break;
        case "tertiary":
            props.variant = "outlined";
            props.color = "primary";
            break;
        case "text":
            props.variant = "text";
            props.color = "primary";
            break;
    }

    return (
        <Button size={size} {...props}>
            {children}
        </Button>
    );
};

export default CoreButton;
