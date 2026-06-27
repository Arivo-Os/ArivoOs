"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { GooglePlayButton } from "@/components/ui/GooglePlayButton";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/#why", label: "Why Arivo" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
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
        "fixed inset-x-0 top-0 z-50 border-b border-transparent bg-black/70 backdrop-blur-xl transition-all duration-400",
        scrolled && "border-white/[0.06] py-3",
        !scrolled && "py-4"
      )}
    >
      <div className="mx-auto flex max-w-container items-center gap-8 px-7">
        <Link
          href="/"
          className="mr-auto flex items-center gap-2 font-display text-lg font-extrabold tracking-tight text-white transition-opacity hover:opacity-70"
          aria-label="Arivo home"
        >
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
            menuOpen &&
              "max-md:absolute max-md:left-0 max-md:right-0 max-md:top-full max-md:flex max-md:flex-col max-md:border-b max-md:border-white/[0.06] max-md:bg-black/95 max-md:p-6"
          )}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-arivo-muted transition-colors hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <GooglePlayButton className="!h-9 !px-5 !text-sm" label="Get the App" />
        </div>

        <button
          type="button"
          className="flex flex-col gap-1.5 p-2 md:hidden"
          id="navToggle"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="block h-0.5 w-5 bg-white" />
          <span className="block h-0.5 w-5 bg-white" />
        </button>
      </div>
    </header>
  );
}
