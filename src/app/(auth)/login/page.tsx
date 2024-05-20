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
            return await loginAction(values);
        },
        onSuccess: () => {
            toast.success("Login successful");
        },
        onError: (error) => {
            toast.error("Login failed");
            if (error instanceof Error) setError(error.message);
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
                    formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
            />

            <Box sx={{ color: "red" }}>{error}</Box>

            <Button type={"submit"} variant={"outlined"}>
                Login
            </Button>
        </Box>
    );
}
