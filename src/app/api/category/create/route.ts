import { ResponseCode } from "@/types/api.type";
import { categorySchema } from "@/types/validation";
import { NextResponse } from "next/server";
import { ApiResponse } from "@/utils/common-response";
import prisma from "@/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name } = categorySchema.parse(body);

        await prisma.$connect();

        const promoCode = await prisma.category.upsert({
            where: { name },
            create: {
                name,
            },
            update: {
                name,
            },
        });

        await prisma.$disconnect();

        return NextResponse.json(
            {
                message: "New category created successfully",
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