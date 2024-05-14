// ----------------------------------------------------------------------

import { Theme } from "@mui/material";

export function tooltip(_theme: Theme) {
    return {
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    fontSize: 14,
                },
            },
        },
    };
}
