

import prisma from "@/prisma";
import { ApiResponse } from "@/utils/common-response";

export const revalidate = 0;

export async function GET(_req: Request, { params }: { params: { slug: string } }) {

    try {
        await prisma.$connect();
        const data = await prisma.product.findUnique({
            where: {
                slug: params.slug,
            }
        });
        return ApiResponse.success(data);
    } catch (error) {
        return ApiResponse.internalServerError();
    } finally {
        await prisma.$disconnect();
    }
}