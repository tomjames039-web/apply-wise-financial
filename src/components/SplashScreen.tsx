"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleSkip = useCallback(() => {
    if (!isVisible) return;
    setIsVisible(false);
    setTimeout(onComplete, 600);
  }, [isVisible, onComplete]);

  useEffect(() => {
    // Auto-dismiss after 3.5 seconds (reduced from 5s)
    const autoTimeout = setTimeout(() => {
      handleSkip();
    }, 3500);

    // Allow skip IMMEDIATELY - no delay
    const handleInteraction = () => handleSkip();

    window.addEventListener("click", handleInteraction, { once: true });
    window.addEventListener("touchstart", handleInteraction, { once: true });
    window.addEventListener("keydown", handleInteraction, { once: true });

    return () => {
      clearTimeout(autoTimeout);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, [handleSkip]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed inset-0 z-[100] overflow-hidden bg-navy"
        >
          {/* Simple gradient background */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at center, rgba(212, 165, 36, 0.1) 0%, transparent 50%)",
            }}
          />

          {/* Main content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* Logo with glow */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Glow behind logo */}
              <div
                className="absolute inset-0 blur-3xl"
                style={{
                  background: "radial-gradient(circle, rgba(212, 165, 36, 0.3) 0%, transparent 70%)",
                  transform: "scale(2)",
                }}
              />

              {/* Logo - using Next.js Image for optimization */}
              <Image
                src="/logos/apply-wise-logo.png"
                alt="Apply Wise Financial"
                width={288}
                height={230}
                priority
                className="relative h-20 sm:h-28 md:h-36 w-auto"
                style={{
                  filter: "drop-shadow(0 0 20px rgba(212, 165, 36, 0.4))",
                }}
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="mt-6 text-white/60 text-sm md:text-base tracking-[0.25em] uppercase font-light"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Apply Smarter, Move Sooner
            </motion.p>

            {/* Loading bar */}
            <motion.div
              className="mt-10 w-24 h-0.5 bg-white/10 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-gold/50 via-gold to-gold/50 rounded-full"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.2,
                  repeat: 2,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Skip hint - shows immediately */}
            <motion.p
              className="absolute bottom-12 text-white/30 text-xs tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Tap anywhere to continue
            </motion.p>
          </div>

          {/* Corner accents */}
          <div className="absolute top-6 left-6 w-12 h-12 border-l border-t border-gold/20" />
          <div className="absolute top-6 right-6 w-12 h-12 border-r border-t border-gold/20" />
          <div className="absolute bottom-6 left-6 w-12 h-12 border-l border-b border-gold/20" />
          <div className="absolute bottom-6 right-6 w-12 h-12 border-r border-b border-gold/20" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
