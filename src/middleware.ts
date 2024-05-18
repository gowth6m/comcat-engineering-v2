import { auth } from "@/auth"

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    console.log('Route: ', req.nextUrl.pathname, " - LoggedIn: ", isLoggedIn)
})

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};