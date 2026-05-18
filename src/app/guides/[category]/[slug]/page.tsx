"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { getGuide, getRelatedGuides, GuideSection, GuideArticle } from "@/lib/guides-data";

// Social Sharing Component
function SocialShareButtons({ title, description }: { title: string; description: string }) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const copyToClipboard = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0ARead more: ${encodedUrl}`,
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-navy/50 mr-1">Share:</span>

      {/* Facebook */}
      <motion.a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 bg-[#1877F2] rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Share on Facebook"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/>
        </svg>
      </motion.a>

      {/* Twitter/X */}
      <motion.a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 bg-black rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Share on X (Twitter)"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </motion.a>

      {/* LinkedIn */}
      <motion.a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 bg-[#0A66C2] rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Share on LinkedIn"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </motion.a>

      {/* WhatsApp */}
      <motion.a
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 bg-[#25D366] rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Share on WhatsApp"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.a>

      {/* Email */}
      <motion.a
        href={shareLinks.email}
        className="w-9 h-9 bg-navy/80 rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Share via Email"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </motion.a>

      {/* Copy Link */}
      <motion.button
        onClick={copyToClipboard}
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
          copied ? 'bg-green-500 text-white' : 'bg-pearl border border-navy/20 text-navy/60 hover:border-gold hover:text-gold'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Copy link"
      >
        {copied ? (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        )}
      </motion.button>
    </div>
  );
}

// Render different content types
function RenderSection({ section, index }: { section: GuideSection; index: number }) {
  if (section.type === "list" && section.items) {
    return (
      <div className="my-6">
        {section.content && (
          <p className="text-navy/70 mb-3">{section.content}</p>
        )}
        <ul className="space-y-2">
          {section.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-navy/70">
              <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (section.type === "tip") {
    return (
      <div className="my-6 bg-gold/10 border-l-4 border-gold rounded-r-lg p-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <p className="text-navy/80 text-sm">{section.content}</p>
        </div>
      </div>
    );
  }

  if (section.type === "warning") {
    return (
      <div className="my-6 bg-red-50 border-l-4 border-red-400 rounded-r-lg p-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-navy/80 text-sm">{section.content}</p>
        </div>
      </div>
    );
  }

  if (section.type === "example") {
    return (
      <div className="my-6 bg-navy/5 border border-navy/10 rounded-lg p-4">
        <p className="text-navy/80 text-sm italic">{section.content}</p>
      </div>
    );
  }

  // Default text type
  return (
    <div className="my-4">
      {section.heading && (
        <h2 className="text-xl font-bold text-navy mt-8 mb-4">{section.heading}</h2>
      )}
      <p className="text-navy/70 leading-relaxed">{section.content}</p>
    </div>
  );
}

export default function GuideArticlePage() {
  const params = useParams();
  const category = params.category as string;
  const slug = params.slug as string;

  const guide = getGuide(category, slug);

  // If guide not found
  if (!guide) {
    return (
      <div className="min-h-screen bg-pearl">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-3xl font-bold text-navy mb-4">Guide Not Found</h1>
            <p className="text-navy/60 mb-8">Sorry, we couldn't find the guide you're looking for.</p>
            <Link href="/guides">
              <button className="px-8 py-3 bg-navy text-white font-semibold rounded-lg hover:bg-navy-deep transition-all">
                Back to Guides
              </button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedGuides = guide.relatedGuides ? getRelatedGuides(guide.relatedGuides) : [];

  return (
    <div className="min-h-screen bg-pearl">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-pearl pt-24 pb-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm mb-6">
              <Link href="/" className="text-navy/50 hover:text-navy transition-colors">
                Home
              </Link>
              <svg className="w-4 h-4 text-navy/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <Link href="/guides" className="text-navy/50 hover:text-navy transition-colors">
                Guides
              </Link>
              <svg className="w-4 h-4 text-navy/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <Link href={`/guides?category=${guide.categorySlug}`} className="text-navy/50 hover:text-navy transition-colors">
                {guide.category}
              </Link>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 bg-gold/20 text-gold text-sm font-medium rounded-full mb-4">
                {guide.category}
              </span>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy leading-tight mb-4">
                {guide.title}
              </h1>
              <p className="text-navy/70 text-lg mb-6">
                {guide.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-navy/50 mb-6">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {guide.readTime}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Updated {guide.lastUpdated}
                </span>
              </div>

              {/* Quick Share */}
              <div className="flex items-center gap-3">
                <span className="text-navy/40 text-sm">Share:</span>
                <div className="flex gap-2">
                  <motion.button
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(guide.title)}`, '_blank');
                      }
                    }}
                    className="w-8 h-8 bg-navy/10 rounded-full flex items-center justify-center text-navy/70 hover:bg-navy/20 hover:text-navy transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank');
                      }
                    }}
                    className="w-8 h-8 bg-navy/10 rounded-full flex items-center justify-center text-navy/70 hover:bg-navy/20 hover:text-navy transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        navigator.clipboard.writeText(window.location.href);
                      }
                    }}
                    className="w-8 h-8 bg-navy/10 rounded-full flex items-center justify-center text-navy/70 hover:bg-navy/20 hover:text-navy transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            {/* Key Points Summary */}
            {guide.keyPoints && guide.keyPoints.length > 0 && (
              <ScrollAnimation>
                <Card className="bg-white border border-navy/5 rounded-xl mb-10 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-navy mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Key Takeaways
                    </h3>
                    <ul className="space-y-3">
                      {guide.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="w-6 h-6 bg-gold/10 rounded-full flex items-center justify-center text-gold text-xs font-bold flex-shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-navy/70">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            )}

            {/* Article Content */}
            <ScrollAnimation>
              <article className="prose prose-lg max-w-none">
                {guide.content.map((section, index) => (
                  <RenderSection key={index} section={section} index={index} />
                ))}
              </article>
            </ScrollAnimation>

            {/* Share Section */}
            <ScrollAnimation>
              <div className="mt-10 pt-8 border-t border-navy/10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <p className="text-navy/60 text-sm">Found this guide helpful? Share it with others:</p>
                  <SocialShareButtons title={guide.title} description={guide.description} />
                </div>
              </div>
            </ScrollAnimation>

            {/* CTA Section */}
            <ScrollAnimation>
              <div className="mt-12 bg-pearl border-2 border-gold/30 rounded-2xl p-8 text-center">
                <h3 className="text-xl font-bold text-navy mb-3">
                  Need Personalised Advice?
                </h3>
                <p className="text-navy/70 mb-6 max-w-md mx-auto">
                  Our mortgage experts are here to help you understand your options and find the right mortgage.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/apply">
                    <motion.button
                      className="px-8 py-3 bg-gold text-navy font-semibold rounded-lg hover:bg-gold/90 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Apply Now
                    </motion.button>
                  </Link>
                  <Link href="/book-a-call">
                    <motion.button
                      className="px-8 py-3 bg-navy/10 text-navy font-semibold rounded-lg border border-navy/20 hover:bg-navy/20 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Book a Call
                    </motion.button>
                  </Link>
                </div>
              </div>
            </ScrollAnimation>

            {/* Related Guides */}
            {relatedGuides.length > 0 && (
              <ScrollAnimation>
                <div className="mt-12">
                  <h3 className="text-xl font-bold text-navy mb-6">Related Guides</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {relatedGuides.map((related) => (
                      <Link key={related.slug} href={`/guides/${related.categorySlug}/${related.slug}`}>
                        <Card className="bg-white border border-navy/5 rounded-xl h-full hover:shadow-lg hover:border-gold/30 transition-all duration-300 group cursor-pointer">
                          <CardContent className="p-5">
                            <span className="text-xs text-gold font-medium">{related.category}</span>
                            <h4 className="text-base font-semibold text-navy mt-1 mb-2 group-hover:text-gold transition-colors">
                              {related.title}
                            </h4>
                            <p className="text-navy/60 text-sm line-clamp-2">{related.description}</p>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              </ScrollAnimation>
            )}
          </div>
        </div>
      </section>

      {/* Back to Guides */}
      <section className="py-8 bg-white border-t border-navy/5">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <Link href="/guides" className="inline-flex items-center gap-2 text-navy/60 hover:text-gold transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Guides
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
