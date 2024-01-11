"use client";

import React, { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "@tessellator/ui";

import { AuthProvider } from "../../utils/authContext";

import { DefaultLayout } from "./DefaultLayout";

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
