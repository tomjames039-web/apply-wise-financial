"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrustBadges } from "@/components/TrustBadges";
import { Stats } from "@/components/Stats";
import { TrustedPartners } from "@/components/TrustedPartners";
import { Footer } from "@/components/Footer";
import { SplashScreen } from "@/components/SplashScreen";

// Lazy load below-fold components for faster initial page load
const HowItWorks = lazy(() => import("@/components/HowItWorks").then(mod => ({ default: mod.HowItWorks })));
const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs").then(mod => ({ default: mod.WhyChooseUs })));
const InfoSection = lazy(() => import("@/components/InfoSection").then(mod => ({ default: mod.InfoSection })));
const Tools = lazy(() => import("@/components/Tools").then(mod => ({ default: mod.Tools })));
const Testimonials = lazy(() => import("@/components/Testimonials").then(mod => ({ default: mod.Testimonials })));
const FAQ = lazy(() => import("@/components/FAQ").then(mod => ({ default: mod.FAQ })));
const Articles = lazy(() => import("@/components/Articles").then(mod => ({ default: mod.Articles })));

// Minimal loading placeholder
function SectionLoader() {
  return <div className="py-16 md:py-20" aria-hidden="true" />;
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if user has already seen splash this session
    const seen = sessionStorage.getItem("splash_seen");
    if (!seen) {
      setShowSplash(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem("splash_seen", "true");
  };

  return (
    <>
      {/* Splash screen overlay - renders on top while content loads beneath */}
      {mounted && showSplash && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}

      {/* Main content - always renders, pre-loads behind splash */}
      <main className="min-h-screen">
        <Header />
        <Hero />
        <TrustBadges />
        <Stats />
        <TrustedPartners />

        {/* Lazy-loaded sections below the fold */}
        <Suspense fallback={<SectionLoader />}>
          <HowItWorks />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <WhyChooseUs />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <InfoSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Tools />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <FAQ />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Articles />
        </Suspense>

        <Footer />
      </main>
    </>
  );
}
