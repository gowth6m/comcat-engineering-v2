import { ResponseCode } from "@/types/api.type";
import { NextResponse } from "next/server";

// --------------------------------------------------

export class ApiResponse {

    static internalServerError() {
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
        )
    }

    static success(data: any) {
        return NextResponse.json(
            {
                message: "Success",
                data
            },
            { status: ResponseCode.Success }
        )
    }

    static created(data: any) {
        return NextResponse.json(
            {
                message: "Created",
                data
            },
            { status: ResponseCode.Created }
        )
    }

    static badRequest(errors: any) {
        return NextResponse.json(
            {
                message: "Bad Request",
                errors
            },
            { status: ResponseCode.BadRequest }
        )
    }

    static notFound() {
        return NextResponse.json(
            {
                message: "Not Found",
                errors: [
                    {
                        field: null,
                        message: "Resource not found",
                    },
                ],
            },
            { status: ResponseCode.NotFound }
        )
    }

    static unauthorized() {
        return NextResponse.json(
            {
                message: "Unauthorized",
                errors: [
                    {
                        field: null,
                        message: "Unauthorized access",
                    },
                ],
            },
            { status: ResponseCode.Unauthorized }
        )
    }

    static forbidden() {
        return NextResponse.json(
            {
                message: "Forbidden",
                errors: [
                    {
                        field: null,
                        message: "Forbidden access",
                    },
                ],
            },
            { status: ResponseCode.Forbidden }
        )
    }
}