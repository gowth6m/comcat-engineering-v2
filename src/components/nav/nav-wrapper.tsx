import React from "react";
import Navbar from "./navbar";
import { Box } from "@mui/material";
import Footer, { FOOTER_HEIGHT } from "../footer/footer";

// ------------------------------------------------------------

export const APPBAR_HEIGHT = 64;

interface Props {
    children: React.ReactNode;
}

const NavWrapper = ({ children }: Props) => {
    return (
        <>
            <Navbar />
            <Box
                sx={{
                    height: {
                        xs: APPBAR_HEIGHT,
                        md: APPBAR_HEIGHT,
                    },
                }}
            />
            <Box
                minHeight={`calc(100vh - ${APPBAR_HEIGHT}px - ${FOOTER_HEIGHT}px)`}
            >
                {children}
            </Box>
            <Footer />
        </>
    );
};

export default NavWrapper;
