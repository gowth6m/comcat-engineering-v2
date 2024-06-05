import { Box } from "@mui/material";
import React from "react";

interface Props {
    height: number;
}

const Spacer = ({ height }: Props) => {
    return <Box height={height} />;
};

export default Spacer;
