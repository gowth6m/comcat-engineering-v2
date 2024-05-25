import { ApiError } from "@/types/api.type";

const useErrorHandler = ({ errorMap }: { errorMap: ApiError[] }) => {
    /**
     * Gets the error message for a field
     *
     * @param field The name of the field to get the error message for
     * @param errorMap The error map to get the error message from
     * @returns The error message for the field
     */
    const getErrorMessage = ({ field }: { field: string }) => {
        try {
            const error = errorMap?.find((e) => e.field === field);
            return error ? error.message : undefined;
        } catch {
            return undefined;
        }
    };

    /**
     * Checks if a field has an error
     *
     * @param field The name of the field to check for errors
     * @param errorMap The error map to check for errors
     * @returns The boolean value of whether the field has an error
     */
    const hasError = ({ field }: { field: string }) => {
        try {
            return errorMap.some((e) => e.field === field);
        } catch {
            return false;
        }
    };

    /**
     * Returns error messages that are not associated with a field
     *
     * @param errorMap Api error map response
     * @returns Api error messages that are not associated with a field
     */
    const uncapturedErrorMessages = () => {
        try {
            return errorMap?.filter(
                (e) =>
                    e.field === null || e.field === "" || e.field === undefined
            );
        } catch {
            return [];
        }
    };

    return {
        hasError,
        getErrorMessage,
        uncapturedErrorMessages,
    };
};

export default useErrorHandler;
