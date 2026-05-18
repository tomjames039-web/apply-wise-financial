"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

const faqs = [
  {
    question: "How do mortgage brokers get paid?",
    answer: "We receive commission from lenders for completed applications. Our initial consultation and recommendation is free. Any advisory fees are discussed in advance.",
  },
  {
    question: "Are you whole-of-market?",
    answer: "Yes. We have access to thousands of products from 90+ lenders, allowing us to find the most suitable deal for your circumstances.",
  },
  {
    question: "Why use a broker instead of my bank?",
    answer: "Your bank can only offer their own products. We search thousands of deals from 90+ lenders to find better options for you.",
  },
  {
    question: "Does using a broker take longer?",
    answer: "No. We know exactly what lenders need, so we can prepare everything before you apply. This often speeds up the process.",
  },
  {
    question: "What qualifications do your advisers have?",
    answer: "All advisers are FCA regulated and hold professional certifications. They undergo regular training to stay current with market developments.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-16 md:py-20 bg-pearl-texture relative">
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-navy/10 to-transparent" />

      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <ScrollAnimation>
          <div className="text-center mb-12">
            <p className="text-xs font-medium text-gold uppercase tracking-[0.2em] mb-3">
              FAQ
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-navy tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-navy/50">
              Everything you need to know
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={0.1}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`item-${index}`}
                className="bg-white border border-navy/5 rounded-lg px-6 data-[state=open]:border-gold/30 data-[state=open]:shadow-lg"
              >
                <AccordionTrigger className="text-left text-base font-medium text-navy hover:text-gold hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-navy/60 text-sm leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollAnimation>
      </div>

      {/* Subtle bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-navy/10 to-transparent" />
    </section>
  );
}
