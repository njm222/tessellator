import React, { ReactNode } from "react";
import Script from "next/script";

import { AuthenticatedLayout } from "../../components/layout/AuthenticatedLayout";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <AuthenticatedLayout>{children}</AuthenticatedLayout>
      <Script id="spotify-sdk" src="https://sdk.scdn.co/spotify-player.js" />
    </>
  );
}
