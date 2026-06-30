import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { getGlossaryTerm, GLOSSARY_TERMS } from "@/lib/constants/glossary";
import { buildPageMetadata } from "@/lib/seo/metadata";

interface GlossaryTermPageProps {
  params: { term: string };
}

export function generateStaticParams() {
  return GLOSSARY_TERMS.map((t) => ({ term: t.slug }));
}

export function generateMetadata({ params }: GlossaryTermPageProps): Metadata {
  const item = getGlossaryTerm(params.term);
  if (!item) return {};

  return buildPageMetadata({
    title: `What is ${item.term}? | Arivo Financial Glossary`,
    description: item.definition,
    path: `/glossary/${item.slug}`,
    keywords: [item.term, `${item.term} meaning`, "financial terms India", "Arivo glossary"],
  });
}

export default function GlossaryTermPage({ params }: GlossaryTermPageProps) {
  const item = getGlossaryTerm(params.term);
  if (!item) notFound();

  return (
    <main className="bg-page min-h-screen">
      <article className="pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Glossary", href: "/glossary" },
              { label: item.term },
            ]}
          />

          <Link href="/glossary" className="mt-8 mb-6 inline-flex items-center text-sm font-semibold text-accent-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Glossary
          </Link>

          <h1 className="mb-8 font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-tight text-ink">
            {item.term}
          </h1>

          <div className="prose-seo space-y-8">
            <section>
              <h2 className="mb-4 font-display text-xl font-bold text-ink">Definition</h2>
              <p className="text-lg leading-relaxed text-ink-muted">
                {item.definition}
              </p>
            </section>

            <section className="mt-12 rounded-2xl border border-accent-primary/20 bg-accent-primary/5 p-8">
              <div className="mb-4 flex items-center gap-2 text-accent-primary">
                <Sparkles className="h-5 w-5" />
                <h2 className="font-display text-lg font-bold">The Arivo Context</h2>
              </div>
              <p className="text-base leading-relaxed text-ink-muted">
                {item.arivoContext}
              </p>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}
