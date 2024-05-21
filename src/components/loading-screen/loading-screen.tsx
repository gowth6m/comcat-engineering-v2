import { BoxProps } from "@mui/material/Box";
import { StyledProgressBar } from "../progress-bar";

// ----------------------------------------------------------------------

export default function LoadingScreen({ sx, ...other }: BoxProps) {
    return <StyledProgressBar {...other} />;

    // return (
    // <Box
    //   sx={{
    //     px: 5,
    //     width: 1,
    //     flexGrow: 1,
    //     minHeight: 1,
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     ...sx,
    //   }}
    //   {...other}
    // >
    //   <LinearProgress color="inherit" sx={{ width: 1, maxWidth: 360 }} />
    // </Box>
    // );
}
