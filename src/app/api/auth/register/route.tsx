import prisma from "@/prisma";
import { ResponseCode } from "@/types/api.type";
import { NextResponse } from "next/server";
import { z } from "zod";

var bcrypt = require("bcryptjs");

const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
});

/**
 * Register a new user, and return the user object.
 *
 * @param request
 * @returns user object without password
 */
export async function POST(request: Request) {
    try {
        // Parse and validate the request body
        const body = await request.json();
        const { email, password, firstName, lastName } = userSchema.parse(body);

        await prisma.$connect();
        const user = await prisma.user.create({
            data: {
                email,
                password: bcrypt.hashSync(password),
                firstName,
                lastName,
            },
        });

        return NextResponse.json({
            status: ResponseCode.Success,
            data: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        // Handle validation errors
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    message: "Validation error",
                    errors: error.errors,
                },
                { status: ResponseCode.BadRequest }
            );
        }

        // Handle other errors
        return NextResponse.json(
            {
                message: "Internal server error",
                error: error,
            },
            { status: ResponseCode.InternalServerError }
        );
    }
}
