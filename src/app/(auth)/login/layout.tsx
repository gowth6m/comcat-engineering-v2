import React from "react";

interface LayoutLoginProps {
    children: React.ReactNode;
}

const LayoutLogin: React.FC<LayoutLoginProps> = ({ children }) => {
    return <>{children}</>;
};

export default LayoutLogin;
