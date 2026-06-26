import type { ReactNode } from "react";

interface LegalPageLayoutProps {
  title: string;
  subtitle?: string;
  label?: string;
  children: ReactNode;
}

export function LegalPageLayout({ title, subtitle, label = "Legal", children }: LegalPageLayoutProps) {
  return (
    <main>
      <section
        aria-labelledby="legal-page-heading"
        className="border-b border-black/8 bg-arivo-surface pt-32 pb-12"
      >
        <div className="mx-auto max-w-[900px] px-7">
          <span className="section-label">{label}</span>
          <h1
            id="legal-page-heading"
            className="mb-3 font-display text-[clamp(2rem,5vw,2.75rem)] font-extrabold tracking-tight text-arivo-text"
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-base text-arivo-muted">{subtitle}</p>
          )}
        </div>
      </section>

      <section aria-label={`${title} content`} className="py-16 lg:py-20">
        <div className="mx-auto max-w-[900px] px-7">
          <article className="space-y-10 rounded-2xl border border-black/8 bg-white p-8 sm:p-10 lg:p-12">
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
      <h2 className="mb-3 font-display text-xl font-bold tracking-tight text-arivo-text">
        {title}
      </h2>
      <div className="space-y-3 text-base leading-relaxed text-arivo-muted">
        {children}
      </div>
    </section>
  );
}
