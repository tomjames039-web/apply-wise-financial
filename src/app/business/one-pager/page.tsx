"use client";

import { useEffect } from "react";

export default function BusinessOnePager() {
  // Auto-trigger print dialog on load (optional)
  useEffect(() => {
    // Check if user came from download button
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("print") === "true") {
      setTimeout(() => window.print(), 500);
    }
  }, []);

  return (
    <>
      {/* Print-specific styles */}
      <style jsx global>{`
        @media print {
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print {
            display: none !important;
          }
          .print-page {
            page-break-after: avoid;
          }
        }
        @page {
          size: A4;
          margin: 0;
        }
      `}</style>

      {/* Download/Print Controls - Hidden when printing */}
      <div className="no-print fixed top-0 left-0 right-0 bg-navy py-4 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <a href="/business" className="text-white/70 hover:text-white text-sm">
            ← Back to enquiry form
          </a>
          <div className="flex gap-3">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-gold text-navy font-semibold rounded text-sm hover:bg-gold-light transition-colors"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* One-Pager Content */}
      <div className="print-page min-h-screen bg-white pt-20 print:pt-0">
        <div className="max-w-[210mm] mx-auto bg-white print:shadow-none shadow-lg">
          {/* Header */}
          <div className="bg-[#0B1F3A] text-white px-10 py-8 print:px-8 print:py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-[#D4A524] print:text-2xl">Apply Wise</h1>
                <p className="text-white/80 mt-1">Employee Mortgage Benefits</p>
              </div>
              <div className="text-right text-sm">
                <p className="text-[#D4A524] font-semibold">FCA Regulated</p>
                <p className="text-white/60">Whole of Market</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-10 py-8 print:px-8 print:py-6">
            {/* Headline */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#0B1F3A] mb-3 print:text-xl">
                Help Your Employees Save Money on Their Mortgage
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                A simple, no-cost benefit that delivers real financial value to your team.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-[#f5f3ef] p-5 rounded-lg print:p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#D4A524] rounded-full flex items-center justify-center flex-shrink-0 print:w-6 print:h-6">
                    <span className="text-white font-bold text-sm">£</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0B1F3A] mb-1">No Cost to You</h3>
                    <p className="text-sm text-gray-600">
                      This benefit costs your business nothing to offer.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#f5f3ef] p-5 rounded-lg print:p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#D4A524] rounded-full flex items-center justify-center flex-shrink-0 print:w-6 print:h-6">
                    <span className="text-white font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0B1F3A] mb-1">Free Reviews</h3>
                    <p className="text-sm text-gray-600">
                      Staff receive complimentary mortgage health checks.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#f5f3ef] p-5 rounded-lg print:p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#D4A524] rounded-full flex items-center justify-center flex-shrink-0 print:w-6 print:h-6">
                    <span className="text-white font-bold text-sm">↓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0B1F3A] mb-1">Real Savings</h3>
                    <p className="text-sm text-gray-600">
                      Employees could save £100s per month on repayments.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#f5f3ef] p-5 rounded-lg print:p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#D4A524] rounded-full flex items-center justify-center flex-shrink-0 print:w-6 print:h-6">
                    <span className="text-white font-bold text-sm">⚡</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0B1F3A] mb-1">Simple Setup</h3>
                    <p className="text-sm text-gray-600">
                      Takes just minutes to introduce to your team.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-[#0B1F3A] mb-4 text-center">How It Works</h3>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 text-center">
                  <div className="w-10 h-10 bg-[#0B1F3A] text-[#D4A524] rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                    1
                  </div>
                  <p className="text-sm text-gray-700">
                    <strong>You introduce us</strong> to your team via email or internal comms
                  </p>
                </div>
                <div className="text-[#D4A524] pt-4 print:hidden">→</div>
                <div className="flex-1 text-center">
                  <div className="w-10 h-10 bg-[#0B1F3A] text-[#D4A524] rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                    2
                  </div>
                  <p className="text-sm text-gray-700">
                    <strong>We offer free reviews</strong> to any staff who are interested
                  </p>
                </div>
                <div className="text-[#D4A524] pt-4 print:hidden">→</div>
                <div className="flex-1 text-center">
                  <div className="w-10 h-10 bg-[#0B1F3A] text-[#D4A524] rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                    3
                  </div>
                  <p className="text-sm text-gray-700">
                    <strong>They decide</strong> if they want to proceed - no pressure
                  </p>
                </div>
              </div>
            </div>

            {/* Why Most People Overpay */}
            <div className="bg-[#0B1F3A] text-white p-6 rounded-lg mb-8 print:p-5">
              <h3 className="text-lg font-bold text-[#D4A524] mb-3">Why Most People Overpay</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                When mortgage deals end, many homeowners automatically move to their lender's
                Standard Variable Rate — often 2-3% higher than available deals. Most people
                don't realise they're overpaying because nobody tells them. A quick review can
                reveal significant savings, putting money back in your employees' pockets.
              </p>
            </div>

            {/* About Apply Wise */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-bold text-[#0B1F3A] mb-3">Why Apply Wise</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="text-[#D4A524]">✓</span>
                    Whole of market access (90+ lenders)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#D4A524]">✓</span>
                    Not tied to any single lender
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#D4A524]">✓</span>
                    Honest, straightforward advice
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#D4A524]">✓</span>
                    Local and accessible team
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#D4A524]">✓</span>
                    20+ years industry experience
                  </li>
                </ul>
              </div>
              <div className="bg-[#f5f3ef] p-5 rounded-lg print:p-4">
                <h3 className="text-lg font-bold text-[#0B1F3A] mb-3">Get Started</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Arrange a quick call to discuss how we can help your team.
                </p>
                <div className="space-y-2">
                  <p className="flex items-center gap-2 text-sm">
                    <span className="text-[#D4A524]">📞</span>
                    <strong>01992 535 555</strong>
                  </p>
                  <p className="flex items-center gap-2 text-sm">
                    <span className="text-[#D4A524]">✉</span>
                    <strong>info@apply-wise.co.uk</strong>
                  </p>
                  <p className="flex items-center gap-2 text-sm">
                    <span className="text-[#D4A524]">🌐</span>
                    <strong>apply-wise.co.uk/business</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-[#f5f3ef] px-10 py-4 text-center text-xs text-gray-500 print:px-8">
            <p>
              Apply Wise Financial Ltd is an Appointed Representative of Scott & Goose LLP (FRN: 661183).
              Your home may be repossessed if you do not keep up repayments on your mortgage.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
