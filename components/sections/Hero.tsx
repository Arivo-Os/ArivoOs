import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { HeroEnginePanel } from "@/components/sections/HeroEnginePanel";

const AppCarousel = dynamic(
  () =>
    import("@/components/ui/AppCarousel").then((m) => ({ default: m.AppCarousel })),
  { ssr: false, loading: () => <div className="h-[540px] w-full max-w-[300px]" aria-hidden="true" /> }
);

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-screen items-center justify-center overflow-visible bg-[radial-gradient(ellipse_90%_70%_at_50%_0%,rgba(0,194,124,0.14),transparent_55%),radial-gradient(ellipse_50%_40%_at_80%_20%,rgba(26,122,82,0.08),transparent),linear-gradient(180deg,#F5F7F5_0%,#ffffff_50%)] px-0 pb-16 pt-[100px]"
    >
      <div className="mx-auto flex w-full max-w-container flex-col items-center gap-4 px-7 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:text-left">
        <div className="flex-1 text-center lg:text-left">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-arivo-primary/15 bg-gradient-to-br from-arivo-primary/8 to-arivo-accent/8 px-[18px] py-2 text-[13px] font-bold uppercase tracking-wide text-arivo-primary">
            <svg className="h-4 w-4 opacity-85" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                d="M12 3v3M12 18v3M3 12h3M18 12h3M6.3 6.3l2.1 2.1M15.6 15.6l2.1 2.1M17.7 6.3l-2.1 2.1M8.4 15.6l-2.1 2.1"
              />
            </svg>
            Financial Decision Engine
          </p>

          <h1
            id="hero-heading"
            className="mb-4 font-display text-[clamp(2rem,6vw,4rem)] font-extrabold leading-[1.08] tracking-tight text-arivo-text"
          >
            AI financial decision engine —{" "}
            <span>make smarter money decisions in seconds, not months.</span>
          </h1>

          <p className="mx-auto mb-6 max-w-[520px] text-[clamp(1rem,2.5vw,1.125rem)] font-medium leading-relaxed text-arivo-muted lg:mx-0">
            Arivo is an AI-powered financial decision engine. Tell it your situation. Get a verdict, a confidence score, and a clear next step.
          </p>

          <div className="mb-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Button asChild size="lg">
              <Link href="#waitlist">Get Early Access</Link>
            </Button>
            <Button variant="ghost" asChild size="lg">
              <Link href="#product">See Engine Demo</Link>
            </Button>
          </div>

          <section aria-label="Examples of financial decisions Arivo evaluates">
            <HeroEnginePanel />
          </section>

          <p className="text-sm font-medium text-arivo-muted">
            Launching soon · Limited early access
          </p>
        </div>

        <div className="relative flex w-full flex-[0_0_min(360px,40%)] items-center justify-center lg:justify-end">
          <AppCarousel />
        </div>
      </div>
    </section>
  );
}
