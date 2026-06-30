import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { GLOSSARY_TERMS } from "@/lib/constants/glossary";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Financial Glossary — Arivo",
  description: "Learn the essential personal finance terms in India and understand how AI smart suggestions interprets them.",
  path: "/glossary",
  keywords: ["financial glossary", "finance terms India", "EMI meaning", "SIP definition", "CIBIL score explained"],
});

export default function GlossaryIndexPage() {
  // Sort terms alphabetically
  const sortedTerms = [...GLOSSARY_TERMS].sort((a, b) => a.term.localeCompare(b.term));

  return (
    <main className="bg-page">
      <PageHero
        label="Glossary"
        title="Financial Terms, Demystified."
        description="Clear definitions of common Indian finance terms, and how Arivo's AI thinks about them when giving you advice."
      />

      <section className="page-section">
        <div className="mx-auto max-w-container px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Glossary" }]} />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedTerms.map((item) => (
              <Link
                key={item.slug}
                href={`/glossary/${item.slug}`}
                className="group flex flex-col justify-between rounded-2xl bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-glow"
              >
                <div>
                  <h2 className="mb-3 font-display text-xl font-bold text-ink group-hover:text-brand-green transition-colors">
                    {item.term}
                  </h2>
                  <p className="line-clamp-3 text-sm leading-relaxed text-ink-muted">
                    {item.definition}
                  </p>
                </div>
                <div className="mt-6 flex items-center font-semibold text-brand-green text-sm">
                  Read more <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
