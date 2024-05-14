"use client";

import React from "react";
import { AppBar, Box, Container, IconButton, Toolbar } from "@mui/material";
import CoreIcon from "../core/core-icon";
import GCELogo from "../utils/gce-logo";
import NavLinks from "./nav-links";

const Navbar = () => {
    return (
        <AppBar
            elevation={0}
            sx={{
                backgroundColor: "secondary.main",
                boxShadow: "none",
                backdropFilter: "blur(10px)",
            }}
        >
            <Container maxWidth={"xl"}>
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row",
                    }}
                >
                    <GCELogo />

                    <NavLinks />

                    <Box display={"flex"} flexDirection={"row"} gap={0.5}>
                        <IconButton>
                            <CoreIcon.MagnifyingGlass size={24} />
                        </IconButton>

                        <IconButton>
                            <CoreIcon.User size={24} />
                        </IconButton>

                        <IconButton>
                            <CoreIcon.ShoppingCart size={24} />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
