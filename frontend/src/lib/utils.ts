import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
