"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { PhoneFrame } from "@/components/ui/PhoneFrame";

const screenshots = [
  {
    src: "/assets/app-chat.png",
    alt: "Arivo AI chat — evaluating a car purchase decision",
  },
  {
    src: "/assets/app-screenshot.png",
    alt: "Arivo financial dashboard with decision verdict and metrics",
  },
  {
    src: "/assets/app-verdict.png",
    alt: "Arivo decision engine showing vehicle purchase recommendation",
  },
];

export function AppScreenshots() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="screenshots"
      aria-labelledby="screenshots-heading"
      className="overflow-hidden border-y border-white/[0.06] bg-arivo-surface/50 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-container px-7">
        <MotionReveal className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="section-label">App Preview</span>
            <h2
              id="screenshots-heading"
              className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight text-white"
            >
              See Arivo in Action
            </h2>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:border-[#22C55E]/30 hover:bg-[#22C55E]/10"
              aria-label="Previous screenshot"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:border-[#22C55E]/30 hover:bg-[#22C55E]/10"
              aria-label="Next screenshot"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </MotionReveal>
      </div>

      <MotionReveal delay={0.1}>
        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-8 overflow-x-auto px-7 pb-4 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{
            paddingLeft: "max(1.75rem, calc((100vw - 1080px) / 2 + 1.75rem))",
          }}
        >
          {screenshots.map((shot) => (
            <div
              key={shot.src}
              className="w-[260px] flex-shrink-0 snap-center sm:w-[280px]"
            >
              <PhoneFrame src={shot.src} alt={shot.alt} />
            </div>
          ))}
        </div>
      </MotionReveal>
    </section>
  );
}
