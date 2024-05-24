"use server";

import { signIn, signOut } from "@/auth";
import { loginSchema } from "@/types/validation";
import { AuthError } from "next-auth";
import { z } from "zod";

// ------------------------------------------------------------

export async function loginAction(values: z.infer<typeof loginSchema>) {
    const validatedFields = loginSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            error: "Invalid fields",
            errors: validatedFields.error.errors,
        };
    }

    try {
        await signIn("credentials", {
            email: validatedFields.data.email,
            password: validatedFields.data.password,
            redirectTo: "/",
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    throw new Error("Invalid credentials");
                default:
                    throw new Error("Something went wrong!");
            }
        }

        throw error;
    }
}

// ------------------------------------------------------------

export async function logoutAction() {
    await signOut();
}
