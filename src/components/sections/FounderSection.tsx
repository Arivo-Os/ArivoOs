import Image from "next/image";
import { Linkedin, Mail, BookOpen, BrainCircuit, Cpu, Rocket } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { PLAY_STORE_LABEL } from "@/lib/constants/site";

const highlights = [
  { label: "Smart Suggestions", icon: BrainCircuit },
  { label: "Financial Engine", icon: Cpu },
  { label: PLAY_STORE_LABEL, icon: Rocket },
];

const socialLinks = [
  { href: "https://www.linkedin.com/in/akhilesh-goswami/", label: "Akhilesh Goswami on LinkedIn", icon: Linkedin },
  { href: "https://medium.com/@akhileshgoswami_10630", label: "Arivo blog on Medium", icon: BookOpen },
  { href: "https://www.linkedin.com/company/125614133/", label: "Arivo on LinkedIn", icon: Linkedin },
  { href: "mailto:akhileshgoswami@arivoai.in", label: "Email Arivo", icon: Mail },
];

export function FounderSection() {
  return (
    <section id="founder" aria-labelledby="founder-heading" className="page-section-alt">
      <div className="mx-auto max-w-container px-7">
        <Reveal className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-center lg:items-start">
            <div className="relative mb-8">
              <div className="absolute -inset-3 rounded-full border border-brand-green/20" aria-hidden="true" />
              <div className="relative h-56 w-56 overflow-hidden rounded-full border-4 border-white shadow-card sm:h-64 sm:w-64">
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
              <p className="font-display text-lg font-bold italic leading-snug text-ink">
                &ldquo;Life&apos;s biggest money decisions deserve more than guesswork.&rdquo;
              </p>
            </blockquote>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-card sm:p-10">
            <span className="section-label">Founder</span>
            <h2 id="founder-heading" className="mb-1 font-display text-3xl font-bold tracking-tight text-ink">
              Akhilesh Goswami
            </h2>
            <p className="mb-5 text-sm font-semibold text-brand-green">Founder, Arivo</p>
            <p className="mb-4 text-base leading-relaxed text-ink-muted">
              After 4+ years building technology across fintech, blockchain, and AI, I saw the same problem repeatedly: people were surrounded by financial data but lacked clear guidance when making important decisions.
            </p>
            <p className="mb-6 text-base leading-relaxed text-ink-muted">
              That&apos;s why I started Arivo—to create Smart Suggestions for everyday life.
            </p>
            <div className="mb-6 flex flex-wrap gap-2">
              {highlights.map(({ label, icon: Icon }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-brand-green/20 bg-brand-green/10 px-3 py-1.5 text-[11px] font-semibold text-brand-green"
                >
                  <Icon className="h-3 w-3" strokeWidth={2.25} aria-hidden="true" />
                  {label}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    aria-label={link.label}
                    className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-ink/10 bg-page text-ink-muted transition-colors hover:border-brand-green/30 hover:bg-brand-green/10 hover:text-brand-green"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
