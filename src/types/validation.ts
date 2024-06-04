import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .email("Invalid email"),
    password: z.string({ required_error: "Password is required" }),
});

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
});

export const reviewSchema = z.object({
    rating: z.number().int().min(1).max(5),
    comment: z.string().min(1).max(500),
    productId: z.string(),
});
