"use client";

import NProgress from "nprogress";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "@/routes/hooks";
import StyledProgressBar from "./styles";

// ----------------------------------------------------------------------

export default function ProgressBar() {
    useEffect(() => {
        NProgress.configure({ showSpinner: false });

        const handleAnchorClick = (event: MouseEvent) => {
            const targetUrl = (event.currentTarget as HTMLAnchorElement).href;
            const currentUrl = window.location.href;

            if (targetUrl !== currentUrl) {
                NProgress.start();
            }
        };

        const handleMutation = () => {
            const anchorElements: NodeListOf<HTMLAnchorElement> =
                document.querySelectorAll("a[href]");

            const filteredAnchors = Array.from(anchorElements).filter(
                (element) => {
                    const href = element.getAttribute("href");
                    return href && href.startsWith("/");
                }
            );

            filteredAnchors.forEach((anchor) =>
                anchor.addEventListener("click", handleAnchorClick)
            );
        };

        const mutationObserver = new MutationObserver(handleMutation);

        mutationObserver.observe(document, { childList: true, subtree: true });

        const originalPushState = window.history.pushState;
        const originalReplaceState = window.history.replaceState;

        window.history.pushState = function (...args) {
            const returnValue = originalPushState.apply(window.history, args);
            NProgress.done();
            return returnValue;
        };

        window.history.replaceState = function (...args) {
            const returnValue = originalReplaceState.apply(
                window.history,
                args
            );
            NProgress.done();
            return returnValue;
        };

        window.addEventListener("popstate", () => {
            NProgress.done();
        });

        return () => {
            mutationObserver.disconnect();
            const anchorElements: NodeListOf<HTMLAnchorElement> =
                document.querySelectorAll("a[href]");
            anchorElements.forEach((anchor) =>
                anchor.removeEventListener("click", handleAnchorClick)
            );
        };
    }, []);

    return (
        <>
            <StyledProgressBar />
            <NProgressDone />
        </>
    );
}

// ----------------------------------------------------------------------

function NProgressDone() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        NProgress.done();
    }, [pathname, searchParams]);

    return null;
}
