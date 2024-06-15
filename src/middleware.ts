import { auth } from "@/auth"
import { NextResponse } from "next/server";
import { apiAuthPrefix, authRoutes, defaultLoginRedirect, publicApiRoutes, publicRoutes } from "./routes/paths";
import { ResponseCode } from "./types/api.type";

export default auth((req) => {
    const pathname = req.nextUrl.pathname;
    const isLoggedIn = !!req.auth;
    const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.some(route => {
        if (route.endsWith("*")) {
            return pathname.startsWith(route.slice(0, -1));
        }
        return route === pathname;
    });
    const isAuthRoute = authRoutes.includes(pathname);
    const isPublicApiRoute = publicApiRoutes.some(route => pathname.startsWith(route));

    if (isApiAuthRoute) {
        return NextResponse.next();
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL(defaultLoginRedirect, req.nextUrl.origin).toString());
        }
        return NextResponse.next();
    }

    if (pathname.startsWith("/api")) {
        if (isPublicApiRoute) {
            return NextResponse.next();
        }
        if (!isLoggedIn) {
            return NextResponse.json({
                errors: [
                    {
                        field: null,
                        message: "Unauthorized access",
                    },
                ]
            }, {
                status: ResponseCode.Unauthorized,
            });
        }
    }

    if (!isLoggedIn && !isPublicRoute) {
        return NextResponse.redirect(new URL("/login", req.nextUrl.origin).toString());
    }

    return NextResponse.next();
});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};