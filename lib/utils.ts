import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tw-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function showWarning(
  numberOfPeople: number,
  bill: number | null,
  tipPercentage: number,
  customTip: string | number,
) {
  return (
    numberOfPeople === 0 &&
    bill !== null &&
    bill > 0 &&
    (tipPercentage > 0 || (customTip && customTip !== 0))
  );
}
