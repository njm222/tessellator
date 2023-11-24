import React, { ReactNode } from "react";

import { AnalyserLayout } from "../../components/layout/AnalyserLayout";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <AnalyserLayout>{children}</AnalyserLayout>
    </>
  );
}
