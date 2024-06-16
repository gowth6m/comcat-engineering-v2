import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { ResponseCode } from "@/types/api.type";
import { ApiResponse } from "@/utils/common-response";

// -----------------------------------------------------------

/**
 * Return filtered products for the hero section
 * - Response: { bestSellers: Product[], newArrivals: Product[], clearance: Product[] } 
 */
export async function GET(_req: Request) {
    try {
        await prisma.$connect();
        const [bestSellers, newArrivals, clearance] = await Promise.all([
            prisma.product.findMany({
                where: {
                    listingGroup: "bestSellers"
                }
            }),
            prisma.product.findMany({
                where: {
                    listingGroup: "newArrivals"
                }
            }),
            prisma.product.findMany({
                where: {
                    listingGroup: "clearance"
                }
            })
        ]);

        return NextResponse.json({
            bestSellers,
            newArrivals,
            clearance
        }, {
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
