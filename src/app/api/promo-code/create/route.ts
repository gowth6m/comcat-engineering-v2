import { ResponseCode } from "@/types/api.type";
import { promoCodeSchema } from "@/types/validation";
import { NextResponse } from "next/server";
import prisma from "@/prisma";
import { ApiResponse } from "@/utils/common-response";


export async function POST(request: Request) {
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
        return ApiResponse.internalServerError();
    } finally {
        await prisma.$disconnect();
    }
}