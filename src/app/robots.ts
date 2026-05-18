import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://same-eoepuy05oil-latest.netlify.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/business/thank-you"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
