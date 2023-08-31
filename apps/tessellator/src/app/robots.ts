import { MetadataRoute } from "next";

import { environment } from "../environments/environment";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/visualizer"],
    },
    sitemap: `${environment.frontendUrl}/sitemap.xml`,
    host: environment.frontendUrl,
  };
}
