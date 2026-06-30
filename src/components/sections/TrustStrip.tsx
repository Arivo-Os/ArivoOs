import { Reveal } from "@/components/ui/Reveal";

const items = [
  "Vehicle purchases",
  "Home purchases",
  "Investments",
  "Major financial decisions",
];

export function TrustStrip() {
  return (
    <section aria-label="Built for major financial decisions" className="border-y border-black/8 bg-page py-5">
      <div className="mx-auto max-w-container px-7">
        <Reveal className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <span className="text-xs font-bold uppercase tracking-widest text-arivo-muted">
            Built for
          </span>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {items.map((item) => (
              <li
                key={item}
                className="text-sm font-medium text-arivo-text before:mr-2 before:text-arivo-accent before:content-['•'] first:before:content-none"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
