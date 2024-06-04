import "@splidejs/react-splide/css";
import React, { useRef, useState } from "react";
import { Product } from "@prisma/client";
import { Box, CardMedia, Stack } from "@mui/material";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Scrollbar from "../scrollbar";

// -----------------------------------------------------------

interface Props {
    product: Product;
}

const ProductImageGallery: React.FC<Props> = ({ product }) => {
    const splide = useRef<any>(null);
    const [currentImage, setCurrentImage] = useState<number>(0);

    return (
        <Stack
            sx={{
                flexDirection: "row",
                gap: 1,
            }}
        >
            {/* Gallery */}
            <Scrollbar
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: 300,
                    width: 100,
                    gap: 1,
                }}
            >
                <Stack
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        paddingRight: 1,
                        gap: 1,
                    }}
                >
                    {product.images.map((image, index) => (
                        <CardMedia
                            key={index}
                            component="img"
                            image={image}
                            alt={product.name}
                            sx={{
                                width: 100,
                                height: 100,
                                objectFit: "contain",
                                cursor: "pointer",
                                opacity: currentImage === index ? 1 : 0.4,
                            }}
                            onClick={() => {
                                setCurrentImage(index);
                                splide?.current?.go(index);
                            }}
                        />
                    ))}
                </Stack>
            </Scrollbar>

            {/* Main Image */}
            <Box
                ref={splide}
                component={Splide}
                options={{
                    type: "fade",
                    heightRatio: 0.5,
                    pagination: true,
                    arrows: true,
                    autoWidth: true,
                    focus: "center",
                    height: 300,
                    width: 300,
                }}
                onMoved={(splide) => setCurrentImage(splide.index)}
            >
                {product.images.map((image, index) => (
                    <SplideSlide key={index}>
                        <CardMedia
                            component="img"
                            image={image}
                            alt={product.name}
                            sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                            }}
                        />
                    </SplideSlide>
                ))}
            </Box>
        </Stack>
    );
};

export default ProductImageGallery;
