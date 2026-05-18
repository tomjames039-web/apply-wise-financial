"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const mortgageLinks = [
  { href: "/first-time-buyer", label: "First Time Buyer" },
  { href: "/remortgage", label: "Remortgage" },
  { href: "/self-employed", label: "Self-Employed" },
  { href: "/bad-credit", label: "Bad Credit" },
  { href: "/buy-to-let", label: "Buy-to-Let" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mortgagesOpen, setMortgagesOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 animate-slide-down ${
        scrolled
          ? "bg-pearl shadow-sm"
          : "bg-pearl"
      }`}
    >
      <div className="container mx-auto flex h-24 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logos/apply-wise-logo.png"
            alt="Apply Wise"
            width={200}
            height={80}
            className="h-16 md:h-20 w-auto hover:scale-[1.02] transition-transform duration-200"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {/* Mortgages Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setMortgagesOpen(true)}
            onMouseLeave={() => setMortgagesOpen(false)}
          >
            <button className="flex items-center gap-1.5 text-sm font-medium text-navy/60 hover:text-navy transition-colors duration-200 tracking-wide">
              Mortgages
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${mortgagesOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div
              className={`absolute top-full left-0 pt-2 transition-all duration-150 ${
                mortgagesOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
              }`}
            >
              <div className="bg-white rounded-xl shadow-lg border border-navy/5 py-2 min-w-[200px]">
                {mortgageLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2.5 text-sm text-navy/70 hover:text-navy hover:bg-pearl transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Equity Release */}
          <Link
            href="/equity-release"
            className="text-sm font-medium text-navy/60 hover:text-navy transition-colors duration-200 tracking-wide"
          >
            Equity Release
          </Link>

          {/* Protection */}
          <Link
            href="/protection"
            className="text-sm font-medium text-navy/60 hover:text-navy transition-colors duration-200 tracking-wide"
          >
            Protection
          </Link>

          {/* Conveyancing */}
          <Link
            href="/conveyancing"
            className="text-sm font-medium text-navy/60 hover:text-navy transition-colors duration-200 tracking-wide"
          >
            Conveyancing
          </Link>

          {/* Calculators */}
          <Link
            href="/calculator"
            className="text-sm font-medium text-navy/60 hover:text-navy transition-colors duration-200 tracking-wide"
          >
            Calculators
          </Link>

          {/* Blog */}
          <Link
            href="/blog"
            className="text-sm font-medium text-navy/60 hover:text-navy transition-colors duration-200 tracking-wide"
          >
            Blog
          </Link>

          {/* Contact */}
          <Link
            href="/contact"
            className="text-sm font-medium text-navy/60 hover:text-navy transition-colors duration-200 tracking-wide"
          >
            Contact
          </Link>

          {/* Apply Now CTA */}
          <Link href="/apply">
            <button
              className="text-sm font-semibold text-gold hover:text-gold-dark tracking-wide uppercase transition-all duration-200 relative hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Apply Now
              <span
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold animate-pulse-width"
              />
            </button>
          </Link>
        </nav>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button
              className="h-10 w-10 flex items-center justify-center text-navy hover:text-gold transition-colors rounded-lg hover:bg-navy/5 active:scale-95"
            >
              <div className="flex flex-col gap-1.5 w-5">
                <span
                  className={`w-full h-0.5 bg-current rounded-full transition-all duration-200 ${
                    isOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-current rounded-full transition-opacity duration-200 ${
                    isOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-current rounded-full transition-all duration-200 ${
                    isOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
              <span className="sr-only">Toggle menu</span>
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-sm bg-pearl border-l border-navy/10 p-0">
            <nav className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="p-6 border-b border-navy/5">
                <Image
                  src="/logos/apply-wise-logo.png"
                  alt="Apply Wise"
                  width={160}
                  height={64}
                  className="h-16 w-auto"
                />
              </div>

              {/* Mobile Nav Links */}
              <div className="flex-1 py-4 overflow-y-auto">
                {/* Mortgages Submenu */}
                <div>
                  <button
                    onClick={() => setMobileSubmenuOpen(!mobileSubmenuOpen)}
                    className="flex items-center justify-between w-full text-lg font-medium text-navy/70 hover:text-navy hover:bg-navy/5 py-4 px-6 transition-all duration-200"
                  >
                    Mortgages
                    <svg
                      className={`w-4 h-4 text-navy/30 transition-transform ${mobileSubmenuOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden bg-white/50 transition-all duration-200 ${
                      mobileSubmenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    {mortgageLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block text-base text-navy/60 hover:text-navy py-3 pl-10 pr-6 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Other Links */}
                <Link
                  href="/equity-release"
                  className="flex items-center text-lg font-medium text-navy/70 hover:text-navy hover:bg-navy/5 py-4 px-6 transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Equity Release
                </Link>
                <Link
                  href="/protection"
                  className="flex items-center text-lg font-medium text-navy/70 hover:text-navy hover:bg-navy/5 py-4 px-6 transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Protection
                </Link>
                <Link
                  href="/conveyancing"
                  className="flex items-center text-lg font-medium text-navy/70 hover:text-navy hover:bg-navy/5 py-4 px-6 transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Conveyancing
                </Link>

                <Link
                  href="/calculator"
                  className="flex items-center text-lg font-medium text-navy/70 hover:text-navy hover:bg-navy/5 py-4 px-6 transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Calculators
                </Link>
                <Link
                  href="/blog"
                  className="flex items-center text-lg font-medium text-navy/70 hover:text-navy hover:bg-navy/5 py-4 px-6 transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center text-lg font-medium text-navy/70 hover:text-navy hover:bg-navy/5 py-4 px-6 transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
              </div>

              {/* Mobile CTA */}
              <div className="p-6 border-t border-navy/5 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <Link href="/apply" onClick={() => setIsOpen(false)}>
                  <button
                    className="w-full bg-gold text-navy font-semibold py-4 rounded-lg text-base uppercase tracking-wide hover:scale-[1.02] active:scale-[0.98] transition-transform"
                  >
                    Apply Now
                  </button>
                </Link>
                <p className="text-center text-xs text-navy/40 mt-4">
                  Free consultation with our experts
                </p>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
