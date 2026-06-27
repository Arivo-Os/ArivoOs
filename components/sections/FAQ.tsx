"use client";

import { MotionReveal } from "@/components/ui/MotionReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS } from "@/lib/seo/faq";

export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="border-t border-ink/5 bg-page py-[120px]">
      <div className="mx-auto max-w-container px-6 lg:px-8">
        <MotionReveal className="mb-10 max-w-xl">
          <span className="section-label">FAQ</span>
          <h2
            id="faq-heading"
            className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tight text-ink"
          >
            Common questions about Arivo
          </h2>
          <p className="mt-3 text-base text-ink-muted">
            Everything you need to know about Arivo, closed beta access, and AI personal finance in India.
          </p>
        </MotionReveal>

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
