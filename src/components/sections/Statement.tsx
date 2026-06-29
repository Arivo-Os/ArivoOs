import { Reveal } from "@/components/ui/Reveal";

export function Statement() {
  return (
    <>
      <section aria-labelledby="statement-diff-heading" className="bg-white py-24 lg:py-28">
        <div className="mx-auto max-w-container px-7">
          <Reveal>
            <span className="section-label">The difference</span>
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
              <div className="rounded-[20px] border border-black/8 bg-[#e8f0ec] p-8">
                <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-arivo-muted">
                  Most financial apps
                </span>
                <p id="statement-diff-heading" className="mb-4 font-display text-xl font-bold text-arivo-text">
                  Tell you what <em>happened</em>.
                </p>
                <div className="flex flex-wrap gap-2" aria-hidden="true">
                  {["Past spending", "Balances", "Receipts"].map((chip) => (
                    <span key={chip} className="rounded-full bg-white/60 px-3 py-1 text-xs font-medium text-arivo-muted">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              <div className="hidden items-center gap-2 lg:flex" aria-hidden="true">
                <div className="h-px w-12 bg-arivo-accent/30" />
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-arivo-accent/20 text-arivo-accent">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                    <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>

              <div className="rounded-[20px] border border-arivo-primary/20 bg-gradient-to-br from-arivo-primary/5 to-arivo-accent/5 p-8">
                <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-arivo-primary">
                  Arivo
                </span>
                <p className="mb-4 font-display text-xl font-bold text-arivo-text">
                  Tells you what to do <span className="statement-gradient">next</span>.
                </p>
                <div className="flex flex-wrap gap-2" aria-hidden="true">
                  {["Clear verdict", "Confidence", "Next step"].map((chip) => (
                    <span key={chip} className="rounded-full border border-arivo-primary/15 bg-white/70 px-3 py-1 text-xs font-semibold text-arivo-primary">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="statement-shift-heading" className="border-t border-black/8 bg-arivo-surface py-24 lg:py-28">
        <div className="mx-auto max-w-container px-7">
          <Reveal>
            <span className="section-label">The shift</span>
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
              <div className="rounded-[20px] border border-black/8 bg-white p-8">
                <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-arivo-muted">
                  The old paradigm
                </span>
                <p id="statement-shift-heading" className="mb-4 text-lg text-arivo-muted">
                  The future of money is not tracking.
                </p>
                <div className="flex flex-wrap gap-2" aria-hidden="true">
                  {["Charts", "Receipts", "Balances"].map((chip) => (
                    <span key={chip} className="rounded-full bg-[#e8f0ec] px-3 py-1 text-xs font-medium text-arivo-muted">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              <div className="hidden items-center gap-2 lg:flex" aria-hidden="true">
                <div className="h-px w-12 bg-arivo-accent/30" />
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-arivo-accent/20 text-arivo-accent">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                    <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>

              <div className="rounded-[20px] border border-arivo-primary/20 bg-gradient-to-br from-arivo-primary/8 to-arivo-accent/5 p-8">
                <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-arivo-primary">
                  The new paradigm
                </span>
                <p className="mb-4 font-display text-xl font-extrabold statement-gradient">
                  The future of money is decision intelligence.
                </p>
                <div className="flex flex-wrap gap-2" aria-hidden="true">
                  {["Verdict", "Confidence", "Impact"].map((chip) => (
                    <span key={chip} className="rounded-full border border-arivo-primary/15 bg-white/70 px-3 py-1 text-xs font-semibold text-arivo-primary">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
