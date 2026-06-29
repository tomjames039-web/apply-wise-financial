import type { Metadata } from "next";
import { BlogContent } from "./BlogContent";

export const metadata: Metadata = {
  title: "Mortgage Blog | Expert Advice & Insights",
  description:
    "Read expert mortgage advice, tips for first-time buyers, remortgage guides, and property market insights from Apply Wise Financial's experienced brokers.",
  keywords: [
    "mortgage blog",
    "mortgage advice",
    "first time buyer tips",
    "remortgage guide",
    "property market UK",
    "mortgage rates",
    "buy to let advice",
    "mortgage broker blog",
  ],
  openGraph: {
    title: "Mortgage Blog | Apply Wise Financial",
    description:
      "Expert mortgage advice, tips and insights to help you make informed decisions about your property journey.",
    type: "website",
    url: "https://www.apply-wise.co.uk/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mortgage Blog | Apply Wise Financial",
    description:
      "Expert mortgage advice, tips and insights from Apply Wise Financial.",
  },
  alternates: {
    canonical: "https://www.apply-wise.co.uk/blog",
  },
};

export default function BlogPage() {
  return <BlogContent />;
}
