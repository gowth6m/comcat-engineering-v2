"use client";

import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { ApiError } from "@/types/api.type";
import { Box, Button, TextField } from "@mui/material";
import LoadingTopbar from "@/components/progress-bar/loading-topbar";
import UncapturedErrorMessages from "@/components/error/uncaptured-error-messages";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { registerSchema } from "@/types/validation";
import useErrorHandler from "@/hooks/useErrorHandler";

// --------------------------------------------------

export default function RegisterPage() {
    const [errorMap, setErrorMap] = React.useState<ApiError[]>([]);
    const { hasError, getErrorMessage } = useErrorHandler({
        errorMap: errorMap,
    });
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
        validationSchema: toFormikValidationSchema(registerSchema),
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
            window.location.href = "/login";
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
                    error={
                        (formik.touched.email &&
                            Boolean(formik.errors.email)) ||
                        hasError({ field: "email" })
                    }
                    helperText={
                        (formik.touched.email && formik.errors.email) ||
                        getErrorMessage({ field: "email" })
                    }
                    required
                />

                <TextField
                    id={"password"}
                    name={"password"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label={"Password"}
                    type={"password"}
                    error={
                        (formik.touched.password &&
                            Boolean(formik.errors.password)) ||
                        hasError({ field: "password" })
                    }
                    helperText={
                        (formik.touched.password && formik.errors.password) ||
                        getErrorMessage({ field: "password" })
                    }
                    required
                />

                <TextField
                    id={"confirmPassword"}
                    name={"confirmPassword"}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label={"Confirm Password"}
                    type={"password"}
                    error={
                        (formik.touched.confirmPassword &&
                            Boolean(formik.errors.confirmPassword)) ||
                        hasError({ field: "confirmPassword" })
                    }
                    helperText={
                        (formik.touched.confirmPassword &&
                            formik.errors.confirmPassword) ||
                        getErrorMessage({ field: "confirmPassword" })
                    }
                    required
                />

                <TextField
                    id={"firstName"}
                    name={"firstName"}
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label={"First Name"}
                    error={
                        (formik.touched.firstName &&
                            Boolean(formik.errors.firstName)) ||
                        hasError({ field: "firstName" })
                    }
                    helperText={
                        (formik.touched.firstName && formik.errors.firstName) ||
                        getErrorMessage({ field: "firstName" })
                    }
                    required
                />

                <TextField
                    id={"lastName"}
                    name={"lastName"}
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label={"Last Name"}
                    error={
                        (formik.touched.lastName &&
                            Boolean(formik.errors.lastName)) ||
                        hasError({ field: "lastName" })
                    }
                    helperText={
                        (formik.touched.lastName && formik.errors.lastName) ||
                        getErrorMessage({ field: "lastName" })
                    }
                    required
                />

                <UncapturedErrorMessages errorMap={errorMap} />

                <Button type={"submit"} variant={"contained"}>
                    Register
                </Button>
            </Box>
        </>
    );
}
