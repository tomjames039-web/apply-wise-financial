"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

const locationGroups = [
  {
    title: "Essex Towns",
    locations: [
      { name: "Epping", href: "/mortgage-broker-epping", description: "Our home base - CM16" },
      { name: "North Weald", href: "/mortgage-broker-north-weald", description: "Village & rural" },
      { name: "Ongar", href: "/mortgage-broker-ongar", description: "Market town - CM5" },
      { name: "Theydon Bois", href: "/mortgage-broker-theydon-bois", description: "Central Line village" },
      { name: "Loughton", href: "/mortgage-broker-loughton", description: "Epping Forest - IG10" },
      { name: "Chigwell", href: "/mortgage-broker-chigwell", description: "Premium properties - IG7" },
      { name: "Waltham Abbey", href: "/mortgage-broker-waltham-abbey", description: "Lee Valley - EN9" },
      { name: "Harlow", href: "/mortgage-broker-harlow", description: "New town - CM17-20" },
      { name: "Chelmsford", href: "/mortgage-broker-chelmsford", description: "City centre - CM1-3" },
      { name: "Brentwood", href: "/mortgage-broker-brentwood", description: "Elizabeth Line - CM14-15" },
    ],
  },
  {
    title: "Hertfordshire Towns",
    locations: [
      { name: "Bishop's Stortford", href: "/mortgage-broker-bishops-stortford", description: "Stansted area - CM23" },
      { name: "Hoddesdon", href: "/mortgage-broker-hoddesdon", description: "Lea Valley - EN11" },
      { name: "Cheshunt", href: "/mortgage-broker-cheshunt", description: "Elizabeth Line - EN8" },
      { name: "Hertford", href: "/mortgage-broker-hertford", description: "County town - SG13-14" },
    ],
  },
  {
    title: "Counties",
    locations: [
      { name: "Essex", href: "/mortgage-broker-essex", description: "County-wide coverage" },
      { name: "Hertfordshire", href: "/mortgage-advisor-hertfordshire", description: "County-wide coverage" },
    ],
  },
];

export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-pearl">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center bg-pearl pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.p
              className="text-xs font-medium text-gold uppercase tracking-[0.2em] mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Areas We Cover
            </motion.p>

            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Mortgage Advice Across the UK
              <br />
              <span className="text-gold">With Local Roots in Essex & Hertfordshire</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-navy/70 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Apply Wise is based in Epping and advises clients nationally. Whether you're local to us or anywhere in the UK, you'll receive the same expert, whole-of-market advice from a real advisor.
            </motion.p>

            {/* Trust indicators */}
            <motion.div
              className="flex items-center justify-center gap-4 text-xs text-navy/40 tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
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
              <span>Based in Epping, Essex</span>
              <span className="text-gold">•</span>
              <span>Advising Clients Nationwide</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Groups */}
      {locationGroups.map((group, groupIndex) => (
        <section
          key={group.title}
          className={`py-12 md:py-16 ${groupIndex % 2 === 0 ? "bg-white" : "bg-pearl"}`}
        >
          <div className="container mx-auto px-4 md:px-6">
            <ScrollAnimation>
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-8 text-center">
                {group.title}
              </h2>
            </ScrollAnimation>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {group.locations.map((location, index) => (
                <ScrollAnimation key={location.name} delay={index * 0.05}>
                  <Link href={location.href}>
                    <motion.div
                      className="bg-white border border-navy/10 rounded-xl p-5 hover:border-gold hover:shadow-lg transition-all duration-300 group cursor-pointer h-full"
                      whileHover={{ y: -4 }}
                    >
                      <h3 className="font-semibold text-navy group-hover:text-gold transition-colors mb-1">
                        {location.name}
                      </h3>
                      <p className="text-sm text-navy/50">{location.description}</p>
                    </motion.div>
                  </Link>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* National Coverage CTA */}
      <section className="py-16 md:py-20 bg-navy">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollAnimation>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Can't See Your Area?
              </h2>
              <p className="text-white/60 mb-8 text-lg">
                We advise clients across the whole of the UK. Whether you're in Scotland, Wales, or anywhere in England — get in touch and we'll help wherever you are.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/apply">
                  <motion.button
                    className="px-10 py-4 bg-gold text-navy font-semibold rounded-lg hover:bg-gold/90 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Started
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

      {/* Local Knowledge Banner */}
      <section className="py-12 md:py-16 bg-pearl">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollAnimation>
              <div className="bg-white rounded-xl p-6 md:p-8 border-l-4 border-gold">
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
                  <div className="flex-shrink-0">
                    <img
                      src="/logos/fca.png"
                      alt="Financial Conduct Authority"
                      className="w-16 md:w-20 h-auto"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy mb-2">Local Knowledge, National Reach</h3>
                    <p className="text-navy/70 leading-relaxed">
                      Apply Wise is based in Epping, Essex — advising clients across the whole of the UK. Whether you're local or nationwide, you'll always speak directly to an experienced, FCA-regulated advisor. We combine deep local market knowledge with access to 90+ UK lenders, giving you the best of both worlds.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
