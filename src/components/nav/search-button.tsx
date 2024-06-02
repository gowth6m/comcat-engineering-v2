"use client";

import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import CoreIcon from "../core/core-icon";

// ----------------------------------------------------------------------------

const SearchButton = () => {
    return (
        <>
            <Tooltip title="Search">
                <IconButton>
                    <CoreIcon.MagnifyingGlass size={24} />
                </IconButton>
            </Tooltip>
        </>
    );
};

export default SearchButton;
