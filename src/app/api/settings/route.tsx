import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { ResponseCode } from "@/types/api.type";

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

        return NextResponse.json(
            { data: data },
            {
                status: ResponseCode.Success,
            }
        );
    } catch (error) {
        return NextResponse.json(
            {
                errors: [
                    {
                        field: null,
                        message: "Internal server error",
                    },
                ],
            },
            {
                status: ResponseCode.InternalServerError,
            }
        );
    } finally {
        await prisma.$disconnect();
    }
}
