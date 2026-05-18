"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

// Local testimonials
const testimonials = [
  {
    quote: "Moving from London to St Albans was stressful enough. Apply Wise handled our mortgage brilliantly — great communication throughout and a fantastic rate.",
    author: "Emma & Chris L.",
    location: "St Albans, Hertfordshire",
    rating: 5,
  },
  {
    quote: "As a contractor working in Stevenage, getting a mortgage seemed impossible. Apply Wise found a lender who used my contract rate, not just my accounts.",
    author: "James W.",
    location: "Stevenage, Hertfordshire",
    rating: 5,
  },
  {
    quote: "We're portfolio landlords in Watford. Apply Wise understands buy-to-let inside out and has helped us refinance multiple properties over the years.",
    author: "Raj & Priya M.",
    location: "Watford, Hertfordshire",
    rating: 5,
  },
];

// Hertfordshire areas served
const areasServed = [
  "St Albans",
  "Watford",
  "Hemel Hempstead",
  "Stevenage",
  "Welwyn Garden City",
  "Hatfield",
  "Hitchin",
  "Hertford",
  "Hoddesdon",
  "Cheshunt",
  "Potters Bar",
  "Borehamwood",
  "Bushey",
  "Berkhamsted",
  "Harpenden",
];

// FAQs
const faqs = [
  {
    question: "Are you based in Hertfordshire?",
    answer: "We're based just over the county border in Epping, Essex — but we serve clients across all of Hertfordshire. Many of our clients are in St Albans, Watford, Hemel Hempstead, and surrounding areas. We offer remote consultations and can arrange in-person meetings when needed.",
  },
  {
    question: "What makes Hertfordshire's property market different?",
    answer: "Hertfordshire benefits from excellent London commuter links while offering more space and greenery. Average prices are higher than the national average but lower than prime London. We understand these dynamics and work with lenders who appreciate the Hertfordshire market.",
  },
  {
    question: "Can you help with mortgages for new builds in Hertfordshire?",
    answer: "Yes, absolutely. Hertfordshire has many new developments, and new-build mortgages have specific requirements. We're experienced with new-build purchases including Help to Buy, shared ownership, and standard purchases.",
  },
  {
    question: "Do you offer evening or weekend appointments?",
    answer: "Yes, we understand that commuters have busy schedules. We offer evening appointments until 7pm on weekdays and Saturday appointments from 10am-4pm. We also offer phone and video consultations at times that suit you.",
  },
  {
    question: "How much can I borrow for a Hertfordshire property?",
    answer: "This depends on your income, deposit, and circumstances. As a rough guide, most lenders offer 4-4.5x your household income. Use our calculator for an estimate, or get in touch for a proper affordability assessment — it's free and no obligation.",
  },
];

// Services
const services = [
  {
    title: "First Time Buyers",
    description: "Step onto the Hertfordshire property ladder with expert guidance on deposits, schemes, and finding the right mortgage.",
    link: "/first-time-buyer",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    title: "Remortgages",
    description: "Review your current deal and potentially save hundreds per month. Free service for product transfers.",
    link: "/remortgage",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    title: "Buy-to-Let",
    description: "Hertfordshire has strong rental demand. We help landlords find competitive BTL mortgages for the local market.",
    link: "/buy-to-let",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: "Self-Employed",
    description: "Many Hertfordshire professionals run their own businesses. We know how to present complex income to lenders.",
    link: "/self-employed",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Equity Release",
    description: "Unlock the value in your Hertfordshire home. Expert advice on lifetime mortgages and equity release options.",
    link: "/equity-release",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Protection Insurance",
    description: "Protect your Hertfordshire home and family with life insurance, critical illness, and income protection.",
    link: "/protection",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

export default function MortgageAdvisorHertfordshirePage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-pearl">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center bg-pearl pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.p
              className="text-xs font-medium text-gold uppercase tracking-[0.2em] mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Mortgage Advisor Hertfordshire
            </motion.p>

            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Expert Mortgage Advice
              <br />
              <span className="text-gold">Across Hertfordshire</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-navy/70 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Whole-of-market mortgage advisors serving St Albans, Watford, Hemel Hempstead, Stevenage, and all Hertfordshire. Free advice, no hidden fees.
            </motion.p>

            {/* Key Benefits */}
            <motion.div
              className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {[
                "Access to 90+ lenders",
                "Evening & weekend available",
                "Remote or in-person",
                "Free initial consultation",
              ].map((point, index) => (
                <div key={index} className="flex items-center gap-2 text-navy/70">
                  <svg className="w-5 h-5 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm md:text-base">{point}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href="/apply">
                <motion.button
                  className="relative px-10 py-3 text-navy font-semibold text-lg tracking-wider uppercase border-b-2 border-gold transition-all duration-300 hover:text-gold"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold"
                    initial={{ scaleX: 0.3, opacity: 0.5 }}
                    animate={{ scaleX: [0.3, 1, 0.3], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.button>
              </Link>
              <a href="tel:01992535555">
                <motion.button
                  className="px-10 py-3 text-navy/50 font-medium text-lg tracking-wider uppercase transition-all duration-300 hover:text-navy flex items-center gap-2"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now
                </motion.button>
              </a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              className="flex items-center justify-center gap-4 text-xs text-navy/40 tracking-wide mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <img
                  src="/logos/fca.png"
                  alt="FCA Regulated"
                  className="h-5 w-auto"
                />
                <span>Regulated</span>
              </div>
              <span className="text-gold">•</span>
              <span>Whole of Market</span>
              <span className="text-gold">•</span>
              <span>5-Star Reviews</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* National Reach Banner */}
      <section className="py-6 bg-white border-y border-navy/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-pearl rounded-xl p-5 border-l-4 border-gold">
              <p className="text-navy/70 text-sm md:text-base">
                <span className="font-semibold text-navy">Based in Epping, Essex — advising clients across the whole of the UK.</span>{" "}
                Whether you're local or nationwide, you'll always speak directly to an experienced, FCA-regulated advisor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Hertfordshire */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <ScrollAnimation>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-navy mb-6">
                    Understanding the Hertfordshire Property Market
                  </h2>
                  <div className="space-y-4 text-navy/70">
                    <p>
                      Hertfordshire offers the best of both worlds — easy access to London while enjoying a more spacious, family-friendly environment. This makes it consistently popular with buyers.
                    </p>
                    <p>
                      Property prices reflect this desirability, with averages above national levels. Whether you're a first-time buyer stretching for your first home or an experienced investor, having the right mortgage advice matters.
                    </p>
                    <p>
                      We work with clients across Hertfordshire and know which lenders offer the best deals for the local market. Our whole-of-market access means we're not limited to a small panel — we search everywhere.
                    </p>
                  </div>
                </div>
                <div className="bg-pearl rounded-2xl p-8">
                  <h3 className="font-semibold text-navy mb-4">Hertfordshire at a Glance</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Average house price", value: "£495,000" },
                      { label: "First-time buyer average", value: "£355,000" },
                      { label: "London commute time", value: "20-45 mins" },
                      { label: "Rental yields (BTL)", value: "4-6%" },
                    ].map((stat) => (
                      <div key={stat.label} className="flex justify-between items-center pb-3 border-b border-navy/10">
                        <span className="text-navy/60">{stat.label}</span>
                        <span className="font-semibold text-navy">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-20 bg-pearl">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                Mortgage Services for Hertfordshire
              </h2>
              <p className="text-navy/60 max-w-xl mx-auto">
                Comprehensive mortgage advice tailored to your needs
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <ScrollAnimation key={service.title} delay={index * 0.1}>
                <Link href={service.link}>
                  <Card className="bg-white border border-navy/5 rounded-xl h-full hover:shadow-lg hover:border-gold/30 transition-all duration-300 group cursor-pointer">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold mb-4 group-hover:bg-gold group-hover:text-white transition-all">
                        {service.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-navy mb-2 group-hover:text-gold transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-navy/60 text-sm">{service.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                Hertfordshire Client Reviews
              </h2>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <ScrollAnimation key={testimonial.author} delay={index * 0.1}>
                <Card className="bg-pearl border border-navy/5 rounded-xl h-full">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-4 h-4 text-gold fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-navy/70 text-sm leading-relaxed mb-4 italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="pt-4 border-t border-navy/10">
                      <p className="font-medium text-navy text-sm">{testimonial.author}</p>
                      <p className="text-navy/50 text-xs">{testimonial.location}</p>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Areas We Serve */}
      <section className="py-16 md:py-20 bg-pearl">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                Areas We Serve in Hertfordshire
              </h2>
              <p className="text-navy/60 max-w-xl mx-auto">
                Expert mortgage advice across all Hertfordshire
              </p>
            </div>
          </ScrollAnimation>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {areasServed.map((area, index) => (
              <ScrollAnimation key={area} delay={index * 0.03}>
                <span className="px-4 py-2 bg-white border border-navy/10 rounded-full text-navy/70 text-sm hover:border-gold hover:text-gold transition-colors cursor-default">
                  {area}
                </span>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                Hertfordshire Mortgage FAQs
              </h2>
            </div>
          </ScrollAnimation>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, index) => (
              <ScrollAnimation key={faq.question} delay={index * 0.05}>
                <div className="bg-pearl border border-navy/5 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-pearl/80 transition-colors"
                  >
                    <h3 className="font-semibold text-navy pr-4 text-sm md:text-base">{faq.question}</h3>
                    <svg
                      className={`w-5 h-5 text-gold flex-shrink-0 transition-transform ${expandedFaq === index ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 text-navy/70 text-sm">{faq.answer}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-navy">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <ScrollAnimation>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Get Expert Mortgage Advice Today
              </h2>
              <p className="text-white/60 mb-8">
                Free consultation with a Hertfordshire mortgage specialist. No obligation, no pressure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/apply">
                  <motion.button
                    className="px-10 py-4 bg-gold text-navy font-semibold rounded-lg hover:bg-gold/90 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Start Your Application
                  </motion.button>
                </Link>
                <a href="tel:01992535555">
                  <motion.button
                    className="px-10 py-4 border border-white/20 text-white font-medium rounded-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    01992 535 555
                  </motion.button>
                </a>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
