"use client";

import { MotionReveal } from "@/components/ui/MotionReveal";
import { GooglePlayButton } from "@/components/ui/GooglePlayButton";

export function EarlyAccess() {
  return (
    <section
      id="early-access"
      aria-labelledby="early-access-heading"
      className="py-24 lg:py-32"
    >
      <div className="mx-auto max-w-container px-7">
        <MotionReveal>
          <div className="relative overflow-hidden rounded-3xl border border-[#22C55E]/20 bg-gradient-to-br from-[#22C55E]/10 via-white/[0.03] to-transparent p-10 text-center sm:p-14">
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#22C55E]/10 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-[#22C55E]/5 blur-3xl"
              aria-hidden="true"
            />

            <span className="section-label">Early Access</span>
            <h2
              id="early-access-heading"
              className="mb-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold tracking-tight text-white"
            >
              Join Early Access
            </h2>
            <p className="mx-auto mb-3 max-w-lg text-lg text-arivo-muted">
              Be among the first users shaping the future of Arivo.
            </p>
            <p className="mx-auto mb-8 max-w-lg text-arivo-muted">
              Every piece of feedback helps us improve.
            </p>
            <GooglePlayButton size="lg" label="Download Now" />
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
