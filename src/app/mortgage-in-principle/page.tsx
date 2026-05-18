"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MortgageInPrinciplePage() {
  return (
    <main className="min-h-screen bg-cream">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-cream to-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-6">
              Mortgage In Principle
            </h1>
            <p className="text-xl text-navy/70 mb-8 max-w-2xl mx-auto">
              Get a decision in principle to show sellers and estate agents you're a serious buyer.
              It only takes a few minutes and won't affect your credit score.
            </p>
            <Link href="/apply">
              <Button size="lg" className="bg-navy hover:bg-navy/90 text-white px-8 py-6 text-lg rounded-full">
                Get Your Decision In Principle
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What is MIP Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-8">
              What is a Mortgage In Principle?
            </h2>
            <div className="prose prose-lg text-navy/70">
              <p className="mb-6">
                A Mortgage in Principle (MIP), also known as an Agreement in Principle (AIP) or Decision in Principle (DIP),
                is a statement from a lender indicating how much they may be willing to lend you for a mortgage.
              </p>
              <p className="mb-6">
                It's not a guarantee that you'll get a mortgage, but it shows estate agents and sellers that you're
                a serious buyer who has taken steps to secure funding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-12 text-center">
            Benefits of Getting a Mortgage In Principle
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Know Your Budget",
                description: "Understand exactly how much you can borrow before you start house hunting."
              },
              {
                title: "Strengthen Your Offer",
                description: "Sellers and estate agents take you more seriously when you have a MIP in place."
              },
              {
                title: "Speed Up The Process",
                description: "Having a MIP ready can help speed up the mortgage application when you find your dream home."
              },
              {
                title: "No Credit Impact",
                description: "Soft credit checks used for MIPs don't affect your credit score."
              },
              {
                title: "Free & Quick",
                description: "Get your decision in minutes, completely free of charge."
              },
              {
                title: "Valid for 90 Days",
                description: "Most MIPs are valid for 60-90 days, giving you time to find the right property."
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm">
                <h3 className="text-xl font-bold text-navy mb-4">{benefit.title}</h3>
                <p className="text-navy/70">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-teal text-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            How to Get a Mortgage In Principle
          </h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { step: "1", title: "Fill In Your Details", description: "Provide basic information about yourself and your finances" },
              { step: "2", title: "Quick Credit Check", description: "We perform a soft credit check that won't affect your score" },
              { step: "3", title: "Get Your Decision", description: "Receive your decision in principle within minutes" },
              { step: "4", title: "Start House Hunting", description: "Use your MIP to show sellers you're a serious buyer" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-2xl mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-white/80">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-navy/70 mb-8 max-w-2xl mx-auto">
            Get your mortgage in principle today and take the first step towards your new home.
          </p>
          <Link href="/apply">
            <Button size="lg" className="bg-navy hover:bg-navy/90 text-white px-8 py-6 text-lg rounded-full">
              Apply Now
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
