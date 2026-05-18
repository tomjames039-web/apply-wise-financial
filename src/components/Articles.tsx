"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";

const articles = [
  {
    title: "How long should I fix my mortgage for?",
    excerpt: "Deciding whether to fix and for how long. The latest insights to help your decision.",
  },
  {
    title: "Will mortgage rates go down?",
    excerpt: "Rates are finally easing. What this could mean for your mortgage.",
  },
  {
    title: "Bank of England base rate",
    excerpt: "How base rate changes impact your repayments explained.",
  },
];

export function Articles() {
  return (
    <section className="py-16 md:py-20 bg-white-texture">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <p className="text-xs font-medium text-gold uppercase tracking-[0.2em] mb-3">
                Insights
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold text-navy tracking-tight mb-3">
                Latest Insights
              </h2>
              <p className="text-navy/50">
                Stay informed with our mortgage analysis
              </p>
            </div>
            <Link href="/guides" className="text-gold font-medium hover:text-gold-dark transition-all">
              View all articles
            </Link>
          </div>
        </ScrollAnimation>

        <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.15}>
          {articles.map((article) => (
            <StaggerItem key={article.title}>
              <Link href="/guides">
                <Card className="bg-pearl/50 border border-navy/5 hover:border-gold/30 hover:shadow-lg transition-all duration-300 cursor-pointer group h-full rounded-lg">
                  <CardContent className="p-8 space-y-4 h-full flex flex-col">
                    <h3 className="text-lg font-semibold text-navy group-hover:text-gold transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-navy/50 text-sm leading-relaxed flex-grow">
                      {article.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-gold text-sm group-hover:gap-3 transition-all">
                      Read more
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
