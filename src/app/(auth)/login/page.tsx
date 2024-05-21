"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import { Box, Button, TextField } from "@mui/material";
import { useMutation } from "react-query";
import { loginAction } from "@/auth/auth-actions";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { LoginSchema } from "@/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import LoadingTopbar from "@/components/core/loading-topbar";
import axios from "axios";
import ErrorMessage from "@/components/error/error-message";

// --------------------------------------------------

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: async (values) => {
            loginMutation.mutate(values);
        },
        validationSchema: toFormikValidationSchema(LoginSchema),
    });

    const loginMutation = useMutation({
        mutationFn: async (values: { email: string; password: string }) => {
            return axios.post("/api/auth/login", values);
        },
        onSuccess: () => {
            toast.success("Login successful");
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
                    required
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    id={"password"}
                    name={"password"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label={"Password"}
                    type={"password"}
                    required
                    error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                    }
                    helperText={
                        formik.touched.password && formik.errors.password
                    }
                />

                <ErrorMessage message={error} />
                <Button type={"submit"} variant={"contained"}>
                    Login
                </Button>
            </Box>
        </>
    );
}
