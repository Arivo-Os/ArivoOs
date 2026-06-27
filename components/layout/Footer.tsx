import Link from "next/link";
import Image from "next/image";

const productLinks = [
  { href: "/#features", label: "Features" },
  { href: "/#screenshots", label: "App Preview" },
  { href: "/#roadmap", label: "Roadmap" },
  { href: "/#early-access", label: "Closed Beta" },
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
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-black">
      <div className="mx-auto grid max-w-container gap-10 px-7 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="mb-3 flex items-center gap-2 font-display text-base font-extrabold text-white">
            <Image
              src="/assets/logo-mark.svg"
              alt="Arivo logo mark"
              width={22}
              height={22}
            />
            Arivo
          </span>
          <p className="text-sm leading-relaxed text-arivo-muted">
            Your financial life. One AI companion.
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
                className="text-sm text-arivo-muted transition-colors hover:text-white"
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
                className="text-sm text-arivo-muted transition-colors hover:text-white"
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
                  className="text-sm text-arivo-muted transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-arivo-muted transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-container flex-col items-center justify-between gap-4 border-t border-white/[0.06] px-7 py-6 text-sm text-arivo-muted sm:flex-row">
        <span>&copy; 2026 Arivo. All rights reserved.</span>
        <a
          href="mailto:akhileshgoswami@arivoai.in"
          className="transition-colors hover:text-[#22C55E]"
        >
          akhileshgoswami@arivoai.in
        </a>
      </div>
    </footer>
  );
}
