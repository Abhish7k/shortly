import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);

    return urlObj.protocol === "http:" || urlObj.protocol === "https:";
  } catch (error) {
    console.log("error while validating url", error);
    return false;
  }
}

export function ensureHttps(url: string): string {
  if (!url.startsWith("https://")) {
    return `https://${url}`;
  }

  if (url.startsWith("http://")) {
    return url.replace("http://", "https://");
  }

  return url;
}
