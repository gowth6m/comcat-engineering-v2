

import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { ResponseCode } from "@/types/api.type";
import { ApiResponse } from "@/utils/common-response";

export const revalidate = 0;

export async function GET(_req: Request, { params }: { params: { code: string } }) {

    try {
        await prisma.$connect();
        const data = await prisma.promoCode.findUnique({
            where: {
                code: params.code,
            },
        });

        if (!data) {
            return NextResponse.json({
                errors: [
                    {
                        field: "code",
                        message: "Invalid promo code",
                    },
                ],
            }, {
                status: ResponseCode.NotFound,
            });
        }

        return ApiResponse.success(data);
    } catch (error) {
        return ApiResponse.internalServerError();
    } finally {
        await prisma.$disconnect();
    }
}