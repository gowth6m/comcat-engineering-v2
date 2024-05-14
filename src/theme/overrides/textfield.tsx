import { Theme } from "@mui/material";

export function textfield(_theme: Theme) {
    return {
        MuiTextField: {
            styleOverrides: {
                root: {
                    minWidth: 300,
                },
            },
        },
    };
}
