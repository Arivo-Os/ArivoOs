import type { ReactNode } from "react";

interface LegalPageLayoutProps {
  title: string;
  subtitle?: string;
  label?: string;
  children: ReactNode;
}

export function LegalPageLayout({ title, subtitle, label = "Legal", children }: LegalPageLayoutProps) {
  return (
    <main className="bg-page">
      <section aria-labelledby="legal-page-heading" className="border-b border-ink/5 bg-white pt-32 pb-12">
        <div className="mx-auto max-w-[900px] px-6 lg:px-8">
          <span className="section-label">{label}</span>
          <h1
            id="legal-page-heading"
            className="mb-3 font-display text-[clamp(2rem,5vw,2.75rem)] font-bold tracking-tight text-ink"
          >
            {title}
          </h1>
          {subtitle && <p className="text-base text-ink-muted">{subtitle}</p>}
        </div>
      </section>

      <section aria-label={`${title} content`} className="py-16 lg:py-20">
        <div className="mx-auto max-w-[900px] px-6 lg:px-8">
          <article className="space-y-10 rounded-2xl bg-white p-8 shadow-card sm:p-10 lg:p-12">
            {children}
          </article>
        </div>
      </section>
    </main>
  );
}

interface LegalSectionProps {
  title: string;
  children: ReactNode;
}

export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section>
      <h2 className="mb-3 font-display text-xl font-bold tracking-tight text-ink">{title}</h2>
      <div className="space-y-3 text-base leading-relaxed text-ink-muted [&_strong]:text-ink">
        {children}
      </div>
    </section>
  );
}
