import React from "react";
import Row from "../core/row";
import Column from "../core/column";
import CoreIcon from "../core/core-icon";
import CoreLink from "../core/core-link";
import { Typography } from "@mui/material";
import ProductContactInfo from "./product-contact-info";

// -----------------------------------------------------------

interface Props {}

const ProductDispatchLocationInfo: React.FC<Props> = () => {
    return (
        <Column gap={0.5}>
            <Column gap={0.5}>
                <Typography variant="caption">
                    Item can be collected from our warehouse at the following
                    address or will be dispatched to your address within 2-3
                    working days.
                </Typography>

                <CoreLink
                    href="https://www.google.com/maps/place/Great+Comcat+Engineering/@51.3839208,-0.2255495,17z/data=!3m1!4b1!4m6!3m5!1s0x487609a6abed9211:0xf6bd57e95834d64b!8m2!3d51.3839208!4d-0.2255495!16s%2Fg%2F11ts1872bq?entry=ttu"
                    underline="hover"
                    target={"_blank"}
                    sx={{
                        display: "block",
                        color: "text.secondary",
                        width: "fit-content",
                        "&:hover": {
                            color: "primary.main",
                        },
                    }}
                >
                    <Row alignItems={"center"} gap={1}>
                        <CoreIcon.MapPin size={16} />
                        <Typography variant="caption">
                            {`193 Garth Rd, Morden SM4 4LZ`}
                        </Typography>
                    </Row>
                </CoreLink>
            </Column>
            <ProductContactInfo />
        </Column>
    );
};

export default ProductDispatchLocationInfo;
