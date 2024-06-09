import { auth } from "@/auth";
import { ResponseCode } from "@/types/api.type";
import { promoCodeSchema } from "@/types/validation";
import { NextResponse } from "next/server";
import prisma from "@/prisma";


export async function POST(request: Request) {
    const session = await auth();

    if (!session) {
        return NextResponse.json(
            {
                message: "Unauthorized",
                errors: [
                    {
                        field: null,
                        message: "You must be logged in to perform this action",
                    },
                ],
            },
            { status: ResponseCode.Unauthorized }
        );
    }

    try {
        const body = await request.json();
        const { code, discount } = promoCodeSchema.parse(body);

        await prisma.$connect();

        const promoCode = await prisma.promoCode.create({
            data: {
                code,
                discount,
            },
        });

        await prisma.$disconnect();

        return NextResponse.json(
            {
                message: "Promo code created",
                data: promoCode,
            },
            { status: ResponseCode.Created }
        );

    } catch (error) {
        return NextResponse.json(
            {
                message: "An error occurred",
                errors: [
                    {
                        field: null,
                        message: "An error occurred while processing your request",
                    },
                ],
            },
            { status: ResponseCode.InternalServerError }
        );
    }
}