import { Reveal } from "@/components/ui/Reveal";

const decisions = [
  "Buying a car",
  "Buying a house",
  "Planning a wedding",
  "Investing savings",
  "Changing jobs",
  "Moving cities",
];

const oldTools = [
  {
    label: "Spreadsheets",
    note: "Manual, error-prone",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="h-12 w-12 text-arivo-muted" aria-hidden="true">
        <rect x="8" y="12" width="48" height="40" rx="4" stroke="currentColor" strokeWidth="2" />
        <line x1="16" y1="24" x2="48" y2="24" stroke="currentColor" strokeWidth="2" />
        <line x1="16" y1="32" x2="40" y2="32" stroke="currentColor" strokeWidth="2" />
        <line x1="16" y1="40" x2="44" y2="40" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    label: "Calculators",
    note: "One number, no context",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="h-12 w-12 text-arivo-muted" aria-hidden="true">
        <rect x="12" y="8" width="40" height="48" rx="6" stroke="currentColor" strokeWidth="2" />
        <rect x="18" y="16" width="28" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="36" r="3" fill="currentColor" />
        <circle cx="32" cy="36" r="3" fill="currentColor" />
        <circle cx="40" cy="36" r="3" fill="currentColor" />
        <circle cx="24" cy="44" r="3" fill="currentColor" />
        <circle cx="32" cy="44" r="3" fill="currentColor" />
        <circle cx="40" cy="44" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Finance blogs",
    note: "Generic, not personal",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="h-12 w-12 text-arivo-muted" aria-hidden="true">
        <rect x="10" y="10" width="44" height="44" rx="4" stroke="currentColor" strokeWidth="2" />
        <line x1="18" y1="22" x2="46" y2="22" stroke="currentColor" strokeWidth="2" />
        <line x1="18" y1="30" x2="42" y2="30" stroke="currentColor" strokeWidth="2" />
        <line x1="18" y1="38" x2="38" y2="38" stroke="currentColor" strokeWidth="2" />
        <line x1="18" y1="46" x2="34" y2="46" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
];

export function Problem() {
  return (
    <section id="problem" aria-labelledby="problem-heading" className="bg-arivo-surface py-24 lg:py-28">
      <div className="mx-auto max-w-container px-7">
        <Reveal className="mb-14 max-w-2xl">
          <span className="section-label">The problem</span>
          <h2 id="problem-heading" className="mb-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold tracking-tight text-arivo-text">
            People spend months researching financial decisions.
          </h2>
          <p className="text-lg text-arivo-muted">
            Spreadsheets, calculators, and blogs — yet the answer never feels clear.
          </p>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-arivo-muted">
              Life&apos;s biggest money moments
            </p>
            <ul className="mb-6 space-y-2">
              {decisions.map((d) => (
                <li
                  key={d}
                  className="relative pl-5 font-display text-lg font-bold text-arivo-text before:absolute before:left-0 before:text-arivo-accent before:content-['→']"
                >
                  {d}
                </li>
              ))}
            </ul>
            <p className="text-lg text-arivo-muted">
              Yet most decisions are still <strong className="text-arivo-text">guesses.</strong>
            </p>
          </Reveal>

          <div className="space-y-6">
            <Reveal>
              <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-arivo-muted">
                What people use today
              </span>
              <Reveal stagger className="grid gap-4 sm:grid-cols-3">
                {oldTools.map((tool) => (
                  <div
                    key={tool.label}
                    className="relative rounded-2xl border border-black/8 bg-[#e8f0ec] p-5 text-center"
                  >
                    <span className="mb-3 inline-block rounded-full bg-arivo-warning/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-arivo-warning">
                      Not enough
                    </span>
                    <div className="mb-3 flex justify-center">{tool.icon}</div>
                    <span className="block font-display text-sm font-bold text-arivo-text">
                      {tool.label}
                    </span>
                    <p className="mt-1 text-xs text-arivo-muted">{tool.note}</p>
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <div className="h-px w-[80%] rotate-[-12deg] bg-arivo-risk/60" />
                    </div>
                  </div>
                ))}
              </Reveal>
            </Reveal>

            <Reveal className="flex justify-center" aria-hidden="true">
              <div className="flex flex-col items-center gap-1">
                <div className="h-8 w-px bg-arivo-accent/30" />
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-arivo-accent/20 bg-white text-arivo-accent">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                    <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </span>
              </div>
            </Reveal>

            <Reveal>
              <div className="relative overflow-hidden rounded-[20px] border border-arivo-primary/20 bg-gradient-to-br from-arivo-primary/8 to-arivo-accent/5 p-8 text-center">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,194,124,0.15),transparent_60%)]" aria-hidden="true" />
                <span className="mb-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-arivo-primary">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                    <path fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  The Arivo way
                </span>
                <p className="font-display text-3xl font-extrabold tracking-tight text-arivo-text">
                  <span className="text-arivo-primary">Arivo.</span> One answer.
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2" aria-hidden="true">
                  {["Verdict", "Confidence", "Impact"].map((tag) => (
                    <span key={tag} className="rounded-full border border-arivo-primary/15 bg-white/70 px-3 py-1 text-xs font-semibold text-arivo-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
