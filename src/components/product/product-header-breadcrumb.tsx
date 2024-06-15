import React from "react";
import Row from "../core/row";
import { Product } from "@prisma/client";
import { usePathname } from "next/navigation";
import { firstLetterUppercase } from "@/utils/format";
import { Breadcrumbs, Link, Skeleton, Typography } from "@mui/material";

// -----------------------------------------------------------

interface Props {
    product: Product | null;
}

const ProductHeaderBreadcrumb: React.FC<Props> = ({ product }) => {
    const path = usePathname();

    if (!product)
        return (
            <Row>
                <Skeleton variant="text" width={80} height={25} />
                <Skeleton variant="text" width={120} height={25} />
                <Skeleton variant="text" width={100} height={25} />
                <Skeleton variant="text" width={400} height={25} />
            </Row>
        );

    return (
        <div>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="/">
                    Home
                </Link>
                <Link color="inherit" href={`${path}/categories`}>
                    Categories
                </Link>
                {product.category?.[0] && (
                    <Link
                        color="inherit"
                        href={`categories/${product.category?.[0].toLowerCase()}`}
                        sx={{
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {firstLetterUppercase(product.category?.[0])}
                    </Link>
                )}
                <Typography color="text.primary">
                    {firstLetterUppercase(product.name)}
                </Typography>
            </Breadcrumbs>
        </div>
    );
};

export default ProductHeaderBreadcrumb;
