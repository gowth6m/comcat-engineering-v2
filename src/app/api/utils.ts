import { ApiError } from "@/types/api.type";
import { ZodIssue } from "zod";

export const zodFieldErrors = (errors: ZodIssue[]) => {
    const fieldErrors: ApiError[] = [];

    errors.forEach((e) => {
        fieldErrors.push({
            field: e.path.join("."),
            message: e.message,
        });
    })

    return fieldErrors;
}