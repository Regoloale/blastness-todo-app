import { differenceInDays } from "date-fns";

export const getDayColor = (date: Date | null | undefined) => {
  if (!date) return "info.light";
  const difference = differenceInDays(date, new Date());

  console.log("Difference", { difference, date });

  if (difference > 3) {
    return "success.light";
  }

  if (difference > 1) {
    return "warning.light";
  }

  return "error.light";
};
