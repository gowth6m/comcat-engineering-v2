import { Stack } from "@mui/material";
import ErrorMessage from "./error-message";
import { useMemo } from "react";
import useErrorHandler from "@/hooks/useErrorHandler";
import { ApiError } from "@/types/api.type";

type Props = {
    errorMap: ApiError[];
    extraErrorFieldsToShow?: string[];
};

/**
 * Renders a list of error messages for errors that are not captured by formik fields
 *
 * @param errorMap An array of ApiError objects
 * @param extraErrorFieldsToShow An array of extra error fields to show
 * @returns A component that renders a list of error messages
 */
const UncapturedErrorMessages: React.FC<Props> = ({
    errorMap,
    extraErrorFieldsToShow = [],
}) => {
    const { uncapturedErrorMessages, hasError, getErrorMessage } =
        useErrorHandler({ errorMap });

    // Combine uncaptured errors and extra error fields into a single array for rendering
    const errorsToDisplay = useMemo(() => {
        const uncapturedErrors = uncapturedErrorMessages() || [];
        const extraErrors = extraErrorFieldsToShow
            .filter((field) => hasError({ field: field }))
            .map((field) => ({
                message: getErrorMessage({ field: field }),
            }));

        return [...uncapturedErrors, ...extraErrors];
    }, [
        uncapturedErrorMessages,
        extraErrorFieldsToShow,
        hasError,
        getErrorMessage,
    ]);

    // Render null if there are no errors to display
    if (errorsToDisplay.length === 0) return null;

    return (
        <Stack id={"uncaptured-error-messages"}>
            {errorsToDisplay.map((error, index) => {
                if (!error.message) return null;
                return <ErrorMessage key={index} message={error.message} />;
            })}
        </Stack>
    );
};

export default UncapturedErrorMessages;
