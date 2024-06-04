import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";

export const FOOTER_HEIGHT = 100;

const Footer = () => {
    return (
        <Box
            sx={{
                backgroundColor: "secondary.main",
                width: "100%",
                minHeight: FOOTER_HEIGHT,
            }}
        >
            <Container>
                <Stack
                    sx={{
                        padding: 2,
                    }}
                >
                    <Typography variant={"body2"} color={"text.secondary"}>
                        © 2021 All rights reserved
                    </Typography>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;
