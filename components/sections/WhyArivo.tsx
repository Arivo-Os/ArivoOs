import { Reveal } from "@/components/ui/Reveal";

const notItems = ["Track spending", "Show transactions", "Create budgets"];
const isItems = [
  "Analyze decisions",
  "Evaluate tradeoffs",
  "Explain risks",
  "Recommend actions",
];

export function WhyArivo() {
  return (
    <section id="why" aria-labelledby="why-heading" className="border-t border-black/8 bg-arivo-surface py-24 lg:py-28">
      <div className="mx-auto max-w-container px-7">
        <Reveal className="mb-14 max-w-2xl">
          <span className="section-label">Why Arivo</span>
          <h2 id="why-heading" className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight text-arivo-text">
            Most financial tools tell you what happened.
            <br />
            Arivo helps you decide what to do next.
          </h2>
        </Reveal>

        <Reveal stagger className="mb-12 grid gap-6 sm:grid-cols-2">
          <div className="rounded-[20px] border border-black/8 bg-[#e8f0ec] p-8 transition-transform duration-350 hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
            <h3 className="mb-5 font-display text-lg font-bold text-arivo-muted">
              Traditional Apps
            </h3>
            <ul className="space-y-3">
              {notItems.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-arivo-muted">
                  <span className="text-arivo-muted/50">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[20px] border border-arivo-primary/20 bg-white p-8 transition-transform duration-350 hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
            <h3 className="mb-5 font-display text-lg font-bold text-arivo-primary">
              Arivo
            </h3>
            <ul className="space-y-3">
              {isItems.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm font-medium text-arivo-text">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-arivo-accent" aria-hidden="true">
                    <path fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal>
          <p className="max-w-2xl text-lg text-arivo-muted">
            Think of Arivo as the <strong className="text-arivo-text">decision layer</strong> for your financial life — the operating system for money choices that actually matter.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
