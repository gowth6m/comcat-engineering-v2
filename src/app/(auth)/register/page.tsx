"use client";

import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";

export default function RegisterPage() {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
        },
        onSubmit: async (values) => {
            axios.post("/api/auth/register", values);
        },
    });

    return (
        <Box
            component={"form"}
            onSubmit={formik.handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: 300,
                margin: "auto",
                my: 4,
            }}
        >
            <TextField
                id={"email"}
                name={"email"}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label={"Email"}
            />

            <TextField
                id={"password"}
                name={"password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label={"Password"}
                type={"password"}
            />

            <TextField
                id={"confirmPassword"}
                name={"confirmPassword"}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label={"Confirm Password"}
                type={"password"}
            />

            <TextField
                id={"firstName"}
                name={"firstName"}
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label={"First Name"}
            />

            <TextField
                id={"lastName"}
                name={"lastName"}
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label={"Last Name"}
            />

            <Button type={"submit"} variant={"outlined"}>
                Register
            </Button>
        </Box>
    );
}
