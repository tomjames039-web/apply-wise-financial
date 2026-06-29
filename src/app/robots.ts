import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.apply-wise.co.uk";

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
