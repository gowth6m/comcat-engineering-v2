"use client";

import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Box, Typography } from "@mui/material";

// --------------------------------------------------------------

const caraouselItems = [
    {
        image: "./assets/bg_image_0.jpeg",
        alt: "Hero Caraousel Image 1",
        titleText: "Great Comcat Engineering",
        descriptionText: "We provide the best engineering solutions",
    },
    {
        image: "./assets/bg_image_2.jpeg",
        alt: "Hero Caraousel Image 2",
        titleText: "Latest Technology",
        descriptionText: "We use the latest technology to build our products",
    },
];

// --------------------------------------------------------------

const HeroCaraousel = () => {
    return (
        <Box
            className={`
                splide
                splide--hero
                overflow-hidden
                w-full
            `}
        >
            <Splide
                aria-label="Hero Caraousel"
                options={{
                    height: 300,
                    width: "100%",
                    rewind: true,
                    autoplay: true,
                    interval: 10000,
                }}
            >
                {caraouselItems.map((item, index) => (
                    <SplideSlide key={index}>
                        <img
                            src={item.image}
                            alt={item.alt}
                            className={`w-full grayscale brightness-50`}
                        />
                        <div
                            className={`
                            absolute
                            top-1/2
                            left-1/2
                            transform
                            -translate-x-1/2
                            -translate-y-1/2
                            text-center
                        `}
                        >
                            <Typography variant="h2" color={"primary"}>
                                {item.titleText}
                            </Typography>

                            <Typography variant="h5" color={"common.white"}>
                                {item.descriptionText}
                            </Typography>
                        </div>
                    </SplideSlide>
                ))}
            </Splide>
        </Box>
    );
};

export default HeroCaraousel;
