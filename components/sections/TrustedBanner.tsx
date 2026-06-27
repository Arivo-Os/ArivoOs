"use client";

import { PartyPopper } from "lucide-react";
import { MotionReveal } from "@/components/ui/MotionReveal";

export function TrustedBanner() {
  return (
    <section
      aria-label="Google Play Closed Beta announcement"
      className="border-y border-brand-green/10 bg-brand-green/5 py-4"
    >
      <div className="mx-auto max-w-container px-7">
        <MotionReveal>
          <p className="flex items-center justify-center gap-2 text-center text-sm leading-relaxed text-ink-muted sm:text-[15px]">
            <PartyPopper className="h-4 w-4 shrink-0 text-brand-green" aria-hidden="true" />
            <span>
              <strong className="font-semibold text-ink">
                Arivo is now in Closed Beta on Google Play.
              </strong>{" "}
              Join the beta and help shape the future of AI-powered personal finance.
            </span>
          </p>
        </MotionReveal>
      </div>
    </section>
  );
}
