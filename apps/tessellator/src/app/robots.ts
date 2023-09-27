import { MetadataRoute } from "next";

import { environment } from "../config/environment";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/visualizer", "/about"],
    },
    sitemap: `${environment.frontendUrl}/sitemap.xml`,
    host: environment.frontendUrl,
  };
}
