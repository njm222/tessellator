import { MetadataRoute } from "next";

import { environment } from "../config/environment";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${environment.frontendUrl}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${environment.frontendUrl}/visualizer`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${environment.frontendUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
