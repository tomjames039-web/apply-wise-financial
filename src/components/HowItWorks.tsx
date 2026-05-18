"use client";

import Link from "next/link";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

const steps = [
  {
    number: "01",
    title: "Share Your Details",
    description: "Tell us about your goals. It takes around 8 minutes.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Book a Call",
    description: "Speak with a qualified adviser. Evenings and weekends available.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Get Your Mortgage",
    description: "We handle the application. You get the keys.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-20 bg-pearl-texture relative">
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-navy/10 to-transparent" />

      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <p className="text-xs font-medium text-gold uppercase tracking-[0.2em] mb-3">
              Simple Process
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-navy tracking-tight mb-4">
              How It Works
            </h2>
            <p className="text-navy/50 max-w-xl mx-auto">
              Three simple steps to your perfect mortgage
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {steps.map((step, index) => (
            <ScrollAnimation key={step.number} delay={index * 0.1}>
              <div className="relative bg-white border border-navy/5 rounded-lg p-8 hover:border-gold/30 hover:shadow-lg transition-all duration-300 h-full">
                {/* Step number */}
                <div className="text-5xl font-bold text-gold/20 absolute top-6 right-6">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 border border-gold/30 rounded-full flex items-center justify-center text-gold mb-6">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-navy mb-3">
                  {step.title}
                </h3>
                <p className="text-navy/50 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* CTA Buttons */}
        <ScrollAnimation delay={0.3}>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/apply">
              <button className="px-10 py-3 text-navy font-semibold text-base tracking-wider uppercase border-b-2 border-gold transition-all duration-300 hover:text-gold">
                Get Started
              </button>
            </Link>
            <Link href="/book-a-call">
              <button className="px-10 py-3 text-navy/50 font-medium text-base tracking-wider uppercase transition-all duration-300 hover:text-navy">
                Book a Call
              </button>
            </Link>
          </div>
        </ScrollAnimation>
      </div>

      {/* Subtle bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-navy/10 to-transparent" />
    </section>
  );
}
