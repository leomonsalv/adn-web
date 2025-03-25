import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const formatUsdCurrency = (value: number): string => {
  const formattedValue = new Intl.NumberFormat('es-VE', {
    style: 'currency',
    currency: 'USD',
  }).format(value);

  return formattedValue;
};

export const formatVefCurrency = (value: number): string => {
  const formattedValue = new Intl.NumberFormat('es-VE', {
    style: 'currency',
    currency: 'VEF',
    currencySign: 'standard',
    currencyDisplay: 'symbol',
  }).format(value);

  return formattedValue.replace('VEF', 'Bs.');
};

export const formatText = (text: string): string => {
  text = text.toLowerCase();
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Format the credit and pre credit available to USD
 */

export const formatCreditValue = (value: number): string => {
  return formatUsdCurrency(value / 100);
};

/**
 * dniTypes
 * - V: Venezolano
 * - E: Extranjero
 * - P: Pasaporte
 * - J: Jurídico
 * - G: Gubernamental
 */

export const dniTypes: Array<{ value: string; label: string }> = [
  { value: 'V', label: 'V' },
  { value: 'E', label: 'E' },
  { value: 'P', label: 'P' },
  { value: 'J', label: 'J' },
  { value: 'G', label: 'G' },
];

/**
 * Generates a URL-friendly slug from a given text.
 *
 * This function converts the input text to lowercase, replaces spaces with hyphens,
 * and removes any non-alphanumeric characters (except hyphens).
 *
 * @param text - The input text to be converted into a slug.
 * @returns The generated slug as a string.
 */

export function generateSlug(text: string): string {
  return text
    .toLowerCase() // Convertir a minúsculas
    .replace(/\s+/g, '-') // Reemplazar espacios con guiones
    .replace(/[^\w\-]+/g, ''); // Eliminar caracteres no alfanuméricos
}
