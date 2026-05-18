"use client";

import { ScrollAnimation } from "@/components/ui/scroll-animation";

export function InfoSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* What is a mortgage broker */}
          <ScrollAnimation>
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-semibold text-navy tracking-tight">
                What is a mortgage broker?
              </h2>
              <div className="space-y-4 text-navy/60 leading-relaxed">
                <p>
                  A mortgage broker gives advice on and helps to arrange mortgages. Having someone with in-depth industry knowledge in your corner makes all the difference.
                </p>
              </div>
            </div>
          </ScrollAnimation>

          {/* How we offer free advice */}
          <ScrollAnimation delay={0.1}>
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-semibold text-navy tracking-tight">
                Our fees explained
              </h2>
              <div className="space-y-4 text-navy/60 leading-relaxed">
                <p>
                  For product switches with your current lender, our service is completely free — we receive commission from the lender. If you're switching to a new lender or need specialist advice, any advisory fees are always discussed and agreed in advance.
                </p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
