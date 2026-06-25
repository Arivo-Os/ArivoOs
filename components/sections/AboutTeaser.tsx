import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/button";

export function AboutTeaser() {
  return (
    <section aria-labelledby="about-teaser-heading" className="border-t border-black/8 bg-[#e8f0ec] py-[72px]">
      <div className="mx-auto max-w-container px-7">
        <Reveal>
          <div className="relative flex flex-col items-start justify-between gap-10 overflow-hidden rounded-3xl border border-arivo-primary/12 bg-gradient-to-br from-white to-arivo-surface p-8 shadow-[0_16px_48px_rgba(26,122,82,0.08)] sm:p-11 lg:flex-row lg:items-center">
            <div
              className="pointer-events-none absolute -right-[10%] -top-[40%] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(26,122,82,0.12),transparent_70%)]"
              aria-hidden="true"
            />

            <div className="relative flex-1">
              <span className="section-label">About Arivo</span>
              <h2
                id="about-teaser-heading"
                className="mb-2.5 font-display text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight text-arivo-text"
              >
                Decision intelligence for your financial life.
              </h2>
              <p className="mb-4 max-w-[520px] text-base leading-relaxed text-arivo-muted">
                Learn why we&apos;re building a new category — and how Arivo helps you decide with clarity before life&apos;s biggest money moments.
              </p>
              <p className="sr-only">
                Arivo is a financial decision intelligence company founded in India.
                Its core product is an AI-powered decision engine that evaluates major financial
                decisions — vehicle purchases, home loans, investments, and career moves —
                and returns a structured verdict with confidence score, risk level, and
                recommended next steps. Arivo is not a financial advisor. It is a decision
                layer built on top of a user&apos;s real financial data.
              </p>
              <div className="flex flex-wrap gap-2" aria-hidden="true">
                {["Our mission", "Why we exist"].map((pill) => (
                  <span
                    key={pill}
                    className="rounded-full border border-arivo-primary/12 bg-arivo-primary/6 px-3 py-1.5 text-[11px] font-semibold text-arivo-primary"
                  >
                    {pill}
                  </span>
                ))}
                <Link
                  href="/about#founder"
                  className="rounded-full border border-arivo-primary/12 bg-arivo-primary/6 px-3 py-1.5 text-[11px] font-semibold text-arivo-primary transition-colors hover:bg-arivo-primary/12"
                >
                  Meet the founder
                </Link>
              </div>
            </div>

            <div className="relative flex shrink-0 flex-col items-start gap-3 lg:items-end">
              <Button asChild className="whitespace-nowrap shadow-[0_8px_24px_rgba(26,122,82,0.22)]">
                <Link href="/about">Know more about us</Link>
              </Button>
              <Link
                href="/contact"
                className="text-sm font-semibold text-arivo-muted transition-colors hover:text-arivo-primary"
              >
                Get in touch →
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
