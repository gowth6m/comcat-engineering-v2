

import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { ResponseCode } from "@/types/api.type";

export async function GET(_req: Request, { params }: { params: { slug: string } }) {

    try {
        await prisma.$connect();
        const data = await prisma.review.findMany({
            where: {
                productSlug: params.slug,
            }
        });
        return NextResponse.json({ data: data }, {
            headers: {
                "Cache-Control": "s-maxage=1, stale-while-revalidate",
            },
            status: ResponseCode.Success,
        });
    } catch (error) {
        return NextResponse.json({
            errors: [
                {
                    field: null,
                    message: "Internal server error",
                },
            ]
        }, {
            status: ResponseCode.InternalServerError,
        });
    } finally {
        await prisma.$disconnect();
    }
}