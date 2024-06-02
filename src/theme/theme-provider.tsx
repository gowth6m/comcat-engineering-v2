import {
    ThemeOptions,
    createTheme,
    ThemeProvider as MuiThemeProvider,
    CssBaseline,
} from "@mui/material";
import { merge } from "lodash";
import { useMemo } from "react";
import { palette } from "./customs/palette";
import { typography } from "./customs/typography";
import { componentsOverrides } from "./overrides";
import { customShadows } from "./customs/custom-shadows";
import { useAppSettingStore } from "@/stores/app-settings-store";

type Props = {
    children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
    const { themeMode } = useAppSettingStore();

    const memoizedValue = useMemo(
        () =>
            ({
                breakpoints: {
                    values: {
                        xs: 0,
                        sm: 640,
                        md: 768,
                        lg: 1280,
                        xl: 1536,
                    },
                },
                palette: {
                    ...palette(themeMode),
                },
                customShadows: {
                    ...customShadows(themeMode),
                },
                shape: { borderRadius: 8 },
                typography: typography,
            } as ThemeOptions),
        [themeMode]
    );

    const themeObj = createTheme(memoizedValue);
    themeObj.components = merge(componentsOverrides(themeObj));

    return (
        <MuiThemeProvider theme={themeObj}>
            <CssBaseline />
            {children}
        </MuiThemeProvider>
    );
}
