// ----------------------------------------------------------------------

export const publicApiRoutes = [
    "/api/product",
    "/api/review",
    "/api/category",
    "/api/promocode",
    "/api/settings",
]

export const publicRoutes = [
    "/",
    "/cart",
    "/checkout",
    "/categories",
    "/services",
    "/contact",
    "/product/*",
];

// ----------------------------------------------------------------------

export const authRoutes = [
    "/login",
    "/register",
];

// ----------------------------------------------------------------------

export const apiAuthPrefix = "/api/auth";

export const defaultLoginRedirect = "/profile";