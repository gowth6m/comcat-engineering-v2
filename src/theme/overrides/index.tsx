import { merge } from "lodash";
import { cssBaseline } from "./css-baseline";
import { appBar } from "./appbar";
import { avatar } from "./avatar";
import { breadcrumbs } from "./breadcrumbs";
import { button } from "./button";
import { tooltip } from "./tooltip";
import { progress } from "./progress";
import { textfield } from "./textfield";
import { toolBar } from "./toolbar";
import { Theme } from "@mui/material";
import { dialog } from "./dialog";

// ----------------------------------------------------------------------

export function componentsOverrides(theme: Theme) {
    const components = merge(
        appBar(theme),
        avatar(theme),
        breadcrumbs(theme),
        button(theme),
        cssBaseline(theme),
        progress(theme),
        textfield(theme),
        toolBar(theme),
        tooltip(theme),
        dialog(theme)
    );

    return components;
}
