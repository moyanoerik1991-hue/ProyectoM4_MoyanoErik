import { dateToInputStrings } from "./dateToInputStrings";

export function getDeadlineRange(): { min: string; max: string } {
    const now = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 10);

    return {
        min: dateToInputStrings(now).datePart,
        max: dateToInputStrings(maxDate).datePart,
    };
}
