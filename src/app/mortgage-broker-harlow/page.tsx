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
    quote: "First-time buyers in Harlow - Apply Wise made the impossible possible. Great rates and really understood our budget.",
    author: "Laura & Ben T.",
    location: "Harlow, Essex",
    rating: 5,
  },
  {
    quote: "Remortgaging our home in Old Harlow was seamless. Professional service from start to finish.",
    author: "Kevin S.",
    location: "Old Harlow",
    rating: 5,
  },
];

const areasServed = ["Harlow Town Centre", "Old Harlow", "Potter Street", "Church Langley", "Newhall", "Pinnacles", "Latton Bush", "Staple Tye", "Mark Hall", "Netteswell"];

const faqs = [
  {
    question: "What's special about the Harlow property market?",
    answer: "Harlow offers excellent value compared to surrounding areas, with ongoing regeneration bringing new investment. Strong first-time buyer market with good rental yields for investors.",
  },
  {
    question: "Can you help first-time buyers in Harlow?",
    answer: "Absolutely. Harlow's affordable prices make it popular with first-time buyers. We have access to first-time buyer schemes and competitive rates from 90+ lenders.",
  },
  {
    question: "How close are you to Harlow?",
    answer: "We're based in nearby Epping, just 10 minutes away. We know the Harlow area very well.",
  },
];

const services = [
  { title: "First Time Buyers", description: "Helping Harlow first-time buyers onto the ladder.", link: "/first-time-buyer", icon: (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>) },
  { title: "Remortgages", description: "Review your deal and switch to a better rate.", link: "/remortgage", icon: (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>) },
  { title: "Buy-to-Let", description: "Investment mortgages for Harlow landlords.", link: "/buy-to-let", icon: (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>) },
];

export default function MortgageBrokerHarlowPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-pearl">
      <Header />

      <section className="relative min-h-[70vh] flex items-center bg-pearl pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.p className="text-xs font-medium text-gold uppercase tracking-[0.2em] mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>Mortgage Broker Harlow</motion.p>
            <motion.h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy leading-tight mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              Harlow Mortgage<br /><span className="text-gold">Experts</span>
            </motion.h1>
            <motion.p className="text-lg md:text-xl text-navy/70 mb-10 max-w-2xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
              Whole-of-market mortgage advice for Harlow and the CM17-CM20 area. Affordable entry point with ongoing regeneration.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-6 justify-center items-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
              <Link href="/apply"><motion.button className="relative px-10 py-3 text-navy font-semibold text-lg tracking-wider uppercase border-b-2 border-gold transition-all duration-300 hover:text-gold" whileHover={{ y: -2 }}>Get Started</motion.button></Link>
              <a href="tel:01992535555"><motion.button className="px-10 py-3 text-navy/50 font-medium text-lg tracking-wider uppercase transition-all duration-300 hover:text-navy flex items-center gap-2" whileHover={{ y: -2 }}>Call Us</motion.button></a>
            </motion.div>
            <motion.div className="flex items-center justify-center gap-4 text-xs text-navy/40 tracking-wide mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}>
              <div className="flex items-center gap-2"><img src="/logos/fca.png" alt="FCA Regulated" className="h-5 w-auto" /><span>Regulated</span></div>
              <span className="text-gold">•</span><span>CM17-CM20</span><span className="text-gold">•</span><span>90+ Lenders</span>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-6 bg-white border-y border-navy/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-pearl rounded-xl p-5 border-l-4 border-gold">
              <p className="text-navy/70 text-sm md:text-base"><span className="font-semibold text-navy">Apply Wise is based in Epping and advises clients across the whole of the UK</span> — local knowledge, national reach.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <ScrollAnimation>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-navy mb-6">Why Choose a Local Harlow Mortgage Broker?</h2>
                  <div className="space-y-4 text-navy/70">
                    <p>Harlow is one of Essex's most affordable areas, making it popular with first-time buyers and investors alike. Ongoing regeneration is bringing new life to the town.</p>
                    <p>We're based nearby in Epping and understand the Harlow market — from new-build developments to period properties in Old Harlow.</p>
                  </div>
                </div>
                <div className="bg-pearl rounded-2xl p-8">
                  <h3 className="font-semibold text-navy mb-4">Harlow Property Market</h3>
                  <div className="space-y-4">
                    {[{ label: "Average house price", value: "£340,000" }, { label: "Postcode area", value: "CM17-CM20" }, { label: "Character", value: "New town, regenerating" }, { label: "First-time buyers", value: "Very popular" }].map((stat) => (
                      <div key={stat.label} className="flex justify-between items-center pb-3 border-b border-navy/10">
                        <span className="text-navy/60">{stat.label}</span><span className="font-semibold text-navy">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-pearl">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation><div className="text-center mb-12"><h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">Mortgage Services in Harlow</h2></div></ScrollAnimation>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {services.map((service, index) => (
              <ScrollAnimation key={service.title} delay={index * 0.1}>
                <Link href={service.link}>
                  <Card className="bg-white border border-navy/5 rounded-xl h-full hover:shadow-lg hover:border-gold/30 transition-all duration-300 group cursor-pointer">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold mb-4 group-hover:bg-gold group-hover:text-white transition-all">{service.icon}</div>
                      <h3 className="text-lg font-semibold text-navy mb-2 group-hover:text-gold transition-colors">{service.title}</h3>
                      <p className="text-navy/60 text-sm">{service.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation><div className="text-center mb-12"><h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">What Our Harlow Clients Say</h2></div></ScrollAnimation>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <ScrollAnimation key={testimonial.author} delay={index * 0.1}>
                <Card className="bg-pearl border border-navy/5 rounded-xl h-full">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">{[1,2,3,4,5].map((star) => (<svg key={star} className="w-4 h-4 text-gold fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>))}</div>
                    <p className="text-navy/70 text-sm leading-relaxed mb-4 italic">"{testimonial.quote}"</p>
                    <div className="pt-4 border-t border-navy/10"><p className="font-medium text-navy text-sm">{testimonial.author}</p><p className="text-navy/50 text-xs">{testimonial.location}</p></div>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-pearl">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation><div className="text-center mb-10"><h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">Areas Near Harlow We Serve</h2></div></ScrollAnimation>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {areasServed.map((area, index) => (<ScrollAnimation key={area} delay={index * 0.03}><span className="px-4 py-2 bg-white border border-navy/10 rounded-full text-navy/70 text-sm hover:border-gold hover:text-gold transition-colors cursor-default">{area}</span></ScrollAnimation>))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation><div className="text-center mb-10"><h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">Harlow Mortgage FAQs</h2></div></ScrollAnimation>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, index) => (
              <ScrollAnimation key={faq.question} delay={index * 0.05}>
                <div className="bg-pearl border border-navy/5 rounded-xl overflow-hidden">
                  <button onClick={() => setExpandedFaq(expandedFaq === index ? null : index)} className="w-full flex items-center justify-between p-5 text-left hover:bg-pearl/80 transition-colors">
                    <h3 className="font-semibold text-navy pr-4 text-sm md:text-base">{faq.question}</h3>
                    <svg className={`w-5 h-5 text-gold flex-shrink-0 transition-transform ${expandedFaq === index ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  <AnimatePresence>{expandedFaq === index && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}><div className="px-5 pb-5 text-navy/70 text-sm">{faq.answer}</div></motion.div>)}</AnimatePresence>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-navy">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <ScrollAnimation>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
              <p className="text-white/60 mb-8">Speak to a Harlow mortgage expert today.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/apply"><motion.button className="px-10 py-4 bg-gold text-navy font-semibold rounded-lg hover:bg-gold/90 transition-all" whileHover={{ scale: 1.02 }}>Start Your Application</motion.button></Link>
                <a href="tel:01992535555"><motion.button className="px-10 py-4 border border-white/20 text-white font-medium rounded-lg hover:bg-white/10 transition-all" whileHover={{ scale: 1.02 }}>01992 535 555</motion.button></a>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
