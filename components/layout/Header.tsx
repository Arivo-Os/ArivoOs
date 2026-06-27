"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const homeNav = [
  { href: "/#features", label: "Features" },
  { href: "/#roadmap", label: "Roadmap" },
  { href: "/#early-access", label: "Early Access" },
];

const subNav = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

function Logo({ light }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Arivo home">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-green text-sm font-extrabold text-[#08111A]">
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
  const navLinks = isHome ? homeNav : subNav;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        onHero
          ? "border-b border-white/0 bg-transparent py-5"
          : scrolled
            ? "border-b border-ink/5 bg-white/80 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.06)] backdrop-blur-xl"
            : "border-b border-ink/5 bg-page/90 py-4 backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex max-w-container items-center gap-6 px-6 lg:px-8">
        <div className="mr-auto">
          <Logo light={onHero} />
        </div>

        <nav
          className={cn(
            "hidden items-center gap-8 md:flex",
            menuOpen &&
              "max-md:absolute max-md:left-0 max-md:right-0 max-md:top-full max-md:flex max-md:flex-col max-md:gap-4 max-md:border-b max-md:p-6",
            menuOpen && (onHero ? "max-md:bg-[#08111A]/95" : "max-md:bg-white")
          )}
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "text-sm font-medium transition-colors",
                onHero ? "text-white/70 hover:text-white" : "text-ink-muted hover:text-ink"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href={isHome ? "/#early-access" : "/#early-access"}
          className={cn(
            "hidden rounded-full px-5 py-2.5 text-sm font-semibold transition-all md:inline-flex",
            onHero
              ? "bg-brand-green text-[#08111A] shadow-glow hover:shadow-glow-lg"
              : "bg-brand-green text-[#08111A] hover:shadow-glow"
          )}
        >
          Join Waitlist
        </Link>

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
