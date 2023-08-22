import React, { ReactNode } from "react";
import { Tomorrow } from "next/font/google";

import { DefaultLayout } from "../src/components/layout/DefaultLayout";
import { Layout } from "../src/components/layout/Layout";

import "./global.css";

const tomorrow = Tomorrow({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <head />
      <body className={tomorrow.className}>
        <Layout>
          <DefaultLayout>{children}</DefaultLayout>
        </Layout>
      </body>
    </html>
  );
}
