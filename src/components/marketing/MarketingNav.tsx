"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { cn } from "@/lib/utils";
import { useAuth } from "@/features/auth/context/auth-context";

const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How it Works" },
  { href: "/#security", label: "Security" },
];

export function MarketingNav() {
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();
  const onLanding = pathname === "/";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-colors",
        onLanding ? "border-white/5 bg-app-bg/70" : "border-app-border bg-app-bg/90"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link href="/" className="mr-auto flex items-center gap-2.5" aria-label="Arivo home">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-app-accent text-sm font-extrabold text-app-bg">
            A
          </span>
          <span className="text-lg font-bold text-app-text">Arivo</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-app-muted transition-colors hover:text-app-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {!isLoading && isAuthenticated ? (
            <Link
              href="/life/"
              className="inline-flex h-10 items-center rounded-full bg-app-accent px-5 text-sm font-semibold text-app-bg transition-all hover:brightness-110"
            >
              Use Arivo
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden text-sm font-medium text-app-muted transition-colors hover:text-app-text sm:inline-flex"
              >
                Sign In
              </Link>
              <Link
                href="/#get-started"
                className="inline-flex h-10 items-center rounded-full bg-app-accent px-5 text-sm font-semibold text-app-bg transition-all hover:brightness-110"
              >
                Use Arivo
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export function MarketingFooter() {
  return (
    <footer className="border-t border-app-border bg-app-bg">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 space-y-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-app-accent text-xs font-extrabold text-app-bg">
              A
            </span>
            <span className="font-bold text-app-text">Arivo</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-app-muted" aria-label="Footer">
            <Link href="/privacy" className="hover:text-app-accent">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-app-accent">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-app-accent">
              Contact
            </Link>
          </nav>
          <p className="text-sm text-app-muted">© 2026 Arivo. All rights reserved.</p>
        </div>
        <div className="border-t border-app-border/40 pt-4 text-center">
          <p className="text-xs text-app-muted max-w-3xl mx-auto leading-relaxed">
            Disclaimer: Arivo is in Beta and could produce incorrect outputs. Please consult with your finance advisor. We are not a SEBI registered entity.
          </p>
        </div>
      </div>
    </footer>
  );
}
