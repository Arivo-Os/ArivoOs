import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

const highlights = ["Decision Intelligence", "Financial Engine", "Early Access"];

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/akhilesh-goswami/",
    label: "Akhilesh Goswami on LinkedIn",
    icon: (
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    ),
  },
  {
    href: "https://medium.com/@akhileshgoswami_10630",
    label: "Arivo blog on Medium",
    icon: (
      <path
        fill="currentColor"
        d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42zM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"
      />
    ),
  },
  {
    href: "https://www.linkedin.com/company/125614133/",
    label: "Arivo on LinkedIn",
    icon: (
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    ),
  },
  {
    href: "mailto:akhileshgoswami@arivoai.in",
    label: "Email Arivo",
    icon: (
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16v12H4z M4 7l8 6 8-6"
      />
    ),
  },
];

export function FounderSection() {
  return (
    <section id="founder" aria-labelledby="founder-heading" className="bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-container px-7">
        <Reveal className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-center lg:items-start">
            <div className="relative mb-8">
              <div
                className="absolute -inset-3 rounded-full border border-arivo-primary/20"
                aria-hidden="true"
              />
              <div className="relative h-56 w-56 overflow-hidden rounded-full border-4 border-white shadow-[0_16px_48px_rgba(26,122,82,0.15)] sm:h-64 sm:w-64">
                <Image
                  src="/assets/founder-akhilesh-goswami.png"
                  alt="Akhilesh Goswami, Founder of Arivo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 224px, 256px"
                />
              </div>
            </div>
            <blockquote className="max-w-sm text-center lg:text-left">
              <p className="font-display text-lg font-bold italic leading-snug text-arivo-text">
                &ldquo;Life&apos;s biggest money decisions deserve more than guesswork.&rdquo;
              </p>
            </blockquote>
          </div>

          <div className="rounded-3xl border border-black/8 bg-arivo-surface p-8 transition-shadow duration-350 hover:shadow-[0_12px_40px_rgba(26,122,82,0.08)] sm:p-10">
            <span className="section-label">Founder</span>
            <h2 id="founder-heading" className="mb-1 font-display text-3xl font-extrabold tracking-tight text-arivo-text">
              Akhilesh Goswami
            </h2>
            <p className="mb-5 text-sm font-semibold text-arivo-primary">Founder, Arivo</p>
            <p className="mb-4 text-base leading-relaxed text-arivo-muted">
              After 4+ years building technology across fintech, blockchain, and AI, I saw the same problem repeatedly: people were surrounded by financial data but lacked clear guidance when making important decisions.
            </p>
            <p className="mb-6 text-base leading-relaxed text-arivo-muted">
              That&apos;s why I started Arivo—to create Decision Intelligence for everyday life.
            </p>
            <div className="mb-6 flex flex-wrap gap-2">
              {highlights.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-arivo-primary/12 bg-arivo-primary/6 px-3 py-1.5 text-[11px] font-semibold text-arivo-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  aria-label={link.label}
                  className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-black/8 bg-white text-arivo-muted transition-colors hover:border-arivo-primary/20 hover:text-arivo-primary"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                    {link.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
