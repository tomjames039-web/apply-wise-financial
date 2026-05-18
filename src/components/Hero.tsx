"use client";

import Link from "next/link";
import Image from "next/image";
import { FCABadgeInline } from "./FCABadge";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-pearl-texture pt-12">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Logo as large centrepiece - links to funnel */}
          <div className="mb-8 animate-fade-in-scale">
            <Link href="/apply" className="inline-block cursor-pointer hover:scale-[1.02] transition-transform duration-500">
              <Image
                src="/logos/apply-wise-logo.png"
                alt="Apply Wise - Apply Smarter, Move Sooner"
                priority
                width={800}
                height={640}
                className="h-80 sm:h-96 md:h-[28rem] lg:h-[34rem] xl:h-[40rem] w-auto mx-auto"
              />
            </Link>
          </div>

          {/* Elegant animated buttons */}
          <div
            className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-8 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Link href="/apply">
              <button
                className="relative px-10 py-3 text-navy font-semibold text-lg tracking-wider uppercase border-b-2 border-gold transition-all duration-300 hover:text-gold hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Get Started
                <span
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold animate-pulse-width"
                />
              </button>
            </Link>
            <Link href="/calculator">
              <button
                className="px-10 py-3 text-navy/50 font-medium text-lg tracking-wider uppercase transition-all duration-300 hover:text-navy hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Calculators
              </button>
            </Link>
          </div>

          {/* Trust indicators - compact single line */}
          <div
            className="flex items-center justify-center gap-4 text-xs text-navy/40 tracking-wide animate-fade-in"
            style={{ animationDelay: "0.5s" }}
          >
            <FCABadgeInline />
            <span className="text-gold">•</span>
            <span>90+ Lenders</span>
            <span className="text-gold">•</span>
            <span>Whole of Market</span>
          </div>
        </div>
      </div>
    </section>
  );
}
