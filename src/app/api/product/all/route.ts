import { NextResponse } from "next/server";
import prisma from "@/prisma";

export async function GET(_req: Request) {
    try {
        await prisma.$connect();
        const data = await prisma.product.findMany();
        return NextResponse.json({ status: "success", data: data });
    } catch (error) {
        return NextResponse.json({ status: "error", data: error });
    }
}