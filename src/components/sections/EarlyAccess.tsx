"use client";

import { MotionReveal } from "@/components/ui/MotionReveal";
import { WaitlistForm } from "@/components/ui/WaitlistForm";

export function EarlyAccess() {
  return (
    <section id="early-access" aria-labelledby="early-access-heading" className="py-[120px]">
      <div className="mx-auto max-w-container px-6 lg:px-8">
        <MotionReveal>
          <div className="relative overflow-hidden rounded-3xl hero-gradient p-10 sm:p-14 lg:p-16">
            <div className="pointer-events-none absolute inset-0 rounded-3xl border border-accent-primary/30 shadow-[inset_0_0_60px_rgba(34,197,94,0.08)]" aria-hidden="true" />
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-accent-primary/15 blur-3xl" aria-hidden="true" />

            <div className="relative mx-auto max-w-xl text-center">
              <h2
                id="early-access-heading"
                className="mb-4 font-display text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-white"
              >
                Be among the first.
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-white/60">
                Arivo is in closed beta. Drop your details and I&apos;ll send you a personal invite.
              </p>

              <WaitlistForm className="text-left" />

              <p className="mt-6 text-sm text-white/40">
                Limited spots · No spam · Cancel anytime
              </p>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
