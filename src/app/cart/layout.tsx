import { Metadata } from "next/types";

// -----------------------------------------------------------

export const metadata: Metadata = {
    title: "Cart - Great Comcat Engineering",
    description: "Great Comcat Engineering Cart Page - View your cart items",
};

// -----------------------------------------------------------

export default function CartLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return <>{children}</>;
}
