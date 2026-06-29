import Link from "next/link";
import { Heart, Linkedin, Globe } from "lucide-react";
import { SITE_URL, SOCIAL_LINKS } from "@/lib/constants/site";

const centerLinks = [
  { href: "/#meet-veris", label: "Meet Veris" },
  { href: "/#financial-profile", label: "How It Works" },
  { href: "/#get-started", label: "Use Arivo" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact Us" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/delete-account", label: "Delete Account" },
];

export function Footer() {
  return (
    <footer className="bg-[#08111A] text-white">
      <div className="mx-auto grid max-w-container gap-10 px-6 py-16 lg:grid-cols-3 lg:px-8">
        <div>
          <div className="mb-3 flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-green text-sm font-extrabold text-[#08111A]">
              A
            </span>
            <span className="text-lg font-bold">Arivo</span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-white/55">
            Your financial life. One AI companion.
          </p>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex w-full flex-wrap gap-x-8 gap-y-3 lg:justify-center"
        >
          {centerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/55 transition-colors hover:text-brand-green"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3 text-sm lg:items-end">
          <a
            href={SITE_URL}
            className="inline-flex items-center gap-2 text-white/55 transition-colors hover:text-brand-green"
          >
            <Globe className="h-4 w-4" aria-hidden="true" />
            arivoai.in
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/55 transition-colors hover:text-brand-green"
          >
            <Linkedin className="h-4 w-4" aria-hidden="true" />
            LinkedIn
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-container px-6 py-5 text-center text-sm text-white/40 lg:px-8 space-y-3">
          <p className="text-xs text-white/35 max-w-3xl mx-auto leading-relaxed">
            Disclaimer: Arivo is in Beta and could produce incorrect outputs. Please consult with your finance advisor. We are not a SEBI registered entity.
          </p>
          <div>
            © 2026 Arivo · Made with{" "}
            <Heart className="inline h-3.5 w-3.5 fill-brand-green text-brand-green" aria-hidden="true" /> in India
          </div>
        </div>
      </div>
    </footer>
  );
}
