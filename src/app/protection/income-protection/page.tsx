"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function IncomeProtectionPage() {
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
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Protection Insurance
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-2xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4 md:mb-6">
                Income Protection
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-base md:text-lg text-white/70 mb-8 max-w-xl mx-auto">
                Replace your salary if illness or injury stops you working. Get paid monthly until you recover.
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

        {/* What is Income Protection */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <p className="text-xs font-medium text-gold uppercase tracking-[0.15em] mb-2">Understanding</p>
                <h2 className="text-xl md:text-3xl font-bold text-navy mb-4">What is Income Protection?</h2>
              </div>
              <div className="prose prose-navy max-w-none">
                <p className="text-navy/70 text-base leading-relaxed mb-4">
                  Income protection pays you a <strong className="text-navy">regular monthly income</strong> if you're unable to work due to illness or injury. Unlike critical illness which pays a one-off lump sum, income protection provides ongoing support – like a replacement salary.
                </p>
                <p className="text-navy/70 text-base leading-relaxed mb-4">
                  Payments typically cover <strong className="text-navy">up to 60% of your gross salary</strong> (limited to prevent you earning more than when working). You can claim as many times as you need during the policy term.
                </p>
                <p className="text-navy/70 text-base leading-relaxed">
                  Payments continue until you return to work, reach retirement age, or the policy ends – whichever comes first. This makes it the most comprehensive form of income replacement available.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12 md:py-16 bg-pearl">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <p className="text-xs font-medium text-gold uppercase tracking-[0.15em] mb-2">Process</p>
              <h2 className="text-xl md:text-3xl font-bold text-navy mb-4">How Income Protection Works</h2>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="space-y-4">
                {[
                  { step: "1", title: "You can't work", desc: "Illness or injury prevents you from doing your job" },
                  { step: "2", title: "Waiting period", desc: "A deferred period passes (typically 4-52 weeks, chosen by you)" },
                  { step: "3", title: "Claim begins", desc: "You start receiving monthly payments (up to 60% of salary)" },
                  { step: "4", title: "Payments continue", desc: "Until you recover, retire, or the policy ends" },
                ].map((item, i) => (
                  <motion.div key={i} className="flex items-start gap-4 bg-white rounded-xl p-5" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-gold font-bold flex-shrink-0">{item.step}</div>
                    <div>
                      <h3 className="font-semibold text-navy mb-1">{item.title}</h3>
                      <p className="text-navy/60 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Deferred Period */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <p className="text-xs font-medium text-gold uppercase tracking-[0.15em] mb-2">Key Decision</p>
                <h2 className="text-xl md:text-3xl font-bold text-navy mb-4">Choosing Your Deferred Period</h2>
              </div>
              <div className="bg-pearl rounded-xl p-6 md:p-8">
                <p className="text-navy/70 text-sm mb-6">The deferred period is how long you wait before payments start. Longer wait = lower premiums:</p>
                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    { period: "4 weeks", best: "Self-employed with no sick pay", cost: "Highest" },
                    { period: "8 weeks", best: "Limited employer sick pay", cost: "High" },
                    { period: "26 weeks", best: "6 months employer sick pay", cost: "Medium" },
                    { period: "52 weeks", best: "1 year sick pay or savings", cost: "Lowest" },
                  ].map((item, i) => (
                    <div key={i} className="text-center p-4 bg-white rounded-lg">
                      <p className="text-xl font-bold text-gold mb-1">{item.period}</p>
                      <p className="text-navy/70 text-xs mb-2">{item.best}</p>
                      <span className="text-xs px-2 py-1 bg-navy/5 rounded text-navy/60">{item.cost} cost</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who Needs It */}
        <section className="py-12 md:py-16 bg-pearl">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <p className="text-xs font-medium text-gold uppercase tracking-[0.15em] mb-2">Is It For You?</p>
              <h2 className="text-xl md:text-3xl font-bold text-navy mb-4">Who Needs Income Protection?</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { title: "Self-Employed", desc: "No employer sick pay means no income if you can't work", icon: "👨‍💻", priority: "Essential" },
                { title: "Contractors", desc: "Often have no sick pay entitlement from clients", icon: "📋", priority: "Essential" },
                { title: "Limited Sick Pay", desc: "Only getting SSP (£109/week) after a few weeks", icon: "📉", priority: "High" },
                { title: "Main Earner", desc: "Family depends on your income to pay bills", icon: "👨‍👩‍👧", priority: "High" },
                { title: "Mortgage Holders", desc: "Need to keep paying the mortgage if you can't work", icon: "🏠", priority: "High" },
                { title: "Anyone Working", desc: "Your ability to earn is your most valuable asset", icon: "💼", priority: "Consider" },
              ].map((item, i) => (
                <motion.div key={i} className="text-center p-5 bg-white rounded-xl" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <span className="text-3xl mb-3 block">{item.icon}</span>
                  <h3 className="font-semibold text-navy mb-1">{item.title}</h3>
                  <p className="text-navy/60 text-sm mb-2">{item.desc}</p>
                  <span className={`text-xs px-2 py-1 rounded ${item.priority === "Essential" ? "bg-red-100 text-red-600" : item.priority === "High" ? "bg-amber-100 text-amber-600" : "bg-green-100 text-green-600"}`}>{item.priority}</span>
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
              <p className="text-navy/60 text-sm max-w-xl mx-auto">Typically 1-3% of the income you want to protect:</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { income: "£2,000/mo salary", price: "£20–£60", note: "per month" },
                { income: "£3,500/mo salary", price: "£35–£105", note: "per month" },
                { income: "£5,000/mo salary", price: "£50–£150", note: "per month" },
              ].map((item, i) => (
                <motion.div key={i} className="text-center p-6 bg-pearl rounded-xl" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <p className="text-navy/60 text-sm mb-1">{item.income}</p>
                  <p className="text-3xl font-bold text-gold mb-1">{item.price}</p>
                  <p className="text-navy/50 text-xs">{item.note}</p>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-navy/50 text-xs mt-6">*Self-employed may be able to claim premiums as a business expense.</p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-20 bg-navy">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Get Your Income Protection Quote</h2>
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
              <span className="text-navy">Income Protection</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
