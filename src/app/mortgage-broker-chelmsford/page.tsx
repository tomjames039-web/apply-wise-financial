"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

const testimonials = [
  { quote: "Apply Wise helped us buy our first home in Chelmsford City Centre. Excellent service throughout.", author: "Rachel & James P.", location: "Chelmsford, Essex", rating: 5 },
  { quote: "As a landlord with properties across CM1, I rely on Apply Wise for all my BTL mortgages.", author: "David C.", location: "Chelmsford", rating: 5 },
];

const areasServed = ["Chelmsford City Centre", "Moulsham", "Great Baddow", "Springfield", "Writtle", "Broomfield", "Galleywood", "Danbury", "Little Baddow", "Sandon"];

const faqs = [
  { question: "What's the Chelmsford property market like?", answer: "As Essex's only city, Chelmsford has a diverse property market from city centre apartments to family homes in surrounding villages. Strong commuter appeal with fast trains to London Liverpool Street." },
  { question: "Can you help with new-build mortgages in Chelmsford?", answer: "Yes, we have extensive experience with new-build developments across Chelmsford and access to lenders who specialise in new-build properties." },
];

const services = [
  { title: "First Time Buyers", description: "Helping Chelmsford first-time buyers onto the ladder.", link: "/first-time-buyer", icon: (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>) },
  { title: "Remortgages", description: "Review your deal and switch to a better rate.", link: "/remortgage", icon: (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>) },
  { title: "Buy-to-Let", description: "Investment mortgages for Chelmsford landlords.", link: "/buy-to-let", icon: (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>) },
  { title: "Self-Employed", description: "Expert mortgage help for Chelmsford business owners.", link: "/self-employed", icon: (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>) },
];

export default function MortgageBrokerChelmsfordPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-pearl">
      <Header />

      <section className="relative min-h-[70vh] flex items-center bg-pearl pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.p className="text-xs font-medium text-gold uppercase tracking-[0.2em] mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>Mortgage Broker Chelmsford</motion.p>
            <motion.h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy leading-tight mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              Chelmsford Mortgage<br /><span className="text-gold">Experts</span>
            </motion.h1>
            <motion.p className="text-lg md:text-xl text-navy/70 mb-10 max-w-2xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
              Whole-of-market mortgage advice for Essex's city. From CM1 to CM3, covering Chelmsford and surrounding villages.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-6 justify-center items-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
              <Link href="/apply"><motion.button className="relative px-10 py-3 text-navy font-semibold text-lg tracking-wider uppercase border-b-2 border-gold transition-all duration-300 hover:text-gold" whileHover={{ y: -2 }}>Get Started</motion.button></Link>
              <a href="tel:01992535555"><motion.button className="px-10 py-3 text-navy/50 font-medium text-lg tracking-wider uppercase transition-all duration-300 hover:text-navy flex items-center gap-2" whileHover={{ y: -2 }}>Call Us</motion.button></a>
            </motion.div>
            <motion.div className="flex items-center justify-center gap-4 text-xs text-navy/40 tracking-wide mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}>
              <div className="flex items-center gap-2"><img src="/logos/fca.png" alt="FCA Regulated" className="h-5 w-auto" /><span>Regulated</span></div>
              <span className="text-gold">•</span><span>CM1-CM3</span><span className="text-gold">•</span><span>90+ Lenders</span>
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
                  <h2 className="text-2xl md:text-3xl font-bold text-navy mb-6">Why Choose a Local Chelmsford Mortgage Broker?</h2>
                  <div className="space-y-4 text-navy/70">
                    <p>Chelmsford is Essex's only city and a major commuter hub with excellent links to London. Property prices vary significantly from affordable apartments to premium family homes.</p>
                    <p>We understand the diverse Chelmsford market and know which lenders work best for different property types and buyer circumstances.</p>
                  </div>
                </div>
                <div className="bg-pearl rounded-2xl p-8">
                  <h3 className="font-semibold text-navy mb-4">Chelmsford Property Market</h3>
                  <div className="space-y-4">
                    {[{ label: "Average house price", value: "£425,000" }, { label: "Train to Liverpool St", value: "35 mins" }, { label: "Postcode", value: "CM1-CM3" }, { label: "Status", value: "City" }].map((stat) => (
                      <div key={stat.label} className="flex justify-between items-center pb-3 border-b border-navy/10"><span className="text-navy/60">{stat.label}</span><span className="font-semibold text-navy">{stat.value}</span></div>
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
          <ScrollAnimation><div className="text-center mb-12"><h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">Mortgage Services in Chelmsford</h2></div></ScrollAnimation>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <ScrollAnimation key={service.title} delay={index * 0.1}>
                <Link href={service.link}><Card className="bg-white border border-navy/5 rounded-xl h-full hover:shadow-lg hover:border-gold/30 transition-all duration-300 group cursor-pointer"><CardContent className="p-6"><div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold mb-4 group-hover:bg-gold group-hover:text-white transition-all">{service.icon}</div><h3 className="text-lg font-semibold text-navy mb-2 group-hover:text-gold transition-colors">{service.title}</h3><p className="text-navy/60 text-sm">{service.description}</p></CardContent></Card></Link>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation><div className="text-center mb-12"><h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">What Our Chelmsford Clients Say</h2></div></ScrollAnimation>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (<ScrollAnimation key={t.author} delay={i * 0.1}><Card className="bg-pearl border border-navy/5 rounded-xl h-full"><CardContent className="p-6"><div className="flex gap-1 mb-4">{[1,2,3,4,5].map((s) => (<svg key={s} className="w-4 h-4 text-gold fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>))}</div><p className="text-navy/70 text-sm leading-relaxed mb-4 italic">"{t.quote}"</p><div className="pt-4 border-t border-navy/10"><p className="font-medium text-navy text-sm">{t.author}</p><p className="text-navy/50 text-xs">{t.location}</p></div></CardContent></Card></ScrollAnimation>))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-pearl">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation><div className="text-center mb-10"><h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">Areas Near Chelmsford We Serve</h2></div></ScrollAnimation>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">{areasServed.map((a, i) => (<ScrollAnimation key={a} delay={i * 0.03}><span className="px-4 py-2 bg-white border border-navy/10 rounded-full text-navy/70 text-sm hover:border-gold hover:text-gold transition-colors cursor-default">{a}</span></ScrollAnimation>))}</div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation><div className="text-center mb-10"><h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">Chelmsford Mortgage FAQs</h2></div></ScrollAnimation>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (<ScrollAnimation key={faq.question} delay={i * 0.05}><div className="bg-pearl border border-navy/5 rounded-xl overflow-hidden"><button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left hover:bg-pearl/80 transition-colors"><h3 className="font-semibold text-navy pr-4 text-sm md:text-base">{faq.question}</h3><svg className={`w-5 h-5 text-gold flex-shrink-0 transition-transform ${expandedFaq === i ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></button><AnimatePresence>{expandedFaq === i && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}><div className="px-5 pb-5 text-navy/70 text-sm">{faq.answer}</div></motion.div>)}</AnimatePresence></div></ScrollAnimation>))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-navy">
        <div className="container mx-auto px-4 md:px-6"><div className="max-w-2xl mx-auto text-center"><ScrollAnimation><h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Get Started?</h2><p className="text-white/60 mb-8">Speak to a Chelmsford mortgage expert today.</p><div className="flex flex-col sm:flex-row gap-4 justify-center"><Link href="/apply"><motion.button className="px-10 py-4 bg-gold text-navy font-semibold rounded-lg hover:bg-gold/90 transition-all" whileHover={{ scale: 1.02 }}>Start Your Application</motion.button></Link><a href="tel:01992535555"><motion.button className="px-10 py-4 border border-white/20 text-white font-medium rounded-lg hover:bg-white/10 transition-all" whileHover={{ scale: 1.02 }}>01992 535 555</motion.button></a></div></ScrollAnimation></div></div>
      </section>

      <Footer />
    </div>
  );
}
