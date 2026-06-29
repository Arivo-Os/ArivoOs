import { getLoginUrl } from "@/lib/auth/routes";

export function redirectToLogin(next?: string): void {
  if (typeof window === "undefined") return;

  const target = getLoginUrl(next ?? `${window.location.pathname}${window.location.search}`);
  const current = `${window.location.pathname}${window.location.search}`;

  if (current !== target) {
    window.location.replace(target);
  }
}
