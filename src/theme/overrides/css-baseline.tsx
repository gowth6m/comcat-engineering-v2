import { darkScrollbar } from "@mui/material";
import { Theme } from "@mui/material/styles";

// ----------------------------------------------------------------------

export function cssBaseline(theme: Theme) {
    return {
        MuiCssBaseline: {
            styleOverrides: {
                "*": {
                    boxSizing: "border-box",
                },
                html: {
                    margin: 0,
                    padding: 0,
                    width: "100%",
                    height: "100%",
                    WebkitOverflowScrolling: "touch",
                    ...(theme.palette.mode === "dark" ? darkScrollbar() : null),
                },
                body: {
                    margin: 0,
                    padding: 0,
                    width: "100%",
                    height: "100%",
                    ...(theme.palette.mode === "dark" ? darkScrollbar() : null),
                },
                "#root, #__next": {
                    width: "100%",
                    height: "100%",
                },
                input: {
                    "&[type=number]": {
                        MozAppearance: "textfield",
                        "&::-webkit-outer-spin-button": {
                            margin: 0,
                            WebkitAppearance: "none",
                        },
                        "&::-webkit-inner-spin-button": {
                            margin: 0,
                            WebkitAppearance: "none",
                        },
                    },
                },
                img: {
                    maxWidth: "100%",
                    display: "inline-block",
                    verticalAlign: "bottom",
                },
            },
        },
    };
}
