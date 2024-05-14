import React from "react";
import { List } from "@mui/material";
import CoreLink from "../core/core-link";

const NAV_LINKS = [
    {
        title: "Home",
        path: "/",
    },
    {
        title: "Categories",
        path: "/categories",
    },
    {
        title: "My Account",
        path: "/account",
    },
    {
        title: "Services",
        path: "/services",
    },
    {
        title: "Contact",
        path: "/contact",
    },
];

const NavLinks = () => {
    return (
        <List
            sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                flexDirection: "row",
            }}
        >
            {NAV_LINKS.map((link) => (
                <CoreLink
                    key={link.title}
                    href={link.path}
                    sx={{
                        color: "white",
                        textDecoration: "none",
                        "&:hover": {
                            color: "primary.main",
                        },
                    }}
                >
                    {link.title}
                </CoreLink>
            ))}
        </List>
    );
};

export default NavLinks;
