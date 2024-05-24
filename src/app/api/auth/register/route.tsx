import { z } from "zod";
import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { zodFieldErrors } from "../../utils";
import { ResponseCode } from "@/types/api.type";
import { registerSchema } from "@/types/validation";

var bcrypt = require("bcryptjs");

// --------------------------------------------------

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
        const { email, password, firstName, lastName } =
            registerSchema.parse(body);

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
        if (error instanceof z.ZodError) {
            console.error(error.errors);
            return NextResponse.json(
                {
                    message: "Validation error",
                    errors: zodFieldErrors(error.errors),
                },
                { status: ResponseCode.BadRequest }
            );
        }

        return NextResponse.json(
            {
                message: "Internal server error",
                errors: {
                    field: null,
                    message: "Something went wrong",
                },
            },
            { status: ResponseCode.InternalServerError }
        );
    }
}
