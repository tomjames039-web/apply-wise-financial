"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function CriticalIllnessPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-pearl">
        {/* Hero */}
        <section className="relative pt-16 pb-12 md:pt-20 md:pb-16 bg-navy overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/5 to-transparent" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1.5 bg-gold/20 border border-gold/30 rounded-full text-gold text-xs font-medium mb-4">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                Protection Insurance
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-2xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4 md:mb-6">
                Critical Illness Cover
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-base md:text-lg text-white/70 mb-8 max-w-xl mx-auto">
                Get a tax-free lump sum if you're diagnosed with a serious illness. Focus on recovery, not finances.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/protection" className="w-full sm:w-auto px-8 py-4 bg-gold text-navy font-bold text-base rounded-xl hover:bg-gold/90 transition-all text-center">
                  Get a Quote
                </Link>
                <a href="tel:01992535555" className="w-full sm:w-auto px-8 py-4 border-2 border-white/30 text-white font-medium rounded-xl hover:bg-white/10 transition-all text-center">
                  Call 01992 535 555
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What is Critical Illness */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <p className="text-xs font-medium text-gold uppercase tracking-[0.15em] mb-2">Understanding</p>
                <h2 className="text-xl md:text-3xl font-bold text-navy mb-4">What is Critical Illness Cover?</h2>
              </div>
              <div className="prose prose-navy max-w-none">
                <p className="text-navy/70 text-base leading-relaxed mb-4">
                  Critical illness cover pays out a <strong className="text-navy">tax-free lump sum</strong> if you're diagnosed with a serious illness listed in your policy. Unlike life insurance, you receive the money while you're alive, giving you financial freedom during recovery.
                </p>
                <p className="text-navy/70 text-base leading-relaxed mb-4">
                  The payout can be used however you choose: pay off your mortgage, cover medical costs, adapt your home, take time off work, or simply reduce financial stress so you can focus on getting better.
                </p>
                <p className="text-navy/70 text-base leading-relaxed">
                  Most policies cover between <strong className="text-navy">40-60 serious conditions</strong>, with cancer, heart attack, and stroke being the most commonly claimed conditions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Conditions Covered */}
        <section className="py-12 md:py-16 bg-pearl">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <p className="text-xs font-medium text-gold uppercase tracking-[0.15em] mb-2">Coverage</p>
              <h2 className="text-xl md:text-3xl font-bold text-navy mb-4">What Conditions Are Covered?</h2>
              <p className="text-navy/60 text-sm max-w-xl mx-auto">Most policies cover 40+ conditions. Here are some of the most common:</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                "Cancer", "Heart Attack", "Stroke", "Multiple Sclerosis",
                "Kidney Failure", "Major Organ Transplant", "Parkinson's Disease", "Motor Neurone Disease",
                "Alzheimer's Disease", "Loss of Limbs", "Blindness", "Deafness",
                "Paralysis", "Severe Burns", "Coma", "Benign Brain Tumour",
              ].map((condition, i) => (
                <motion.div key={i} className="flex items-center gap-2 bg-white rounded-lg p-3 text-sm" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                  <svg className="w-4 h-4 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span className="text-navy">{condition}</span>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-navy/50 text-xs mt-6">*Coverage varies by provider. We'll help you find the right policy for your needs.</p>
          </div>
        </section>

        {/* The Reality */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <p className="text-xs font-medium text-gold uppercase tracking-[0.15em] mb-2">Why It Matters</p>
              <h2 className="text-xl md:text-3xl font-bold text-navy mb-4">The Facts You Should Know</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
              {[
                { stat: "1 in 2", label: "People will face a serious illness in their lifetime", color: "text-navy" },
                { stat: "100,000+", label: "Heart attacks in the UK each year", color: "text-navy" },
                { stat: "6 months", label: "Average recovery time from serious illness", color: "text-gold" },
                { stat: "£30,000", label: "Average critical illness claim payout", color: "text-gold" },
              ].map((item, i) => (
                <motion.div key={i} className="text-center p-4 md:p-6 bg-pearl rounded-xl" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <p className={`text-2xl md:text-3xl font-bold ${item.color} mb-1`}>{item.stat}</p>
                  <p className="text-navy/60 text-xs md:text-sm">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Who Needs It */}
        <section className="py-12 md:py-16 bg-pearl">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <p className="text-xs font-medium text-gold uppercase tracking-[0.15em] mb-2">Is It For You?</p>
              <h2 className="text-xl md:text-3xl font-bold text-navy mb-4">Who Needs Critical Illness Cover?</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { title: "Those Without Savings", desc: "If you couldn't survive 6+ months without income", icon: "💰" },
                { title: "Self-Employed", desc: "No employer sick pay means no income if you can't work", icon: "👨‍💻" },
                { title: "Mortgage Holders", desc: "Pay off your mortgage if diagnosed with serious illness", icon: "🏠" },
                { title: "Primary Earners", desc: "Protect your family's lifestyle during your recovery", icon: "👨‍👩‍👧" },
                { title: "Family History", desc: "Higher risk if family members have had serious illness", icon: "🧬" },
                { title: "Anyone at Risk", desc: "Smokers, those with high stress, or unhealthy lifestyles", icon: "⚠️" },
              ].map((item, i) => (
                <motion.div key={i} className="text-center p-5 bg-white rounded-xl" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <span className="text-3xl mb-3 block">{item.icon}</span>
                  <h3 className="font-semibold text-navy mb-1">{item.title}</h3>
                  <p className="text-navy/60 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Guide */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <p className="text-xs font-medium text-gold uppercase tracking-[0.15em] mb-2">Costs</p>
              <h2 className="text-xl md:text-3xl font-bold text-navy mb-4">What Does It Cost?</h2>
              <p className="text-navy/60 text-sm max-w-xl mx-auto">Critical illness is typically 2-3x the cost of life insurance alone:</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { age: "Under 35", price: "£15–£40", note: "per month for £100k cover" },
                { age: "35–50", price: "£40–£90", note: "per month for £100k cover" },
                { age: "Over 50", price: "£90–£200+", note: "per month for £100k cover" },
              ].map((item, i) => (
                <motion.div key={i} className="text-center p-6 bg-pearl rounded-xl" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <p className="text-navy/60 text-sm mb-1">{item.age}</p>
                  <p className="text-3xl font-bold text-gold mb-1">{item.price}</p>
                  <p className="text-navy/50 text-xs">{item.note}</p>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-navy/50 text-xs mt-6">*Estimates only. Many combine critical illness with life insurance for better value.</p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-20 bg-navy">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Get Your Critical Illness Quote</h2>
              <p className="text-white/70 mb-6 text-sm md:text-base">Find out what cover you need and what it could cost. Takes just 60 seconds.</p>
              <Link href="/protection" className="inline-block w-full sm:w-auto px-8 py-4 bg-gold text-navy font-bold rounded-xl hover:bg-gold/90 transition-all">
                Start My Protection Check
              </Link>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <section className="py-4 bg-pearl border-t border-navy/5">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-xs text-navy/50">
              <Link href="/" className="hover:text-navy">Home</Link>
              <span>/</span>
              <Link href="/protection" className="hover:text-navy">Protection</Link>
              <span>/</span>
              <span className="text-navy">Critical Illness Cover</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
