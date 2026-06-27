"use client";

import { MotionReveal } from "@/components/ui/MotionReveal";

export function TrustedBanner() {
  return (
    <section
      aria-label="Google Play Closed Beta announcement"
      className="border-y border-white/[0.06] bg-[#22C55E]/[0.06] py-4 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-container px-7">
        <MotionReveal>
          <p className="text-center text-sm leading-relaxed text-arivo-muted sm:text-[15px]">
            <span className="mr-1.5" aria-hidden="true">
              🎉
            </span>
            <strong className="font-semibold text-white">
              Arivo is now in Closed Beta on Google Play.
            </strong>{" "}
            Join the beta and help shape the future of AI-powered personal
            finance.
          </p>
        </MotionReveal>
      </div>
    </section>
  );
}
