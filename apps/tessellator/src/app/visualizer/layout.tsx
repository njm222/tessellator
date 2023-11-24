import React, { ReactNode } from "react";
import Script from "next/script";

import { SpotifyLayout } from "../../components/layout/SpotifyLayout";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <SpotifyLayout>{children}</SpotifyLayout>
      <Script id="spotify-sdk" src="https://sdk.scdn.co/spotify-player.js" />
    </>
  );
}
