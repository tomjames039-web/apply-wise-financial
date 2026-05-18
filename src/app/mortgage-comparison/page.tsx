"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MortgageComparisonPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-cream to-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-6">
              Compare Mortgages
            </h1>
            <p className="text-xl text-navy/70 mb-8 max-w-2xl mx-auto">
              Access thousands of mortgage deals from over 90 lenders. Let us find the perfect
              mortgage for your circumstances.
            </p>
            <Link href="/apply">
              <Button size="lg" className="bg-navy hover:bg-navy/90 text-white px-8 py-6 text-lg rounded-full">
                Compare Mortgages Now
              </Button>
            </Link>
            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-4 text-xs text-navy/40 tracking-wide mt-8">
              <div className="flex items-center gap-1.5">
                <img src="/logos/fca.png" alt="FCA Regulated" className="h-5 w-auto" />
                <span>Regulated</span>
              </div>
              <span className="text-gold">•</span>
              <span>90+ Lenders</span>
              <span className="text-gold">•</span>
              <span>Whole of Market</span>
            </div>
          </div>
        </div>
      </section>

      {/* Lender Logos Section */}
      <section className="py-10 bg-white border-y border-navy/5">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-center text-navy/50 text-sm mb-6 font-medium">
            Compare deals from 90+ lenders including
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
            <img src="/logos/natwest.png" alt="NatWest" className="h-8 w-auto object-contain" />
            <img src="/logos/nationwide.png" alt="Nationwide" className="h-8 w-auto object-contain" />
            <img src="/logos/barclays.png" alt="Barclays" className="h-8 w-auto object-contain" />
            <img src="/logos/halifax.png" alt="Halifax" className="h-8 w-auto object-contain" />
            <img src="/logos/santander.png" alt="Santander" className="h-8 w-auto object-contain" />
            <img src="/logos/hsbc.png" alt="HSBC" className="h-8 w-auto object-contain" />
          </div>
        </div>
      </section>

      {/* Why Compare Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-8">
              Why Compare Mortgages with Apply Wise?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy mb-2">90+ Lenders</h3>
                    <p className="text-navy/70">Access deals from all major high street banks and specialist lenders.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy mb-2">Expert Advice</h3>
                    <p className="text-navy/70">Our mortgage experts help you understand which deal is right for you.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy mb-2">Exclusive Rates</h3>
                    <p className="text-navy/70">Access exclusive deals not available on the high street.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy mb-2">Free Comparison</h3>
                    <p className="text-navy/70">Compare remortgage and product transfer options at no cost.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Mortgages */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-12 text-center">
            Types of Mortgages We Compare
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Fixed Rate",
                description: "Lock in your interest rate for a set period, typically 2-5 years. Your monthly payments stay the same."
              },
              {
                title: "Tracker",
                description: "Interest rate tracks the Bank of England base rate, so payments can go up or down."
              },
              {
                title: "Variable Rate",
                description: "Interest rate can change at any time based on your lender's standard variable rate."
              },
              {
                title: "Offset",
                description: "Link your savings to your mortgage to reduce the interest you pay."
              },
              {
                title: "Interest Only",
                description: "Only pay the interest each month, with the capital due at the end of the term."
              },
              {
                title: "Repayment",
                description: "Pay both interest and capital each month until your mortgage is fully repaid."
              }
            ].map((type, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-navy mb-4">{type.title}</h3>
                <p className="text-navy/70">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
            Find Your Perfect Mortgage
          </h2>
          <p className="text-xl text-navy/70 mb-8 max-w-2xl mx-auto">
            Let our experts search the market for you and find the best deal for your circumstances.
          </p>
          <Link href="/apply">
            <Button size="lg" className="bg-gold hover:bg-gold/90 text-navy px-8 py-6 text-lg rounded-full font-semibold">
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
