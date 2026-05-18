"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";

export function Tools() {
  return (
    <section id="calculator" className="py-16 md:py-20 bg-pearl-texture relative">
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-navy/10 to-transparent" />

      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <p className="text-xs font-medium text-gold uppercase tracking-[0.2em] mb-3">
              Tools & Resources
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-navy tracking-tight mb-4">
              Mortgage Tools
            </h2>
            <p className="text-navy/50">
              Everything you need to make informed decisions
            </p>
          </div>
        </ScrollAnimation>

        <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto" staggerDelay={0.15}>
          {/* Calculator Card */}
          <StaggerItem>
            <Card className="bg-white border border-navy/5 hover:border-gold/30 hover:shadow-lg transition-all duration-300 rounded-lg h-full">
              <CardContent className="p-8 space-y-6 h-full flex flex-col">
                <div className="w-12 h-12 border border-gold/30 rounded-full flex items-center justify-center text-gold">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
                  </svg>
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-navy mb-3">
                    Mortgage Calculator
                  </h3>
                  <p className="text-navy/50 text-sm leading-relaxed">
                    Calculate monthly payments and affordability.
                  </p>
                </div>
                <Link href="/calculator">
                  <button className="w-full py-3 text-gold font-medium text-sm tracking-wider uppercase border border-gold/30 rounded hover:bg-gold/5 transition-all duration-200">
                    Calculate
                  </button>
                </Link>
              </CardContent>
            </Card>
          </StaggerItem>

          {/* Advice Card */}
          <StaggerItem>
            <Card className="bg-white border border-navy/5 hover:border-gold/30 hover:shadow-lg transition-all duration-300 rounded-lg h-full">
              <CardContent className="p-8 space-y-6 h-full flex flex-col">
                <div className="w-12 h-12 border border-gold/30 rounded-full flex items-center justify-center text-gold">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                  </svg>
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-navy mb-3">
                    Expert Advice
                  </h3>
                  <p className="text-navy/50 text-sm leading-relaxed">
                    Personalised recommendations from qualified advisers.
                  </p>
                </div>
                <Link href="/apply">
                  <button className="w-full py-3 text-gold font-medium text-sm tracking-wider uppercase border border-gold/30 rounded hover:bg-gold/5 transition-all duration-200">
                    Get Started
                  </button>
                </Link>
              </CardContent>
            </Card>
          </StaggerItem>

          {/* Book a Call Card */}
          <StaggerItem>
            <Card className="bg-white border border-navy/5 hover:border-gold/30 hover:shadow-lg transition-all duration-300 rounded-lg h-full">
              <CardContent className="p-8 space-y-6 h-full flex flex-col">
                <div className="w-12 h-12 border border-gold/30 rounded-full flex items-center justify-center text-gold">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                  </svg>
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-navy mb-3">
                    Book a Call
                  </h3>
                  <p className="text-navy/50 text-sm leading-relaxed">
                    Schedule a convenient time to speak with an adviser.
                  </p>
                </div>
                <Link href="/book-a-call">
                  <button className="w-full py-3 text-gold font-medium text-sm tracking-wider uppercase border border-gold/30 rounded hover:bg-gold/5 transition-all duration-200">
                    Schedule
                  </button>
                </Link>
              </CardContent>
            </Card>
          </StaggerItem>
        </StaggerContainer>
      </div>

      {/* Subtle bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-navy/10 to-transparent" />
    </section>
  );
}
