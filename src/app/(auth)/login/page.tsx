"use client";

import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { ApiError } from "@/types/api.type";
import { Box, Button, TextField } from "@mui/material";
import { toFormikValidationSchema } from "zod-formik-adapter";
import LoadingTopbar from "@/components/progress-bar/loading-topbar";
import { loginSchema } from "@/types/validation";

// --------------------------------------------------

export default function LoginPage() {
    const [error, setError] = useState<ApiError[]>([]);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: async (values) => {
            loginMutation.mutate(values);
        },
        validationSchema: toFormikValidationSchema(loginSchema),
    });

    const loginMutation = useMutation({
        mutationFn: async (values: { email: string; password: string }) => {
            return axios.post("/api/auth/login", values);
        },
        onSuccess: () => {
            window.location.href = "/";
        },
        onError: (error: any) => {
            toast.error("Login failed");
            setError(error.response.data.error);
        },
    });

    return (
        <>
            {loginMutation.isLoading && <LoadingTopbar />}
            <Box
                component={"form"}
                onSubmit={formik.handleSubmit}
                sx={{
                    flexDirection: "column",
                    display: "flex",
                    margin: "auto",
                    width: 300,
                    gap: 2,
                    my: 4,
                }}
            >
                <TextField
                    id={"email"}
                    name={"email"}
                    label={"Email"}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    required
                />
                <TextField
                    id={"password"}
                    name={"password"}
                    type={"password"}
                    label={"Password"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                    }
                    helperText={
                        formik.touched.password && formik.errors.password
                    }
                />

                <Button type={"submit"} variant={"contained"}>
                    Login
                </Button>
            </Box>
        </>
    );
}
