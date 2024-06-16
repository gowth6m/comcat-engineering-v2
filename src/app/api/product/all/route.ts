import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { ResponseCode } from "@/types/api.type";
import { ApiResponse } from "@/utils/common-response";

export async function GET(_req: Request) {
    try {
        await prisma.$connect();
        const data = await prisma.product.findMany();
        return NextResponse.json({ data: data }, {
            headers: {
                "Cache-Control": "s-maxage=1, stale-while-revalidate",
            },
            status: ResponseCode.Success,
        });
    } catch (error) {
        return ApiResponse.internalServerError();
    } finally {
        await prisma.$disconnect();
    }
}