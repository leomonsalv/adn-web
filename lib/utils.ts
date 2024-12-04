import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const formatUsdCurrency = (value: number): string => {
  const formattedValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

  return formattedValue;
};

export const formatVefCurrency = (value: number): string => {
  const formattedValue = new Intl.NumberFormat("es-VE", {
    style: "currency",
    currency: "VEF",
    currencySign: "standard",
    currencyDisplay: "symbol",
  }).format(value);

  return formattedValue.replace("VEF", "Bs.");
};
