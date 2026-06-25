"use client";

import { Reveal } from "@/components/ui/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS } from "@/lib/constants/scenarios";

export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="border-t border-black/8 bg-arivo-surface py-24 lg:py-28">
      <div className="mx-auto max-w-container px-7">
        <Reveal className="mb-10 max-w-xl">
          <span className="section-label">FAQ</span>
          <h2 id="faq-heading" className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight text-arivo-text">
            Common questions about Arivo
          </h2>
        </Reveal>

        <div className="sr-only">
          {FAQ_ITEMS.map((item) => (
            <article key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>

        <Accordion type="single" collapsible defaultValue="item-0" className="max-w-2xl">
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem key={item.question} value={`item-${i}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>
                <p>{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
