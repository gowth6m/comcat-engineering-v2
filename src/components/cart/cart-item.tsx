import React from "react";
import Row from "../core/row";
import Column from "../core/column";
import {
    Card,
    CardMedia,
    Divider,
    IconButton,
    Link,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import ProductDiscountLabel from "../product/product-discount-label";
import ProductPriceLabel from "../product/product-price-label";
import { useCartStore } from "@/stores/cart-store";
import { Product } from "@prisma/client";
import CoreIcon from "../core/core-icon";
import CoreButton from "../core/core-button";
import toast from "react-hot-toast";

// -----------------------------------------------------------

interface Props {
    item: Product;
    qty: number;
}

const CartItem: React.FC<Props> = ({ item, qty }) => {
    const { setCartItemQuantity, clearItemFromCart } = useCartStore();

    const handleQuantityChange = (value: number) => {
        setCartItemQuantity(item.id, value);
    };

    const handleShare = () => {
        navigator.clipboard.writeText(
            window.location.origin + `/product/${item.slug}`
        );
        toast.success("Link copied to clipboard");
    };

    return (
        <Card
            elevation={0}
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 1,
            }}
        >
            <Row>
                <CardMedia
                    component="img"
                    image={item.images?.[0]}
                    alt={item.name}
                    sx={{
                        height: 100,
                        width: 100,
                        objectFit: "cover",
                        objectPosition: "center",
                        borderRadius: 1,
                    }}
                />
                <Column gap={1}>
                    <Row justifyContent={"space-between"}>
                        <Column gap={0.5}>
                            <Typography
                                component={Link}
                                variant={"subtitle1"}
                                sx={{
                                    textAlign: "left",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    fontWeight: 550,
                                    color: "text.primary",
                                    textDecoration: "none",
                                    cursor: "pointer",
                                    "&:hover": {
                                        textDecoration: "underline",
                                    },
                                }}
                                href={`/product/${item.slug}`}
                            >
                                {item.name}
                            </Typography>

                            <Row>
                                <Typography
                                    variant={"body2"}
                                    color={
                                        item.countInStock > 0
                                            ? "success.main"
                                            : "text.secondary"
                                    }
                                >
                                    {item.countInStock > 0
                                        ? `In stock`
                                        : `Out of stock`}
                                </Typography>
                            </Row>

                            <Row alignItems={"center"}>
                                <Select
                                    size={"small"}
                                    value={qty}
                                    onChange={(e) => {
                                        handleQuantityChange(
                                            e.target.value as number
                                        );
                                    }}
                                    sx={{
                                        width: "fit-content",
                                        borderRadius: 1,
                                        backgroundColor:
                                            "secondary.contrastText",
                                    }}
                                    disabled={item.countInStock === 0}
                                >
                                    {Array.from(
                                        { length: item.countInStock },
                                        (_, index) => index + 1
                                    ).map((value) => (
                                        <MenuItem key={value} value={value}>
                                            {`Qty: ${value}`}
                                        </MenuItem>
                                    ))}
                                </Select>

                                <Divider
                                    orientation={"vertical"}
                                    flexItem
                                    sx={{
                                        height: 20,
                                        my: "auto",
                                    }}
                                />

                                <Link
                                    underline={"hover"}
                                    sx={{
                                        cursor: "pointer",
                                    }}
                                    onClick={() => clearItemFromCart(item.id)}
                                >
                                    Delete
                                </Link>

                                <Divider
                                    orientation={"vertical"}
                                    flexItem
                                    sx={{
                                        height: 20,
                                        my: "auto",
                                    }}
                                />

                                <Link
                                    underline={"hover"}
                                    sx={{
                                        cursor: "pointer",
                                    }}
                                    onClick={handleShare}
                                >
                                    Share
                                </Link>
                            </Row>
                        </Column>

                        <Column flex={1} gap={0.5}>
                            <ProductDiscountLabel
                                product={item}
                                variant={"cart"}
                            />
                            <ProductPriceLabel
                                product={item}
                                variant={"h6"}
                                labelVariant={"cart"}
                            />
                        </Column>
                    </Row>
                </Column>
            </Row>
        </Card>
    );
};

export default CartItem;
