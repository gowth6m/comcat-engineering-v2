import "@/theme/globals.css";
import { auth } from "@/auth";
import type { Metadata } from "next";
import Providers from "@/context/providers";
import { AppConfig } from "@/configs/app-config";
import NavWrapper from "@/components/nav/nav-wrapper";
import CoreToaster from "@/components/core/core-toaster";
import ProgressBar from "@/components/progress-bar";
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
                <SessionProvider session={session}>
                    <Providers session={session}>
                        <CoreToaster />
                        <ProgressBar />
                        <NavWrapper>{children}</NavWrapper>
                    </Providers>
                </SessionProvider>
            </body>
        </html>
    );
}
