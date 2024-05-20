import React from "react";

interface LayoutRegisterProps {
    children: React.ReactNode;
}

const LayoutRegister: React.FC<LayoutRegisterProps> = ({ children }) => {
    return <>{children}</>;
};

export default LayoutRegister;
