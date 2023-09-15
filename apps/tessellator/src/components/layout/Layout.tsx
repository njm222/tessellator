"use client";

import React, { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "ui";

import { AuthProvider } from "../../utils/authContext";
import { MouseActivityProvider } from "../dom/controls/mouseActivityContext";

export const Layout = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <AuthProvider>
          <MouseActivityProvider>{children}</MouseActivityProvider>
        </AuthProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
};
