"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

const testimonials = [
  {
    quote: "Being local to Epping, it was great to work with someone who really knows the area. Tom understood exactly what we were looking for and found us a brilliant rate.",
    author: "James & Sophie L.",
    location: "Epping, Essex",
    rating: 5,
  },
  {
    quote: "After struggling with high street banks, Apply Wise sorted our remortgage within weeks. The local knowledge made all the difference.",
    author: "Michael T.",
    location: "Coopersale, Epping",
    rating: 5,
  },
  {
    quote: "First-time buyers in the CM16 area - we couldn't have done it without Apply Wise. Professional, friendly, and genuinely helpful.",
    author: "Emma & Chris R.",
    location: "Epping Green",
    rating: 5,
  },
];

const areasServed = [
  "Epping Town Centre",
  "Coopersale",
  "Epping Green",
  "Epping Upland",
  "Fiddlers Hamlet",
  "Ivy Chimneys",
  "Bell Common",
  "Theydon Bois",
  "North Weald",
  "Thornwood",
  "Ongar",
  "Loughton",
];

const faqs = [
  {
    question: "Where is Apply Wise based?",
    answer: "Our registered office is in Fiddlers Hamlet, Epping (CM16 7PY). We're proud to be a truly local Epping business, though we advise clients across the whole of the UK.",
  },
  {
    question: "Do I need to visit your office in Epping?",
    answer: "No, we offer a fully remote service via phone, video call, and secure document upload. However, being local, we're always happy to arrange face-to-face meetings if you prefer.",
  },
  {
    question: "What's the Epping property market like?",
    answer: "Epping has a strong property market with excellent transport links (Central Line), good schools, and access to Epping Forest. Average prices are above the national average, with a mix of period properties, modern developments, and rural homes in surrounding villages.",
  },
  {
    question: "Can you help with properties near Epping Forest?",
    answer: "Absolutely. We have extensive experience with properties in and around Epping Forest, including those with non-standard construction or on forest land. We know which lenders are comfortable with these property types.",
  },
  {
    question: "How quickly can you arrange a mortgage in Epping?",
    answer: "We can often provide a Decision in Principle the same day. Full mortgage applications typically complete within 4-8 weeks. As locals, we can also recommend trusted local solicitors and surveyors to speed things along.",
  },
];

const services = [
  {
    title: "First Time Buyers",
    description: "Helping Epping first-time buyers get onto the property ladder with access to the best rates and schemes.",
    link: "/first-time-buyer",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    title: "Remortgages",
    description: "Review your current deal and find a better rate. Free service for product transfers with your existing lender.",
    link: "/remortgage",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    title: "Buy-to-Let",
    description: "Investment property mortgages for Epping landlords. Personal name or limited company structures.",
    link: "/buy-to-let",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: "Self-Employed",
    description: "Expert help for Epping business owners. We know how to present your income for the best mortgage.",
    link: "/self-employed",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Equity Release",
    description: "Unlock the value in your Epping home. Expert later-life lending advice for over 55s.",
    link: "/equity-release",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Protection Insurance",
    description: "Life insurance, critical illness, and income protection to safeguard your Epping home and family.",
    link: "/protection",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

export default function MortgageBrokerEppingPage() {
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
              Mortgage Broker Epping
            </motion.p>

            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Your Local Epping
              <br />
              <span className="text-gold">Mortgage Experts</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-navy/70 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Based right here in Epping, we're your local whole-of-market mortgage advisors. From CM16 to the surrounding villages — we know this area inside out.
            </motion.p>

            {/* Key Benefits */}
            <motion.div
              className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {[
                "Based in Epping",
                "90+ UK lenders",
                "Free remortgage service",
                "Same-day decisions",
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
                  Call Us
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
              <span>CM16 Postcode</span>
              <span className="text-gold">•</span>
              <span>Whole of Market</span>
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

      {/* Why Local Matters */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <ScrollAnimation>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-navy mb-6">
                    Why Choose a Local Epping Mortgage Broker?
                  </h2>
                  <div className="space-y-4 text-navy/70">
                    <p>
                      Apply Wise is proud to be based right here in Epping. Our registered office is in Fiddlers Hamlet, and we've been helping local homebuyers and homeowners for years.
                    </p>
                    <p>
                      We understand the Epping property market — from the premium properties near the Forest to the village homes in Coopersale and Epping Green. We know the commuter appeal of the Central Line and what makes this area so desirable.
                    </p>
                    <p>
                      But being local doesn't mean limited. With access to 90+ UK lenders, we search the whole market to find you the best deal — combining local insight with national reach.
                    </p>
                  </div>
                </div>
                <div className="bg-pearl rounded-2xl p-8">
                  <h3 className="font-semibold text-navy mb-4">Epping Property Market</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Average house price", value: "£625,000" },
                      { label: "Central Line to Liverpool St", value: "35 mins" },
                      { label: "Postcode area", value: "CM16" },
                      { label: "Character", value: "Forest & commuter" },
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
                Mortgage Services in Epping
              </h2>
              <p className="text-navy/60 max-w-xl mx-auto">
                Whatever your mortgage needs, we can help
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
                What Our Epping Clients Say
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
                Areas Near Epping We Serve
              </h2>
              <p className="text-navy/60 max-w-xl mx-auto">
                We help clients across Epping and all surrounding villages
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
                Epping Mortgage FAQs
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
                Ready to Get Started?
              </h2>
              <p className="text-white/60 mb-8">
                Speak to your local Epping mortgage expert today. No obligation, no fees for advice.
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
