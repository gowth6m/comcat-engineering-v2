import "@/theme/globals.css";
import type { Metadata } from "next";
import NavWrapper from "@/components/nav/nav-wrapper";
import Providers from "@/context/providers";
import { AppConfig } from "@/configs/app-config";
import CoreToaster from "@/components/core/core-toaster";
import { auth, BASE_PATH } from "@/auth";
import { SessionProvider } from "next-auth/react";

// --------------------------------------------------------------

export const metadata: Metadata = {
    title: AppConfig.metadata.title,
    description: AppConfig.metadata.description,
    keywords: AppConfig.metadata.keywords,
    icons: {
        icon: AppConfig.metadata.icon,
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    return (
        <html lang="en">
            <body>
                <Providers session={session}>
                    <CoreToaster />
                    <NavWrapper>{children}</NavWrapper>
                </Providers>
            </body>
        </html>
    );
}
