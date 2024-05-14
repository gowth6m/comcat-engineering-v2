import { Box } from "@mui/material";
import React from "react";
import Navbar from "./navbar";

// ------------------------------------------------------------

interface Props {
    children: React.ReactNode;
}

const NavWrapper: React.FC<Props> = ({ children }) => {
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
