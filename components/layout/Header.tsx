"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#why", label: "Why Arivo", ariaLabel: "Why choose Arivo" },
  { href: "/about", label: "About", ariaLabel: "About Arivo and the founder" },
  { href: "/blog", label: "Blog", ariaLabel: "Arivo blog — financial decision insights" },
  { href: "/contact", label: "Contact", ariaLabel: "Contact the Arivo team" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-transparent bg-arivo-surface/82 backdrop-blur-xl transition-all duration-400",
        scrolled && "border-black/8 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.04)]",
        !scrolled && "py-4"
      )}
    >
      <div className="mx-auto flex max-w-container items-center gap-8 px-7">
        <Link href="/" className="mr-auto flex items-center gap-2 font-display text-lg font-extrabold tracking-tight text-arivo-text transition-opacity hover:opacity-70" aria-label="Arivo home">
          <Image
            src="/assets/logo-mark.svg"
            alt="Arivo logo mark"
            width={28}
            height={28}
            priority
          />
          Arivo
        </Link>

        <nav
          id="navMenu"
          role="navigation"
          aria-label="Main navigation"
          className={cn(
            "hidden items-center gap-7 md:flex",
            menuOpen && "max-md:absolute max-md:left-0 max-md:right-0 max-md:top-full max-md:flex max-md:flex-col max-md:border-b max-md:border-black/8 max-md:bg-arivo-surface max-md:p-6"
          )}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-label={link.ariaLabel}
              className="text-sm font-medium text-arivo-muted transition-colors hover:text-arivo-text"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button variant="dark" size="sm" asChild className="hidden md:inline-flex">
          <Link href="/#waitlist">Get Early Access</Link>
        </Button>

        <button
          type="button"
          className="flex flex-col gap-1.5 p-2 md:hidden"
          id="navToggle"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="block h-0.5 w-5 bg-arivo-text" />
          <span className="block h-0.5 w-5 bg-arivo-text" />
        </button>
      </div>
    </header>
  );
}
