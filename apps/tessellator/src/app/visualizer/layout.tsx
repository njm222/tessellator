import React, { ReactNode } from "react";

import { AuthenticatedLayout } from "../../components/layout/AuthenticatedLayout";

export default function Layout({ children }: { children: ReactNode }) {
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
}
