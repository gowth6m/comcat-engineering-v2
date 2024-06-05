import { useMediaQuery, useTheme } from "@mui/material";

/**
 * Returns a boolean depending the screen is according to MUI theme definition
 * md - 900px
 *
 * @returns True if mobile screen size, else false
 */
const useIsMobile = () => {
    const theme = useTheme();
    const isMobile: boolean = useMediaQuery(theme.breakpoints.down("md"));
    return isMobile;
};

export default useIsMobile;
