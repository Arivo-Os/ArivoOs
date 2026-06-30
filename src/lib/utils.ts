import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://arivoai.in";

export const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ??
  "8720f665-cae0-4d29-bcc3-24f50ef18586";

/**
 * Returns the semantic color token based on a Financial Health score (0-100).
 * < 40: coral (needs attention)
 * 40-69: amber (on the way)
 * >= 70: green (doing well)
 */
export function getHealthScoreColor(score: number): string {
  if (score < 40) return "text-accent-negative bg-accent-negative-muted border-accent-negative";
  if (score < 70) return "text-accent-caution bg-accent-caution-muted border-accent-caution";
  return "text-accent-positive bg-accent-positive-muted border-accent-positive";
}

/**
 * Returns the semantic color token based on Veris AI confidence score (0-100).
 */
export function getConfidenceColor(confidence: number): string {
  if (confidence < 50) return "text-accent-negative bg-accent-negative-muted border-accent-negative";
  if (confidence < 80) return "text-accent-caution bg-accent-caution-muted border-accent-caution";
  return "text-accent-positive bg-accent-positive-muted border-accent-positive";
}

export function getHealthScoreTextColor(score: number): string {
  if (score < 40) return "text-accent-negative";
  if (score < 70) return "text-accent-caution";
  return "text-accent-positive";
}

export function getHealthScoreBgColor(score: number): string {
  if (score < 40) return "bg-accent-negative";
  if (score < 70) return "bg-accent-caution";
  return "bg-accent-positive";
}
