import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * utility function used to merge tailwind classes and allows class validations
 * @param inputs
 * @returns
 */
export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};
