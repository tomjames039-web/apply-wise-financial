"use client";

import { useState } from "react";
import Link from "next/link";

const footerLinks = {
  services: [
    { label: "First Time Buyer", href: "/first-time-buyer" },
    { label: "Remortgage", href: "/remortgage" },
    { label: "Product Transfer", href: "/product-transfer" },
    { label: "Buy To Let", href: "/buy-to-let" },
    { label: "Bad Credit", href: "/bad-credit" },
    { label: "Protection Insurance", href: "/protection" },
    { label: "Conveyancing", href: "/conveyancing" },
  ],
  resources: [
    { label: "Calculator", href: "/calculator" },
    { label: "Check Your Credit", href: "/credit-check" },
    { label: "Employer Benefits", href: "/business" },
    { label: "Guides", href: "/guides" },
    { label: "Locations", href: "/locations" },
    { label: "About Us", href: "/about" },
  ],

  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Cookies", href: "/cookies" },
  ],
};

export function Footer() {
  const [showFullDisclaimer, setShowFullDisclaimer] = useState(false);

  return (
    <footer className="bg-pearl">
      {/* Subtle top border */}
      <div className="h-px bg-navy/10" />

      {/* Main footer content */}
      <div className="container mx-auto px-4 md:px-6 py-10 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Logo and tagline */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <img
                src="/logos/apply-wise-logo.png"
                alt="Apply Wise"
                loading="lazy"
                decoding="async"
                width={160}
                height={64}
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-navy/50 text-sm leading-relaxed max-w-xs mb-4">
              Whole-of-market mortgage broker. Free service for product switches with your current lender.
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <img
                  src="/logos/fca.png"
                  alt="FCA Regulated"
                  loading="lazy"
                  decoding="async"
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                />
                <span className="text-[10px] text-navy/50 font-medium">Regulated</span>
              </div>
              <span className="text-navy/20">•</span>
              <span className="text-[10px] text-navy/40 uppercase tracking-wider">90+ Lenders</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold text-navy uppercase tracking-wider mb-3">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-navy/50 hover:text-gold transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold text-navy uppercase tracking-wider mb-3">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-navy/50 hover:text-gold transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="text-xs font-semibold text-navy uppercase tracking-wider mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-navy/50 mb-4">
              <li>
                <a href="tel:01992535555" className="hover:text-gold transition-colors">
                  01992 535 555
                </a>
              </li>
              <li>
                <a href="mailto:info@apply-wise.co.uk" className="hover:text-gold transition-colors text-xs break-all">
                  info@apply-wise.co.uk
                </a>
              </li>
            </ul>
            <h4 className="text-xs font-semibold text-navy uppercase tracking-wider mb-3">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-navy/50 hover:text-gold transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Regulatory Footer - Compact */}
      <div className="border-t border-navy/10 bg-navy/[0.02]">
        <div className="container mx-auto px-4 md:px-6 py-4">
          {/* Key warning - always visible */}
          <p className="text-[11px] text-navy/50 mb-3">
            <strong className="text-navy/60">Your home may be repossessed</strong> if you do not keep up repayments on your mortgage.
          </p>

          {/* Expandable disclaimer */}
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-navy/40">
              Apply Wise Financial Ltd is an Appointed Representative of Scott & Goose LLP (FRN: 661183)
            </p>
            <button
              onClick={() => setShowFullDisclaimer(!showFullDisclaimer)}
              className="flex items-center gap-1 text-[11px] text-gold hover:text-gold/80 transition-colors"
            >
              {showFullDisclaimer ? "Less" : "More"} info
              <svg
                className={`w-3 h-3 transition-transform ${showFullDisclaimer ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {showFullDisclaimer && (
            <div className="mt-4 pt-4 border-t border-navy/10 text-[11px] text-navy/40 space-y-2">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p><strong className="text-navy/50">Apply Wise Financial Limited</strong></p>
                  <p>Registered Office: 4 Fiddlers Hamlet, Epping, Essex, CM16 7PY</p>
                  <p>Registered in England: 16846104</p>
                </div>
                <div>
                  <p><strong className="text-navy/50">Scott & Goose LLP</strong></p>
                  <p>Registered Office: Brickfield House, High Road, Thornwood, Epping, Essex, CM16 6TH</p>
                  <p>Registered in England: OC395921</p>
                </div>
              </div>
              <p className="pt-2">
                Equity Release may affect the size of your estate and your entitlement to means-tested benefits.
                Calls may be recorded for training and monitoring purposes.
              </p>
              <p>
                <strong className="text-navy/50">Complaints:</strong> Ian Scott, Scott & Goose LLP, Brickfield House, High Road, Thornwood, Epping, Essex, CM16 6TH.
                Tel: <a href="tel:01992563644" className="text-gold hover:underline">01992 563644</a>
              </p>
              <p>
                Financial Ombudsman: <a href="https://www.financial-ombudsman.org.uk" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">www.financial-ombudsman.org.uk</a>
              </p>
            </div>
          )}

          {/* Copyright */}
          <p className="text-[10px] text-navy/30 mt-4 pt-3 border-t border-navy/5">
            © {new Date().getFullYear()} Apply Wise Financial Limited. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
