import { z } from "zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { NextResponse } from "next/server";
import { zodFieldErrors } from "../../utils";
import { ResponseCode } from "@/types/api.type";
import { loginSchema } from "@/types/validation";
import { ApiResponse } from "@/utils/common-response";

// --------------------------------------------------

/**
 * @api {post} /auth/login Login
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = loginSchema.parse(body);

        const session = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        return new Response(JSON.stringify(session), {
            headers: {
                "content-type": "application/json",
                "Set-Cookie": session.cookie,
            },
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    message: "Validation error",
                    errors: zodFieldErrors(error.errors),
                },
                { status: ResponseCode.BadRequest }
            );
        }

        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return NextResponse.json(
                        {
                            errors: [
                                {
                                    field: null,
                                    message: "Invalid email or password",
                                },
                            ],
                        },
                        {
                            status: ResponseCode.Unauthorized,
                        }
                    );

                default:
                    return ApiResponse.internalServerError();
            }
        }

        return ApiResponse.internalServerError();
    }
}
