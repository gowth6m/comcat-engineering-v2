import { Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import Column from "../core/column";
import CoreButton from "../core/core-button";

interface ErrorViewProps {
    message?: string;
    statusCode?: number;
}

const ErrorView: React.FC<ErrorViewProps> = ({ message, statusCode }) => {
    const router = useRouter();

    return (
        <Container>
            <Column justifyContent={"center"} alignItems={"center"} marginY={8}>
                <Typography variant={"h2"}>{statusCode}</Typography>
                <Typography variant={"h5"}>{message}</Typography>

                <CoreButton
                    size="large"
                    buttonVariant={"primary"}
                    onClick={() => router.push("/")}
                >
                    Go back home
                </CoreButton>
            </Column>
        </Container>
    );
};

export default ErrorView;
