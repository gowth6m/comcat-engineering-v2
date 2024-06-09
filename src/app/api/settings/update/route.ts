import { auth } from "@/auth";
import { ResponseCode } from "@/types/api.type";
import { settingSchema } from "@/types/validation";
import { NextResponse } from "next/server";
import prisma from "@/prisma";

export async function POST(request: Request) {
    const session = await auth();

    if (!session) {
        return NextResponse.json(
            {
                message: "Unauthorized",
                errors: [
                    {
                        field: null,
                        message: "You must be logged in to perform this action",
                    },
                ],
            },
            { status: ResponseCode.Unauthorized }
        );
    }

    try {
        const body = await request.json();
        const { name, deliveryCost, freeDeliveryThreshold, taxRate } = settingSchema.parse(body);

        await prisma.$connect();

        // create or update 
        const setting = await prisma.setting.upsert({
            where: { name: name },
            update: {
                name,
                deliveryCost,
                freeDeliveryThreshold,
                taxRate
            },
            create: {
                name,
                deliveryCost,
                freeDeliveryThreshold,
                taxRate
            }
        });


        return NextResponse.json(
            {
                data: setting,
            },
            { status: ResponseCode.Created }
        );

    } catch (error) {
        return NextResponse.json(
            {
                message: "An error occurred",
                errors: [
                    {
                        field: null,
                        message: "An error occurred while processing your request",
                    },
                ],
            },
            { status: ResponseCode.InternalServerError }
        );
    } finally {
        await prisma.$disconnect();
    }
}