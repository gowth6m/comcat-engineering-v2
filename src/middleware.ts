import { auth } from "@/auth"
import { NextResponse } from "next/server";

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const publicPaths = ['/', '/categories', '/account', '/login', '/register'];
    const isPublicPath = publicPaths.includes(req.nextUrl.pathname);

    console.log('Route: ', req.nextUrl.pathname, " - LoggedIn: ", isLoggedIn);

    // if (isPublicPath) {
    //     // Otherwise, allow the request to proceed
    //     return NextResponse.next();
    // }

    // if (!isLoggedIn) {
    //     // If not logged in and trying to access a protected route, redirect to login
    //     return NextResponse.redirect(new URL('/login', req.url));
    // }

    // Allow the request to proceed if authenticated
    return NextResponse.next();
});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};