import Link from "next/link";
import Image from "next/image";

const productLinks = [
  { href: "/#product", label: "Demo" },
  { href: "/#why", label: "Why Arivo" },
  { href: "/#waitlist", label: "Get Early Access" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
];

const connectLinks = [
  { href: "/contact", label: "Contact" },
  {
    href: "https://www.linkedin.com/company/125614133/",
    label: "LinkedIn",
    external: true,
  },
  {
    href: "https://medium.com/@akhileshgoswami_10630",
    label: "Medium",
    external: true,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-black/8 bg-white">
      <div className="mx-auto grid max-w-container gap-10 px-7 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="mb-3 flex items-center gap-2 font-display text-base font-extrabold text-arivo-text">
            <Image
              src="/assets/logo-mark.svg"
              alt="Arivo logo mark"
              width={22}
              height={22}
            />
            Arivo
          </span>
          <p className="text-sm leading-relaxed text-arivo-muted">
            Every major financial decision. One intelligent answer.
          </p>
        </div>

        <div>
          <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-arivo-muted">
            Product
          </span>
          <div className="flex flex-col gap-2.5">
            {productLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-arivo-muted transition-colors hover:text-arivo-text"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-arivo-muted">
            Company
          </span>
          <div className="flex flex-col gap-2.5">
            {companyLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-arivo-muted transition-colors hover:text-arivo-text"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-arivo-muted">
            Connect
          </span>
          <div className="flex flex-col gap-2.5">
            {connectLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-arivo-muted transition-colors hover:text-arivo-text"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-arivo-muted transition-colors hover:text-arivo-text"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-container flex-col items-center justify-between gap-4 border-t border-black/8 px-7 py-6 text-sm text-arivo-muted sm:flex-row">
        <span>&copy; 2026 Arivo. All rights reserved.</span>
        <div className="flex gap-2">
          <a
            href="https://www.linkedin.com/in/akhilesh-goswami/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Founder LinkedIn"
            className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-black/8 bg-white text-arivo-muted transition-colors hover:border-arivo-primary/20 hover:text-arivo-primary"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path
                fill="currentColor"
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
              />
            </svg>
          </a>
          <a
            href="https://medium.com/@akhileshgoswami_10630"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Medium blog"
            className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-black/8 bg-white text-arivo-muted transition-colors hover:border-arivo-primary/20 hover:text-arivo-primary"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path
                fill="currentColor"
                d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42zM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"
              />
            </svg>
          </a>
          <a
            href="mailto:akhileshgoswami@arivoai.in"
            aria-label="Email Arivo"
            className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-black/8 bg-white text-arivo-muted transition-colors hover:border-arivo-primary/20 hover:text-arivo-primary"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16v12H4z M4 7l8 6 8-6"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
