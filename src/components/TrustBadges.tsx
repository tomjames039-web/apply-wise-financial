"use client";

import { ScrollAnimation } from "@/components/ui/scroll-animation";

interface Badge {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const badges: Badge[] = [
  {
    icon: (
      <img
        src="/logos/fca.png"
        alt="FCA"
        className="w-10 h-10 object-contain"
      />
    ),
    title: "FCA Regulated",
    description: "Authorised and regulated by the Financial Conduct Authority",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Free Remortgages & Switches",
    description: "No fees for remortgages or product transfers",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    title: "Whole of Market",
    description: "Access to 90+ lenders including high street banks",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: "Data Protected",
    description: "Your information is encrypted and secure",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Quick Decisions",
    description: "Mortgage in principle within 24 hours",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    title: "Expert Support",
    description: "Dedicated adviser throughout your journey",
  },
];

export function TrustBadges() {
  return (
    <section className="py-16 md:py-20 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation>
          <div className="text-center mb-12 md:mb-16">
            <p className="text-xs font-medium text-gold uppercase tracking-[0.2em] mb-3">
              Why Choose Us
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-navy tracking-tight mb-4">
              Your Mortgage, Our Priority
            </h2>
            <p className="text-navy/50 max-w-xl mx-auto">
              We're committed to making your mortgage journey as smooth as possible
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {badges.map((badge, index) => (
            <ScrollAnimation key={badge.title} delay={index * 0.05}>
              <div className="flex items-start gap-4 p-6 bg-pearl/50 border border-navy/5 rounded-xl hover:border-gold/30 hover:shadow-lg transition-all duration-300 group">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 bg-gradient-to-br from-gold/20 to-gold/5 text-gold group-hover:from-gold group-hover:to-gold/80 group-hover:text-white">
                  {badge.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-navy mb-1">{badge.title}</h3>
                  <p className="text-sm text-navy/50 leading-relaxed">{badge.description}</p>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
