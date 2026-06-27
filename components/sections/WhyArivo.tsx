"use client";

import { MotionReveal } from "@/components/ui/MotionReveal";

export function WhyArivo() {
  return (
    <section id="why" aria-labelledby="why-heading" className="py-24 lg:py-32">
      <div className="mx-auto max-w-container px-7">
        <div className="mx-auto max-w-3xl text-center">
          <MotionReveal>
            <span className="section-label">Why Arivo</span>
            <h2
              id="why-heading"
              className="mb-6 font-display text-[clamp(2rem,5vw,3rem)] font-extrabold leading-tight tracking-tight text-white"
            >
              Finance Should Feel{" "}
              <span className="text-gradient-green">Simple.</span>
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <p className="text-lg leading-relaxed text-arivo-muted">
              Managing money shouldn&apos;t require multiple apps and
              spreadsheets.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-arivo-muted">
              Arivo combines AI with personal finance to help users understand
              their finances and make better decisions every day.
            </p>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
