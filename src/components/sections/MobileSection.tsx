import dynamic from "next/dynamic";
import { Reveal } from "@/components/ui/Reveal";
import { StoreBadge } from "@/components/ui/StoreBadge";

const AppCarousel = dynamic(
  () =>
    import("@/components/ui/AppCarousel").then((m) => ({ default: m.AppCarousel })),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto h-[540px] w-full max-w-[400px]" aria-hidden="true" />
    ),
  }
);

export function MobileSection() {
  return (
    <section id="mobile" aria-labelledby="mobile-heading" className="border-t border-black/8 bg-[#e8f0ec] py-24 lg:py-28">
      <div className="mx-auto grid max-w-container items-center gap-10 px-7 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <span className="section-label">Mobile app</span>
          <h2
            id="mobile-heading"
            className="mb-3 font-display text-[clamp(1.5rem,3.5vw,2rem)] font-extrabold leading-tight tracking-tight text-arivo-text"
          >
            Decision intelligence on the go.
          </h2>
          <p className="mb-6 max-w-[420px] text-base leading-relaxed text-arivo-muted">
            Get verdicts, confidence scores, and clear next steps — wherever life asks the big question.
          </p>
          <StoreBadge />
        </Reveal>

        <Reveal className="flex justify-center lg:justify-end">
          <AppCarousel className="max-w-[400px]" />
        </Reveal>
      </div>
    </section>
  );
}
