"use client";

import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { ApiError } from "@/types/api.type";
import { Box, Button, TextField } from "@mui/material";
import LoadingTopbar from "@/components/progress-bar/loading-topbar";

// --------------------------------------------------

export default function RegisterPage() {
    const [errorMap, setErrorMap] = React.useState<ApiError[]>();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
        },
        onSubmit: async (values) => {
            registerMutation.mutate(values);
        },
    });

    const registerMutation = useMutation({
        mutationFn: async (values: {
            email: string;
            password: string;
            confirmPassword: string;
            firstName: string;
            lastName: string;
        }) => {
            return axios.post("/api/auth/register", values);
        },
        onSuccess: () => {
            window.location.href = "/auth/login";
        },
        onError: (error: any) => {
            toast.error("Failed to register user");
            setErrorMap(error.response.data.errors);
        },
    });

    return (
        <>
            {registerMutation.isLoading && <LoadingTopbar />}
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
        </>
    );
}
