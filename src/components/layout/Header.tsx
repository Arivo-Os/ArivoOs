"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useTheme } from "@/features/theme/theme-context";
import { useAuth } from "@/features/auth/context/auth-context";

const navLinks = [
  { href: "/#meet-veris", label: "Meet Veris" },
  { href: "/#financial-profile", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact Us" },
];

function Logo({ light }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Arivo home">
      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-green text-sm font-extrabold text-[#08111A] shadow-glow">
        A
      </span>
      <span className={cn("text-lg font-bold tracking-tight", light ? "text-white" : "text-ink")}>
        Arivo
      </span>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const { isDark } = useTheme();
  const { isAuthenticated, isLoading } = useAuth();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onHero = isHome && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        onHero
          ? "border-b border-white/0 bg-transparent py-5"
          : scrolled
            ? cn(
              "border-b py-3 shadow-card backdrop-blur-xl",
              isDark
                ? "border-app-border bg-app-surface/90"
                : "border-ink/5 bg-surface/85"
            )
            : cn(
              "border-b py-4 backdrop-blur-md",
              isDark ? "border-app-border bg-app-bg/90" : "border-ink/5 bg-page/90"
            )
      )}
    >
      <div className="mx-auto flex max-w-container items-center gap-6 px-6 lg:px-8">
        <div className="mr-auto">
          <Logo light={onHero} />
        </div>

        <nav
          className={cn(
            "hidden items-center gap-6 lg:gap-8 md:flex",
            menuOpen &&
            "max-md:absolute max-md:left-0 max-md:right-0 max-md:top-full max-md:flex max-md:flex-col max-md:gap-4 max-md:border-b max-md:p-6",
            menuOpen &&
            (onHero
              ? "max-md:bg-[#08111A]/95"
              : isDark
                ? "max-md:border-app-border max-md:bg-app-surface"
                : "max-md:bg-surface")
          )}
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "text-sm font-medium transition-colors hover:text-brand-green",
                menuOpen && "w-full rounded-lg px-3 py-2.5 hover:bg-brand-green/10",
                onHero ? "text-white/70" : "text-ink-muted"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle
            className={cn(
              onHero && "border-white/20 bg-white/10 text-white hover:border-white/30 hover:text-white"
            )}
          />
          {!isLoading && isAuthenticated ? (
            <Link
              href="/life/"
              className={cn(
                "inline-flex rounded-full px-5 py-2.5 text-sm font-semibold transition-all",
                onHero
                  ? "bg-brand-green text-[#08111A] shadow-glow hover:shadow-glow-lg"
                  : "bg-brand-green text-[#08111A] hover:shadow-glow"
              )}
            >
              Use Arivo
            </Link>
          ) : (
            <Link
              href="/#get-started"
              className={cn(
                "inline-flex rounded-full px-5 py-2.5 text-sm font-semibold transition-all",
                onHero
                  ? "bg-brand-green text-[#08111A] shadow-glow hover:shadow-glow-lg"
                  : "bg-brand-green text-[#08111A] hover:shadow-glow"
              )}
            >
              Use Arivo
            </Link>
          )}
        </div>

        <button
          type="button"
          className="p-2 md:hidden"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className={cn("block h-0.5 w-5", onHero ? "bg-white" : "bg-ink")} />
          <span className={cn("mt-1.5 block h-0.5 w-5", onHero ? "bg-white" : "bg-ink")} />
        </button>
      </div>
    </header>
  );
}
