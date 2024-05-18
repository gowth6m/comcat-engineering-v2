"use client";

import React from "react";
import ThemeProvider from "@/theme/theme-provider";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./auth-provider";
import { Session } from "next-auth";

// --------------------------------------------------------------

interface Props {
    children: React.ReactNode;
    session: Session | null;
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
});

// --------------------------------------------------------------

const Providers: React.FC<Props> = ({ children, session }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider session={session}>
                <ThemeProvider>{children}</ThemeProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
};

export default Providers;
