import { Session } from "next-auth";
import React from "react";

// -----------------------------------------------------------

type AuthContext = {
    session: Session | null;
};

// -----------------------------------------------------------

const AuthContext = React.createContext<AuthContext | null>(null);

// -----------------------------------------------------------

export const AuthProvider = ({
    children,
    session,
}: {
    children: React.ReactNode;
    session: Session | null;
}) => {
    return (
        <AuthContext.Provider value={{ session }}>
            {children}
        </AuthContext.Provider>
    );
};

// -----------------------------------------------------------

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
