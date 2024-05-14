import { Link as MuiLink, LinkProps } from "@mui/material";
import Link from "next/link";
import React from "react";

interface CoreLinkProps extends LinkProps {
    href: string;
    children: React.ReactNode;
}

const CoreLink: React.FC<CoreLinkProps> = ({ href, children, ...props }) => {
    return (
        <div>
            <MuiLink component={Link} href={href} {...props}>
                {children}
            </MuiLink>
        </div>
    );
};

export default CoreLink;
