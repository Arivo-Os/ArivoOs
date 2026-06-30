import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { FounderSection } from "@/components/sections/FounderSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { aboutJsonLd } from "@/lib/seo/structured-data";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "About Arivo — AI Personal Finance Companion for India",
  description:
    "Meet the team behind Arivo. We are building an AI-powered personal finance app to help Indians understand their money, track goals, and make smarter financial decisions.",
  path: "/about",
  keywords: ["about Arivo", "Arivo founder", "AI finance India", "personal finance app"],
});

const stats = [
  { value: "One engine", label: "Every major decision type" },
  { value: "Clear verdict", label: "Proceed, wait, or reconsider" },
  { value: "Your context", label: "Income, goals, obligations" },
];

const pillars = [
  {
    num: "01",
    title: "Not another finance app",
    body: "Arivo isn't an expense tracker, bank, or chatbot. It's a Financial Decision Engine — built specifically for the choices that change your life.",
  },
  {
    num: "02",
    title: "Decisions deserve structure",
    body: "Every analysis includes a verdict, confidence score, risk assessment, and long-term impact — so you know not just what to do, but how sure you can be.",
  },
  {
    num: "03",
    title: "Timing matters as much as math",
    body: "The right decision at the wrong time is still the wrong decision. Arivo weighs your full financial context before recommending action.",
  },
  {
    num: "04",
    title: "Clarity before commitment",
    body: "Expensive mistakes often come from acting too soon. We help you run the scenario before you sign, buy, or move.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-page">
      <JsonLd id="jsonld-about" data={aboutJsonLd} />

      <PageHero
        label="About Arivo"
        title="Know more about us."
        description="We're building the decision layer for your financial life — so every major money choice comes with clarity, not guesswork."
      />

      <section aria-labelledby="mission-heading" className="page-section">
        <div className="mx-auto max-w-container px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
          <Reveal className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div>
              <span className="section-label">Our mission</span>
              <h2 id="mission-heading" className="mb-4 font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-tight text-ink">
                Help people decide — not just track.
              </h2>
              <p className="mb-4 text-lg leading-relaxed text-ink-muted">
                Most financial tools show you where your money went. Arivo answers the question that actually matters:{" "}
                <strong className="text-ink">what should I do next?</strong>
              </p>
              <p className="text-base leading-relaxed text-ink-muted">
                From buying a home to switching careers, people face high-stakes decisions with incomplete information and too many conflicting opinions. We built Arivo to turn that uncertainty into a clear, confident recommendation — backed by your real financial picture.
              </p>
            </div>
            <div className="grid gap-4">
              {stats.map((stat) => (
                <div key={stat.value} className="rounded-2xl bg-surface p-6 shadow-card">
                  <span className="mb-1 block font-display text-lg font-extrabold text-accent-primary">
                    {stat.value}
                  </span>
                  <span className="text-sm text-ink-muted">{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="beliefs-heading" className="page-section-alt">
        <div className="mx-auto max-w-container px-6 lg:px-8">
          <Reveal className="mb-12 max-w-2xl">
            <span className="section-label">What we believe</span>
            <h2 id="beliefs-heading" className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-tight text-ink">
              A new category — smart suggestions.
            </h2>
          </Reveal>
          <Reveal stagger className="grid gap-5 sm:grid-cols-2">
            {pillars.map((pillar) => (
              <article key={pillar.num} className="rounded-2xl bg-surface p-7 shadow-card transition-all hover:-translate-y-0.5">
                <span className="mb-3 block font-display text-sm font-extrabold text-accent-primary">
                  {pillar.num}
                </span>
                <h3 className="mb-2 font-display text-lg font-bold text-ink">{pillar.title}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">{pillar.body}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="story-heading" className="page-section">
        <div className="mx-auto max-w-container px-6 lg:px-8">
          <Reveal className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16">
            <div>
              <span className="section-label">Why we started</span>
              <h2 id="story-heading" className="mb-4 font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-tight text-ink">
                People research for months — and still guess.
              </h2>
              <p className="mb-4 text-base leading-relaxed text-ink-muted">
                Spreadsheets, calculators, and finance blogs each give you a piece of the picture. None of them tell you, clearly and personally, whether now is the right time to buy that car, take that job, or invest that lump sum.
              </p>
              <p className="text-base leading-relaxed text-ink-muted">
                Arivo exists to close that gap. One intelligent answer, grounded in your finances and goals — before the decision becomes a regret.
              </p>
            </div>
            <blockquote className="rounded-2xl border border-accent-primary/20 bg-accent-primary/5 p-8">
              <p className="font-display text-xl font-bold leading-snug text-ink">
                Think of Arivo as the <strong>operating system for money choices</strong> that actually matter.
              </p>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <FounderSection />

      <section aria-labelledby="about-cta-heading" className="page-section-alt">
        <div className="mx-auto max-w-container px-6 lg:px-8">
          <Reveal className="text-center">
            <h2 id="about-cta-heading" className="mb-3 font-display text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-tight text-ink">
              Ready to decide smarter?
            </h2>
            <p className="mx-auto mb-8 max-w-md text-base text-ink-muted">
              Join the waitlist for closed beta access, or reach out if you&apos;d like to partner with us.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/#early-access">Join the Waitlist</Link>
              </Button>
              <Button variant="ghost" asChild size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>

            <div className="mt-12 mx-auto max-w-2xl rounded-xl border border-app-border bg-app-bg p-4 text-left text-xs leading-relaxed text-app-muted flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
              <span><strong>Disclaimer:</strong> Arivo is currently in Beta and may occasionally generate inaccurate or incomplete information. Always verify important financial decisions with a qualified financial advisor. Arivo is not a SEBI-registered investment advisor and does not provide investment advice.</span>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
