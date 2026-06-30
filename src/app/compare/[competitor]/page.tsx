import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import { getCompetitor, COMPETITORS } from "@/lib/constants/competitors";
import { buildPageMetadata } from "@/lib/seo/metadata";

interface ComparePageProps {
  params: { competitor: string };
}

export function generateStaticParams() {
  return COMPETITORS.map((c) => ({ competitor: c.slug }));
}

export function generateMetadata({ params }: ComparePageProps): Metadata {
  const competitor = getCompetitor(params.competitor);
  if (!competitor) return {};

  return buildPageMetadata({
    title: competitor.title,
    description: competitor.description,
    path: `/compare/${competitor.slug}`,
    keywords: [`Arivo vs ${competitor.name}`, `${competitor.name} alternative`, "AI financial assistant India", "financial decision engine"],
  });
}

export default function ComparePage({ params }: ComparePageProps) {
  const competitor = getCompetitor(params.competitor);
  if (!competitor) notFound();

  return (
    <main className="bg-page">
      <PageHero
        label="Compare"
        title={competitor.title}
        description={competitor.description}
      />

      <section className="page-section">
        <div className="mx-auto max-w-container px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Compare" },
              { label: `vs ${competitor.name}` },
            ]}
          />

          <div className="mt-12 mb-16 max-w-3xl">
            <h2 className="mb-6 font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-ink">
              The Arivo Advantage
            </h2>
            <p className="text-lg leading-relaxed text-ink-muted">
              {competitor.arivoAdvantage}
            </p>
          </div>

          <div className="mb-16 overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-card">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-ink/5">
                  <tr>
                    <th className="p-4 font-semibold text-ink sm:p-6">Feature</th>
                    <th className="p-4 font-semibold text-brand-green sm:p-6">Arivo</th>
                    <th className="p-4 font-semibold text-ink-muted sm:p-6">{competitor.name}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/10">
                  {competitor.features.map((feature, i) => (
                    <tr key={i} className="transition-colors hover:bg-ink/5">
                      <td className="p-4 font-medium text-ink sm:p-6">{feature.name}</td>
                      <td className="p-4 font-semibold text-ink sm:p-6">
                        {typeof feature.arivo === "boolean" ? (
                          feature.arivo ? (
                            <Check className="h-5 w-5 text-brand-green" />
                          ) : (
                            <X className="h-5 w-5 text-red-500" />
                          )
                        ) : (
                          feature.arivo
                        )}
                      </td>
                      <td className="p-4 text-ink-muted sm:p-6">
                        {typeof feature.competitor === "boolean" ? (
                          feature.competitor ? (
                            <Check className="h-5 w-5 text-brand-green" />
                          ) : (
                            <X className="h-5 w-5 text-red-500" />
                          )
                        ) : (
                          feature.competitor
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-center">
            <h2 className="mb-4 font-display text-2xl font-bold text-ink">Ready to try a smarter alternative?</h2>
            <p className="mb-8 text-ink-muted">Join the Arivo closed beta and experience smart suggestions.</p>
            <Button asChild size="lg">
              <Link href="/#early-access">Join the Waitlist</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
