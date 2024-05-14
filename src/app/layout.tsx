import "@/theme/globals.css";
import type { Metadata } from "next";
import NavWrapper from "@/components/nav/nav-wrapper";
import Providers from "@/context/providers";
import { AppConfig } from "@/configs/app-config";

export const metadata: Metadata = {
    title: AppConfig.metadata.title,
    description: AppConfig.metadata.description,
    keywords: AppConfig.metadata.keywords,
    icons: {
        icon: AppConfig.metadata.icon,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <NavWrapper>{children}</NavWrapper>
                </Providers>
            </body>
        </html>
    );
}
