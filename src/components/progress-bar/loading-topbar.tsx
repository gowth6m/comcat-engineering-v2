import { Box, LinearProgress } from "@mui/material";

// ----------------------------------------------------------------------

const LoadingTopbar = () => {
    return (
        <Box sx={styles.Box}>
            <LinearProgress style={styles.LinearProgress} />
        </Box>
    );
};

const styles = {
    Box: {
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        height: 0,
        zIndex: 9999,
    },
    LinearProgress: {
        height: 4,
    },
};

export default LoadingTopbar;
