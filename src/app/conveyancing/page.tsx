"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

const conveyancingTypes = [
  {
    title: "Sale & Purchase",
    description: "Buying or selling a property? Our panel of solicitors handle the legal work from exchange to completion.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    title: "Remortgage",
    description: "Switching lender or releasing equity? We offer competitive fixed-fee remortgage conveyancing.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
  },
  {
    title: "Transfer of Equity",
    description: "Adding or removing someone from your property title? We handle the legal transfer process.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
  {
    title: "Buy to Let",
    description: "Investment property purchase? Our solicitors are experienced with BTL transactions.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const benefits = [
  {
    title: "Fixed Fee Quotes",
    description: "Know exactly what you'll pay upfront. No hidden costs or surprise charges.",
  },
  {
    title: "Trusted Panel",
    description: "Hand-picked solicitors across the UK with proven track records.",
  },
  {
    title: "Fast Turnaround",
    description: "Efficient processes to help your transaction complete on time.",
  },
  {
    title: "Regular Updates",
    description: "Track your case progress online and receive proactive updates.",
  },
  {
    title: "Dedicated Support",
    description: "Direct access to your solicitor throughout the process.",
  },
  {
    title: "Competitive Rates",
    description: "Quality legal services at prices that won't break the bank.",
  },
];

const process = [
  {
    step: "1",
    title: "Get a Quote",
    description: "Tell us about your transaction and receive an instant, fixed-fee quote.",
  },
  {
    step: "2",
    title: "Instruct Solicitor",
    description: "Happy with your quote? Confirm and your solicitor will begin work.",
  },
  {
    step: "3",
    title: "Track Progress",
    description: "Monitor your case online with regular updates at every stage.",
  },
  {
    step: "4",
    title: "Complete",
    description: "Exchange contracts and complete your property transaction.",
  },
];

export default function ConveyancingPage() {
  return (
    <div className="min-h-screen bg-pearl">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center bg-pearl pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Headline */}
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Conveyancing
              <br />
              <span className="text-gold">Made Simple</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              className="text-lg md:text-xl text-navy/70 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Whether you're buying, selling, or remortgaging, get instant fixed-fee quotes from our trusted panel of solicitors.
            </motion.p>

            {/* Bullet Points */}
            <motion.div
              className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {[
                "Instant fixed-fee quotes",
                "Trusted UK solicitors",
                "No hidden charges",
                "Track progress online",
              ].map((point, index) => (
                <div key={index} className="flex items-center gap-2 text-navy/70">
                  <svg className="w-5 h-5 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm md:text-base">{point}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href="https://quote.sortrefer.co.uk/MTc5ODc="
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  className="relative px-10 py-4 bg-gold text-navy font-semibold text-lg rounded-lg hover:bg-gold/90 transition-all shadow-lg shadow-gold/20"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Your Free Quote
                  <svg className="inline-block ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
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
              <span>Panel of UK Solicitors</span>
              <span className="text-gold">•</span>
              <span>Fixed Fee Pricing</span>
              <span className="text-gold">•</span>
              <span>Online Case Tracking</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Conveyancing Types */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                Conveyancing Services
              </h2>
              <p className="text-navy/60 max-w-2xl mx-auto">
                Whatever your property transaction, we have the right legal solution for you
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {conveyancingTypes.map((type, index) => (
              <ScrollAnimation key={type.title} delay={index * 0.1}>
                <Card className="bg-pearl border border-navy/5 rounded-xl h-full hover:shadow-lg hover:border-gold/30 transition-all duration-300 group">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center text-gold mb-4 mx-auto group-hover:bg-gold group-hover:text-white transition-all">
                      {type.icon}
                    </div>
                    <h3 className="text-lg font-bold text-navy mb-2 group-hover:text-gold transition-colors">
                      {type.title}
                    </h3>
                    <p className="text-navy/60 text-sm">
                      {type.description}
                    </p>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-20 bg-pearl">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                Why Choose Our Conveyancing Service?
              </h2>
              <p className="text-navy/60 max-w-2xl mx-auto">
                We've partnered with trusted solicitors to make your property transaction as smooth as possible
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <ScrollAnimation key={benefit.title} delay={index * 0.08}>
                <div className="flex gap-4 p-5 bg-white rounded-xl border border-navy/5">
                  <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy mb-1">{benefit.title}</h3>
                    <p className="text-navy/60 text-sm">{benefit.description}</p>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                How It Works
              </h2>
              <p className="text-navy/60 max-w-xl mx-auto">
                Getting started is quick and easy
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {process.map((item, index) => (
              <ScrollAnimation key={item.step} delay={index * 0.1}>
                <div className="text-center">
                  <div className="w-14 h-14 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-xl mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-navy mb-2">{item.title}</h3>
                  <p className="text-navy/60 text-sm">{item.description}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>

          <ScrollAnimation delay={0.4}>
            <div className="text-center mt-12">
              <a
                href="https://quote.sortrefer.co.uk/MTc5ODc="
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  className="px-10 py-4 bg-navy text-white font-semibold rounded-lg hover:bg-navy-deep transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Your Quote Now
                </motion.button>
              </a>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-pearl">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                Conveyancing FAQs
              </h2>
            </div>
          </ScrollAnimation>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "What is conveyancing?",
                a: "Conveyancing is the legal process of transferring property ownership from one person to another. It includes searches, contracts, and registration with the Land Registry.",
              },
              {
                q: "How long does conveyancing take?",
                a: "Typically 8-12 weeks for a standard purchase, though this can vary. Remortgages are usually faster at 4-6 weeks as there's no chain to manage.",
              },
              {
                q: "What's included in the fixed fee?",
                a: "Our fixed fees cover the solicitor's legal work. Disbursements like searches, Land Registry fees, and stamp duty are additional and will be clearly outlined in your quote.",
              },
              {
                q: "Do I need to use a local solicitor?",
                a: "No, most conveyancing is done remotely these days. Our panel solicitors handle transactions across England and Wales regardless of location.",
              },
            ].map((faq, index) => (
              <ScrollAnimation key={index} delay={index * 0.08}>
                <div className="bg-white rounded-xl p-6 border border-navy/5">
                  <h3 className="font-semibold text-navy mb-2">{faq.q}</h3>
                  <p className="text-navy/60 text-sm">{faq.a}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <ScrollAnimation>
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-navy/60 mb-8 max-w-xl mx-auto">
              Get your instant fixed-fee conveyancing quote in minutes
            </p>
            <a
              href="https://quote.sortrefer.co.uk/MTc5ODc="
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                className="px-10 py-4 bg-gold text-navy font-semibold text-lg rounded-lg hover:bg-gold/90 transition-all shadow-lg shadow-gold/20"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Your Free Quote
              </motion.button>
            </a>
            <p className="text-navy/40 text-sm mt-4">
              Or call us on <a href="tel:01992535555" className="text-gold hover:underline">01992 535 555</a>
            </p>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
    </div>
  );
}
