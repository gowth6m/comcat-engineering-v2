"use client";

import React from "react";
import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Box, CardMedia, Container, Typography } from "@mui/material";

// --------------------------------------------------------------

const HeroCaraousel = () => {
    return (
        <Box
            sx={{
                backgroundColor: "secondary.main",
                width: "100%",
            }}
        >
            <Container maxWidth={"lg"}>
                <Splide
                    aria-label="Hero Caraousel"
                    className={"min-h-64"}
                    options={{
                        height: 256,
                        width: "100%",
                        rewind: true,
                        autoplay: true,
                        interval: 10000,
                        arrows: false,
                    }}
                >
                    <Box
                        component={SplideSlide}
                        width={"100%"}
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        gap={16}
                    >
                        <Box>
                            <Typography variant="h2" color={"common.white"}>
                                Same day
                                <br />
                                <Typography
                                    variant="h2"
                                    color={"primary"}
                                    component={"span"}
                                >
                                    shipping
                                </Typography>
                            </Typography>
                        </Box>

                        <Box>
                            <CardMedia
                                component="img"
                                src={"assets/gce_van.svg"}
                                alt={"Hero Caraousel Image 1"}
                                sx={{
                                    width: "auto",
                                    height: 200,
                                }}
                            />
                        </Box>
                    </Box>
                </Splide>
            </Container>
        </Box>
    );
};

export default HeroCaraousel;
