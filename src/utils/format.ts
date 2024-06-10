import { format, isToday, isYesterday, subDays, startOfToday } from 'date-fns';

/**
 * Formats a date string to a more readable format for message previews
 * - If the date is today, return the time
 * - If the date is yesterday, return "Yesterday"
 * - If the date is within the last 6 days, return the day of the week
 * - Otherwise, return the date in MM/dd/yy format
 * 
 * @param timestamp String representation of a date in ISO format
 * @returns Formatted date string
 */
export const formatDateTimeFromToday = (timestamp: string): string => {
    const date = new Date(timestamp);

    if (isToday(date)) {
        return `Today ${format(date, "p")}`;
    } else if (isYesterday(date)) {
        return "Yesterday";
    } else if (date >= subDays(startOfToday(), 6)) {
        return format(date, "EEEE");
    } else {
        return format(date, "MM/dd/yy");
    }
};

/**
 * Format string in a pretty way by replacing dash with space and capitalizing the first letter of the string
 */
export const removeDashFromString = (str: string): string => {
    return str.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Format a number to a currency string in GBP
 * 
 * @param amount The amount to format
 * @returns A formatted string of the amount in GBP
 */
export const formatAmount = (amount: number, currency?: string): string => {
    return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: currency ?? "GBP",
    }).format(amount);
}

/**
 * Capitalize the first letter of a string
 * 
 * @param str The string to format
 * @returns The string with the first letter capitalized
 */
export const firstLetterUppercase = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}