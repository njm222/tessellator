import React, { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { Tomorrow } from "next/font/google";

import { Layout } from "../components/layout/Layout";

import "./global.css";

export const metadata = {
  title: "Tessellator",
  description: "A | free to use | real-time | 3-D | music visualizer.",
};

const tomorrow = Tomorrow({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className={tomorrow.className}>
        <Layout>{children}</Layout>
        <Analytics />
      </body>
    </html>
  );
}
