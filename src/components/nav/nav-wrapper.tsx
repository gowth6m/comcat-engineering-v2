"use server";

import React from "react";
import Navbar from "./navbar";
import { Box } from "@mui/material";
import { auth } from "@/auth";

// ------------------------------------------------------------

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
                        xs: 64,
                        md: 64,
                    },
                }}
            />
            {children}
        </>
    );
};

export default NavWrapper;
