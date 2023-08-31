import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tessellator - A free to use real-time 3-D music visualizer",
    short_name: "Tessellator",
    description: "A | free to use | real-time | 3-D | music visualizer.",
    start_url: "/",
    display: "standalone",
    background_color: "#000",
    theme_color: "#fff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "32x32 16x16",
        type: "image/x-icon",
      },
    ],
  };
}
