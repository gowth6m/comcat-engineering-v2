import { ApiResponse } from "@/utils/common-response";
import prisma from "@/prisma";

export async function GET(_request: Request) {
    try {
        await prisma.$connect();

        const data = await prisma.category.findMany();

        await prisma.$disconnect();

        return ApiResponse.success(data);

    } catch (error) {
        return ApiResponse.internalServerError();
    } finally {
        await prisma.$disconnect();
    }
}