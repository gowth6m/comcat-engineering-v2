import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { ResponseCode } from "@/types/api.type";

// -----------------------------------------------------------

/**
 * Return similar products for the product page
 */
export async function GET(_req: Request, { params }: { params: { slug: string } }) {
    try {
        await prisma.$connect();

        const product = await prisma.product.findUnique({
            where: {
                slug: params.slug
            }
        });

        if (!product) {
            return NextResponse.json({
                errors: [
                    {
                        field: "slug",
                        message: "Product not found",
                    },
                ]
            }, {
                status: ResponseCode.NotFound,
            });
        }

        // First try to get similar products from the same listing group excluding itself
        let similarProducts = await prisma.product.findMany({
            where: {
                listingGroup: product.listingGroup,
                slug: {
                    not: params.slug
                },
            },
            take: 4,
        });

        // If no similar products found, get best-selling products excluding itself
        if (similarProducts.length === 0) {
            similarProducts = await prisma.product.findMany({
                where: {
                    slug: {
                        not: params.slug
                    },
                },
                orderBy: {
                    numReviews: 'desc',
                },
                take: 4,
            });
        }

        return NextResponse.json({
            data: similarProducts,
        }, {
            headers: {
                "Cache-Control": "s-maxage=1, stale-while-revalidate",
            },
            status: ResponseCode.Success,
        });
    } catch (error) {
        console.error("Error fetching products:", error);
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
