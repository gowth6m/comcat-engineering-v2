import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { ResponseCode } from "@/types/api.type";
import { ApiResponse } from "@/utils/common-response";

export const revalidate = 0;

export async function GET(_req: Request) {
    try {
        await prisma.$connect();
        const data = await prisma.setting.findUnique({
            where: {
                name: "gce",
            },
        });

        if (!data) {
            return NextResponse.json(
                {
                    errors: [
                        {
                            field: "setting",
                            message: "Unable to fetch settings",
                        },
                    ],
                },
                {
                    status: ResponseCode.NotFound,
                }
            );
        }

        return ApiResponse.success(data);
    } catch (error) {
        return ApiResponse.internalServerError();
    } finally {
        await prisma.$disconnect();
    }
}
