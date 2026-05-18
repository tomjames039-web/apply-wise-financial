"use client";

import Script from "next/script";

interface GoogleAnalyticsProps {
  measurementId: string;
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  if (!measurementId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}

// Type for gtag function
type GtagFn = (cmd: string, event: string, params?: Record<string, unknown>) => void;

// Helper to get gtag function
const getGtag = (): GtagFn | undefined => {
  if (typeof window !== "undefined") {
    return (window as unknown as { gtag?: GtagFn }).gtag;
  }
  return undefined;
};

// Custom event tracking helper
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  const gtag = getGtag();
  if (gtag) {
    gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

// Page view tracking helper
export function trackPageView(url: string) {
  const gtag = getGtag();
  if (gtag) {
    gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "", {
      page_path: url,
    });
  }
}

// Conversion tracking helper
export function trackConversion(conversionId: string, value?: number) {
  const gtag = getGtag();
  if (gtag) {
    gtag("event", "conversion", {
      send_to: conversionId,
      value: value,
      currency: "GBP",
    });
  }
}

// Form submission tracking
export function trackFormSubmission(formName: string) {
  trackEvent("form_submission", "engagement", formName);
}

// CTA click tracking
export function trackCTAClick(ctaName: string, location?: string) {
  trackEvent("cta_click", "engagement", `${ctaName}${location ? ` - ${location}` : ""}`);
}

// Phone call tracking
export function trackPhoneClick() {
  trackEvent("phone_click", "contact", "01992 535 555");
}

// Email click tracking
export function trackEmailClick() {
  trackEvent("email_click", "contact", "info@apply-wise.co.uk");
}
