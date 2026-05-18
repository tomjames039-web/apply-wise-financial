"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function LifeInsurancePage() {
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
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                Protection Insurance
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-2xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4 md:mb-6">
                Life Insurance
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-base md:text-lg text-white/70 mb-8 max-w-xl mx-auto">
                Protect your family's financial future with a tax-free lump sum if the worst happens.
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

        {/* What is Life Insurance */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <p className="text-xs font-medium text-gold uppercase tracking-[0.15em] mb-2">Understanding</p>
                <h2 className="text-xl md:text-3xl font-bold text-navy mb-4">What is Life Insurance?</h2>
              </div>
              <div className="prose prose-navy max-w-none">
                <p className="text-navy/70 text-base leading-relaxed mb-4">
                  Life insurance pays out a <strong className="text-navy">tax-free lump sum</strong> to your loved ones if you pass away during the policy term. This money can be used to pay off your mortgage, cover living expenses, fund your children's education, or anything else your family needs.
                </p>
                <p className="text-navy/70 text-base leading-relaxed mb-4">
                  Unlike other forms of savings or investments, life insurance guarantees a payout regardless of how much you've paid in premiums – as long as the policy is active when you pass away.
                </p>
                <p className="text-navy/70 text-base leading-relaxed">
                  Premiums are typically fixed for the life of the policy, meaning your monthly payment won't increase as you get older. The younger and healthier you are when you take out a policy, the lower your premiums will be.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Types of Life Insurance */}
        <section className="py-12 md:py-16 bg-pearl">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <p className="text-xs font-medium text-gold uppercase tracking-[0.15em] mb-2">Options</p>
              <h2 className="text-xl md:text-3xl font-bold text-navy mb-4">Types of Life Insurance</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  title: "Level Term Life Insurance",
                  description: "The payout amount stays the same throughout the policy term. Ideal for providing a fixed sum to cover debts or leave an inheritance.",
                  ideal: "Ideal for: Leaving money for dependents, covering funeral costs",
                  icon: "→",
                },
                {
                  title: "Decreasing Term Life Insurance",
                  description: "The payout decreases over time, usually in line with a repayment mortgage. Premiums are typically lower than level term.",
                  ideal: "Ideal for: Covering a repayment mortgage",
                  icon: "↘",
                },
                {
                  title: "Joint Life Insurance",
                  description: "Covers two people under one policy. Pays out when the first person dies. Often more affordable than two separate policies.",
                  ideal: "Ideal for: Couples with a mortgage or dependents",
                  icon: "♥",
                },
                {
                  title: "Family Income Benefit",
                  description: "Instead of a lump sum, provides a regular monthly income to your family until the end of the policy term.",
                  ideal: "Ideal for: Replacing your salary for ongoing expenses",
                  icon: "£",
                },
              ].map((type, i) => (
                <motion.div key={i} className="bg-white rounded-xl p-6 border border-navy/5" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center text-gold font-bold mb-4">{type.icon}</div>
                  <h3 className="text-lg font-bold text-navy mb-2">{type.title}</h3>
                  <p className="text-navy/70 text-sm mb-3">{type.description}</p>
                  <p className="text-gold text-xs font-medium">{type.ideal}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Who Needs It */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <p className="text-xs font-medium text-gold uppercase tracking-[0.15em] mb-2">Is It For You?</p>
              <h2 className="text-xl md:text-3xl font-bold text-navy mb-4">Who Needs Life Insurance?</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { title: "Mortgage Holders", desc: "Protect your family from inheriting debt if you pass away", icon: "🏠" },
                { title: "Parents", desc: "Ensure your children are financially secure", icon: "👨‍👩‍👧‍👦" },
                { title: "Main Earners", desc: "Replace lost income for those who depend on you", icon: "💼" },
                { title: "Business Owners", desc: "Protect partners and fund buy-out agreements", icon: "🏢" },
                { title: "Couples", desc: "Help your partner maintain their lifestyle", icon: "💑" },
                { title: "Anyone with Debt", desc: "Prevent debt from passing to loved ones", icon: "📋" },
              ].map((item, i) => (
                <motion.div key={i} className="text-center p-5 bg-pearl rounded-xl" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <span className="text-3xl mb-3 block">{item.icon}</span>
                  <h3 className="font-semibold text-navy mb-1">{item.title}</h3>
                  <p className="text-navy/60 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How Much Cover */}
        <section className="py-12 md:py-16 bg-pearl">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <p className="text-xs font-medium text-gold uppercase tracking-[0.15em] mb-2">Planning</p>
                <h2 className="text-xl md:text-3xl font-bold text-navy mb-4">How Much Cover Do You Need?</h2>
              </div>
              <div className="bg-white rounded-xl p-6 md:p-8 border border-navy/5">
                <p className="text-navy/70 text-sm mb-6">A common rule of thumb is to have cover worth <strong className="text-navy">10x your annual income</strong>, plus any outstanding debts. Consider:</p>
                <ul className="space-y-3">
                  {[
                    "Outstanding mortgage balance",
                    "Other debts (loans, credit cards)",
                    "Years until children are financially independent",
                    "Ongoing living expenses for your family",
                    "Future costs (university, weddings)",
                    "Funeral expenses",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-navy/70 text-sm">
                      <svg className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Guide */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <p className="text-xs font-medium text-gold uppercase tracking-[0.15em] mb-2">Costs</p>
              <h2 className="text-xl md:text-3xl font-bold text-navy mb-4">What Does It Cost?</h2>
              <p className="text-navy/60 text-sm max-w-xl mx-auto">Premiums depend on age, health, smoking status, and cover amount. Here's a rough guide:</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { age: "Under 35", price: "£5–£15", note: "per month for £250k cover" },
                { age: "35–50", price: "£15–£35", note: "per month for £250k cover" },
                { age: "Over 50", price: "£35–£80+", note: "per month for £250k cover" },
              ].map((item, i) => (
                <motion.div key={i} className="text-center p-6 bg-pearl rounded-xl" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <p className="text-navy/60 text-sm mb-1">{item.age}</p>
                  <p className="text-3xl font-bold text-gold mb-1">{item.price}</p>
                  <p className="text-navy/50 text-xs">{item.note}</p>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-navy/50 text-xs mt-6">*Estimates only. Actual premiums vary based on individual circumstances.</p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-20 bg-navy">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Get Your Life Insurance Quote</h2>
              <p className="text-white/70 mb-6 text-sm md:text-base">Find out how much cover you need and what it could cost. Takes just 60 seconds.</p>
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
              <span className="text-navy">Life Insurance</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
