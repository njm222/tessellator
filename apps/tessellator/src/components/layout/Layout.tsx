"use client";

import React, { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Loader, ToastProvider } from "@tessellator/ui";
import dynamic from "next/dynamic";

import { AuthProvider } from "../../utils/authContext";

import { DefaultLayoutProps } from "./DefaultLayout";

const DefaultLayout = dynamic<DefaultLayoutProps>(
  () => import("./DefaultLayout").then((mod) => mod.DefaultLayout),
  {
    ssr: false,
    loading: () => <Loader dotVariant={3} />,
  }
);

export const Layout = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <AuthProvider>
          <DefaultLayout>{children}</DefaultLayout>
        </AuthProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
};
