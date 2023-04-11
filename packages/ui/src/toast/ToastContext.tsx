import { createContext } from "react";

export type ToastOptions = {
  persistent: boolean;
  autoHideDuration: number;
  resumeHideDuration: number;
  variant: string;
};

export const ToastContext = createContext({
  open: (content: string, options?: ToastOptions) => {},
  close: (id: string) => {},
});
