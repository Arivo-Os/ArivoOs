import { peekFlowQuestion } from "@/lib/onboarding/flow-questions";

export const PROTECTED_APP_PREFIXES = [
  "/life",
  "/veris",
  "/journey",
  "/vault",
  "/settings",
] as const;

export function isProtectedAppPath(pathname: string): boolean {
  return PROTECTED_APP_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export function getLoginUrl(next?: string): string {
  if (!next || next.startsWith("/login") || !isProtectedAppPath(next)) {
    return "/login/";
  }
  return `/login/?next=${encodeURIComponent(next)}`;
}

export function getPostLoginPath(next?: string | null): string {
  if (next && isProtectedAppPath(next)) return next;
  if (peekFlowQuestion()?.trim()) return "/veris/";
  return "/life/";
}
