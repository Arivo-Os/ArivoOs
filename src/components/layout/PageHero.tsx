interface PageHeroProps {
  label: string;
  title: string;
  description?: string;
}

export function PageHero({ label, title, description }: PageHeroProps) {
  return (
    <section aria-labelledby="page-hero-heading" className="border-b border-ink/5 bg-page pt-32 pb-12">
      <div className="mx-auto max-w-container px-6 lg:px-8">
        <span className="section-label">{label}</span>
        <h1
          id="page-hero-heading"
          className="mb-4 font-display text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-ink"
        >
          {title}
        </h1>
        {description && (
          <p className="max-w-2xl text-lg leading-relaxed text-ink-muted">{description}</p>
        )}
      </div>
    </section>
  );
}
