

import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { ResponseCode } from "@/types/api.type";

export const revalidate = 0;

export async function GET(_req: Request, { params }: { params: { slug: string } }) {

    try {
        await prisma.$connect();
        const data = await prisma.review.findMany({
            where: {
                productSlug: params.slug,
            },
            orderBy: {
                createdAt: 'desc',
            }
        });
        return NextResponse.json({ data: data }, {
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