import Link from "next/link";
import { MotionReveal } from "@/components/ui/MotionReveal";

const SEO_SECTIONS = [
  {
    id: "ai-financial-insights",
    title: "AI Financial Insights for Smarter Decisions",
    content: [
      "Managing money in India means juggling income, EMIs, savings goals, and unexpected expenses — often across multiple apps and bank accounts. Arivo brings AI financial insights into one place so you can understand your complete financial picture without spreadsheets or guesswork.",
      "Ask Arivo natural-language questions like whether you can afford a major purchase, how a career change affects your savings timeline, or whether now is the right time to invest. Every answer is grounded in your actual financial data — income, expenses, savings rate, and active goals — not generic tips.",
    ],
  },
  {
    id: "credit-score-analysis",
    title: "Credit Score Analysis & Financial Health",
    content: [
      "Your credit profile affects loan eligibility, interest rates, and long-term financial flexibility. While full credit bureau integration is on the Arivo roadmap, the app already helps you understand the fundamentals: debt-to-income ratio, EMI affordability, savings buffer, and how major decisions impact your financial health.",
      "Before taking a car loan, home loan, or personal loan, Arivo evaluates whether the EMI fits within healthy limits relative to your income — a critical factor banks and credit systems weigh heavily.",
    ],
  },
  {
    id: "budget-planning",
    title: "Budget Planning That Adapts to Your Life",
    content: [
      "Static budgets fail because life changes. Arivo uses smart analytics to show where your money goes, identify spending patterns, and help you plan budgets around real goals — not arbitrary category limits.",
      "Whether you are saving for a Europe trip, building an emergency fund, or planning a major purchase, Arivo connects daily spending to long-term outcomes so every rupee has purpose.",
    ],
  },
  {
    id: "goal-tracking",
    title: "Goal Tracking With Clear Timelines",
    content: [
      "Financial goals without timelines are wishes. Arivo lets you set savings targets, track progress visually, and understand exactly when you will reach each milestone based on your current savings rate and spending habits.",
      "From emergency funds to vacation savings to down payments, every goal gets a plan — and AI keeps you on course with insights when you drift off track.",
    ],
  },
  {
    id: "security-privacy",
    title: "Security & Privacy You Can Trust",
    content: [
      "Arivo is secure by design. Your financial data is never sold to third parties, never used for advertising, and never shared with product partners for commissions. We do not sell financial products — our only goal is helping you make better decisions. Data is encrypted in transit, access is controlled, and you can request account deletion at any time.",
    ],
  },
];

export function SeoContent() {
  return (
    <section
      id="learn-more"
      aria-labelledby="seo-content-heading"
      className="border-t border-ink/5 bg-white py-[120px]"
    >
      <div className="mx-auto max-w-container px-6 lg:px-8">
        <MotionReveal className="mx-auto mb-16 max-w-3xl text-center">
          <span className="section-label">Learn More</span>
          <h2
            id="seo-content-heading"
            className="mb-4 font-display text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-ink"
          >
            AI personal finance built for India
          </h2>
          <p className="text-lg leading-relaxed text-ink-muted">
            Arivo is an AI-powered personal finance app available in closed beta on Google Play.
            Join the waitlist to get early access and help shape the future of money management in India.
          </p>
        </MotionReveal>

        <div className="mx-auto max-w-3xl space-y-14">
          {SEO_SECTIONS.map((section, i) => (
            <MotionReveal key={section.id} delay={i * 0.05}>
              <article id={section.id}>
                <h3 className="mb-4 font-display text-2xl font-bold tracking-tight text-ink">
                  {section.title}
                </h3>
                {section.content.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="mb-4 text-base leading-relaxed text-ink-muted">
                    {paragraph}
                    {section.id === "security-privacy" ? (
                      <>
                        {" "}
                        <Link href="/delete-account/" className="font-medium text-brand-green hover:underline">
                          Request account deletion
                        </Link>
                        .
                      </>
                    ) : null}
                  </p>
                ))}
              </article>
            </MotionReveal>
          ))}

          <MotionReveal delay={0.2}>
            <div className="rounded-2xl border border-brand-green/20 bg-brand-green/5 p-8">
              <h3 className="mb-3 font-display text-xl font-bold text-ink">
                Ready to take control of your finances?
              </h3>
              <p className="mb-4 text-base leading-relaxed text-ink-muted">
                Join the Arivo waitlist for closed beta access on Google Play. Explore our{" "}
                <Link href="/about/" className="font-medium text-brand-green hover:underline">About page</Link>, read the{" "}
                <Link href="/blog/" className="font-medium text-brand-green hover:underline">blog</Link>, or{" "}
                <Link href="/contact/" className="font-medium text-brand-green hover:underline">contact us</Link> with questions.
                Review our <Link href="/privacy/" className="font-medium text-brand-green hover:underline">Privacy Policy</Link> and{" "}
                <Link href="/terms/" className="font-medium text-brand-green hover:underline">Terms &amp; Conditions</Link>.
              </p>
              <Link
                href="/#early-access"
                className="inline-flex h-11 items-center rounded-full bg-brand-green px-6 text-sm font-semibold text-[#08111A] shadow-glow transition-all hover:shadow-glow-lg"
              >
                Join the Waitlist
              </Link>
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
