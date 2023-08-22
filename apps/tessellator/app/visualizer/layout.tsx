import React, { ReactNode } from "react";

import { AuthenticatedLayout } from "../../src/components/layout/AuthenticatedLayout";
import { DefaultLayout } from "../../src/components/layout/DefaultLayout";
import { Layout } from "../../src/components/layout/Layout";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <Layout>
      <AuthenticatedLayout>
        <DefaultLayout>{children}</DefaultLayout>
      </AuthenticatedLayout>
    </Layout>
  );
}
