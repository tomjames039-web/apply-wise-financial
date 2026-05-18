"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HowWeHelpPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-cream to-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-6">
              How We Help You
            </h1>
            <p className="text-xl text-navy/70 mb-8 max-w-2xl mx-auto">
              From your first enquiry to getting the keys to your new home, we're with you
              every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-16 text-center">
            Our Process
          </h2>
          <div className="max-w-5xl mx-auto space-y-16">
            {[
              {
                step: "1",
                title: "Initial Consultation",
                description: "We start by understanding your situation and goals. Whether you're buying your first home, moving, remortgaging, or investing, we'll gather the information we need to help you.",
                features: ["Free, no-obligation chat", "Understand your budget", "Explain your options"]
              },
              {
                step: "2",
                title: "Market Search",
                description: "Our experts search the whole market to find the best mortgage deals for your circumstances. We compare rates from over 90 lenders to ensure you get the best deal.",
                features: ["90+ lenders searched", "Exclusive rates", "Best deals identified"]
              },
              {
                step: "3",
                title: "Recommendation",
                description: "We'll explain our recommendations in plain English, walking you through the pros and cons of each option so you can make an informed decision.",
                features: ["Clear explanations", "Written recommendation", "No jargon"]
              },
              {
                step: "4",
                title: "Application Support",
                description: "We handle the application process for you, liaising with the lender, managing paperwork, and keeping you updated every step of the way.",
                features: ["We handle paperwork", "Regular updates", "Chase the lender for you"]
              },
              {
                step: "5",
                title: "Completion",
                description: "We'll make sure everything is in place for completion day. Once you have your keys, we'll be here for any future mortgage needs.",
                features: ["Final checks", "Completion support", "Ongoing relationship"]
              }
            ].map((item, index) => (
              <div key={index} className="grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-1">
                  <div className="w-14 h-14 bg-teal rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {item.step}
                  </div>
                </div>
                <div className="md:col-span-11">
                  <h3 className="text-2xl font-bold text-navy mb-4">{item.title}</h3>
                  <p className="text-navy/70 text-lg mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-3">
                    {item.features.map((feature, i) => (
                      <span key={i} className="bg-cream px-4 py-2 rounded-full text-sm text-navy">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 bg-navy text-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            What Makes Us Different
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "No Fees for Most Mortgages",
                description: "We're paid by lenders when your mortgage completes, so our advice is free for most customers."
              },
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "FCA Regulated",
                description: "We're authorised and regulated by the Financial Conduct Authority, so you're protected."
              },
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: "Human Experts",
                description: "Real people with real expertise. Our advisers are CeMAP qualified and here to help."
              },
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Flexible Appointments",
                description: "Evenings and weekends available. We work around your schedule, not the other way around."
              },
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                ),
                title: "Whole of Market",
                description: "We search over 90 lenders to find the best deal. We're not tied to any single provider."
              },
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                ),
                title: "Always Here",
                description: "We're with you throughout the process and beyond. Future remortgage? We've got you covered."
              }
            ].map((item, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6 text-gold">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-white/80">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <svg className="w-12 h-12 text-gold mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote className="text-2xl md:text-3xl text-navy mb-8 italic">
              "Apply Wise made what I thought would be a stressful process incredibly smooth.
              My adviser explained everything clearly and found me a better rate than I ever
              expected. Couldn't recommend them more highly!"
            </blockquote>
            <div className="flex items-center justify-center gap-2 text-gold">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <p className="mt-4 text-navy font-semibold">Sarah M.</p>
            <p className="text-navy/60">First-time buyer, London</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-navy/70 mb-8 max-w-2xl mx-auto">
            Whether you're buying, remortgaging, or just exploring your options, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply">
              <Button size="lg" className="bg-navy hover:bg-navy/90 text-white px-8 py-6 text-lg rounded-full">
                Get Started
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-navy text-navy hover:bg-navy/5 px-8 py-6 text-lg rounded-full">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
