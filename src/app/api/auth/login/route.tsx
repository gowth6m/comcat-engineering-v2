import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { NextResponse } from "next/server";

// --------------------------------------------------

/**
 * @api {post} /auth/login Login
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

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
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return NextResponse.json(
                        {
                            error: "Invalid credentials",
                        },
                        {
                            status: 401,
                        }
                    );

                default:
                    return NextResponse.json(
                        {
                            error: "Something went wrong",
                        },
                        {
                            status: 500,
                        }
                    );
            }
        }
    }
}
