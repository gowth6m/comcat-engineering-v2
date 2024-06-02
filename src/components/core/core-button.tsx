import React from "react";
import { Button, ButtonProps } from "@mui/material";

// -----------------------------------------------------------

interface Props extends ButtonProps {
    buttonVariant: "primary" | "secondary" | "tertiary";
    children: React.ReactNode;
}

const CoreButton: React.FC<Props> = ({ buttonVariant, children, ...props }) => {
    switch (buttonVariant) {
        case "primary":
            props.variant = "contained";
            props.color = "primary";
            break;
        case "secondary":
            props.variant = "contained";
            props.color = "secondary";
            break;
        case "tertiary":
            props.variant = "outlined";
            props.color = "primary";
            break;
    }

    return <Button {...props}>{children}</Button>;
};

export default CoreButton;
