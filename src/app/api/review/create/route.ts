import { z } from "zod";
import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { zodFieldErrors } from "../../utils";
import { ResponseCode } from "@/types/api.type";
import { reviewSchema } from "@/types/validation";
import { auth } from "@/auth";

// --------------------------------------------------

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

        const { rating, comment, productId } =
            reviewSchema.parse(body);

        await prisma.$connect();

        const productPrev = await prisma.product.findUnique({
            where: {
                id: productId,
            },
            select: {
                rating: true,
                numReviews: true,
            },
        });

        if (!productPrev) {
            return NextResponse.json(
                {
                    message: "Not found",
                    errors: [
                        {
                            field: "productId",
                            message: "Product not found",
                        },
                    ],
                },
                { status: ResponseCode.NotFound }
            );
        }

        const newRating = (productPrev.rating * productPrev.numReviews + rating) / (productPrev.numReviews + 1);

        const product = await prisma.product.update({
            where: {
                id: productId,
            },
            data: {
                rating: newRating,
                numReviews: {
                    increment: 1,
                }
            },
        });

        const review = await prisma.review.create({
            data: {
                rating: rating,
                comment: comment,
                productId: productId,
                productSlug: product.slug,
                userId: session.user.id,
                userEmail: session.user.email,
            },
        });

        return NextResponse.json({
            status: ResponseCode.Success,
            data: {
                id: review.id,
                userId: review.userId,
                rating: review.rating,
                comment: review.comment,
                createdAt: review.createdAt,
            },
        });
    } catch (error) {
        console.error(error);

        if (error instanceof z.ZodError) {
            console.error(error.errors);
            return NextResponse.json(
                {
                    message: "Validation error",
                    errors: zodFieldErrors(error.errors),
                },
                { status: ResponseCode.BadRequest }
            );
        }

        return NextResponse.json(
            {
                message: "Internal server error",
                errors: [
                    {
                        field: null,
                        message: "Something went wrong",
                    },
                ],
            },
            { status: ResponseCode.InternalServerError }
        );
    }
}
