import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClientBody } from "./ClientBody";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const siteUrl = "https://www.apply-wise.co.uk";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0B1F3A",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Apply Wise Financial | Free Online Mortgage Broker UK",
    template: "%s | Apply Wise Financial",
  },
  description:
    "Expert mortgage advice from a whole-of-market broker. Access deals from 90+ UK lenders. Free remortgage and product transfer service. FCA regulated.",
  keywords: [
    "mortgage broker",
    "online mortgage broker",
    "free mortgage advice",
    "first time buyer mortgage",
    "remortgage",
    "mortgage calculator",
    "buy to let mortgage",
    "mortgage in principle",
    "UK mortgage broker",
    "FCA regulated mortgage broker",
    "whole of market mortgage",
    "best mortgage rates UK",
  ],
  authors: [{ name: "Apply Wise Financial" }],
  creator: "Apply Wise Financial",
  publisher: "Apply Wise Financial",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: "Apply Wise Financial",
    title: "Apply Wise Financial | Free Online Mortgage Broker UK",
    description:
      "Expert mortgage advice from a whole-of-market broker. Access deals from 90+ UK lenders. Free remortgage and product transfer service.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Apply Wise Financial - Apply Smarter, Move Sooner",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apply Wise Financial | Free Online Mortgage Broker UK",
    description:
      "Expert mortgage advice from a whole-of-market broker. Access deals from 90+ UK lenders. Free remortgage service.",
    images: ["/og-image.png"],
    creator: "@applywisefinancial",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
  category: "Finance",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "Apply Wise Financial",
  description:
    "Free online mortgage broker providing expert advice and access to 90+ UK lenders",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  image: `${siteUrl}/og-image.png`,
  telephone: "+44 1992 535555",
  address: {
    "@type": "PostalAddress",
    streetAddress: "4 Fiddlers Hamlet",
    addressLocality: "Epping",
    postalCode: "CM16 7PY",
    addressCountry: "GB",
  },
  areaServed: {
    "@type": "Country",
    name: "United Kingdom",
  },
  priceRange: "Free",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "10:00",
      closes: "16:00",
    },
  ],
  sameAs: [],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Mortgage Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "First Time Buyer Mortgages",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Remortgage",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Buy to Let Mortgages",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Mortgage in Principle",
        },
      },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "847",
    bestRating: "5",
    worstRating: "1",
  },
};

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        {/* Preload critical hero image for faster LCP */}
        <link
          rel="preload"
          href="/logos/apply-wise-logo.png"
          as="image"
          type="image/png"
          fetchPriority="high"
        />

        {/* DNS prefetch for analytics */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Favicon */}
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {GA_MEASUREMENT_ID && <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />}
      </head>
      <ClientBody>{children}</ClientBody>
    </html>
  );
}
