const TRUST_ITEMS = [
  {
    text: "Your financial data remains private and is never sold.",
    icon: (
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
      />
    ),
  },
  {
    text: "No financial products are sold through Arivo.",
    icon: (
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        d="M18 6L6 18M6 6l12 12"
      />
    ),
  },
  {
    text: "Recommendations are fully independent — no commissions.",
    icon: (
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        d="M9 12l2 2 4-4M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"
      />
    ),
  },
  {
    text: "Transparent reasoning behind every decision verdict.",
    icon: (
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        d="M4 6h16M4 12h10M4 18h16"
      />
    ),
  },
];

export function TrustPrivacy() {
  return (
    <section
      id="trust"
      aria-labelledby="trust-heading"
      className="border-t border-black/8 bg-arivo-surface py-16 lg:py-20"
    >
      <div className="mx-auto max-w-container px-7">
        <h2 id="trust-heading" className="sr-only">
          Arivo trust and privacy commitments
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_ITEMS.map((item) => (
            <li
              key={item.text}
              className="flex flex-col gap-2.5 rounded-[14px] border border-black/8 bg-[#e8f0ec] p-5 text-sm font-medium leading-snug text-arivo-muted"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-arivo-primary" aria-hidden="true">
                {item.icon}
              </svg>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
