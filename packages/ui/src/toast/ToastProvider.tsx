import { ReactNode, useMemo, useState } from "react";

import { Toast } from "./Toast";
import { ToastContext, ToastOptions } from "./ToastContext";

// Create a random ID
const generateUEID = () => {
  let first = (Math.random() * 46656).toString() || "0";
  let second = (Math.random() * 46656).toString() || "0";
  first = ("000" + first.toString()).slice(-3);
  second = ("000" + second.toString()).slice(-3);

  return first + second;
};

type CreatedToast = {
  content: string;
  options: ToastOptions;
  id: string;
};

const createToast = (content: string, options: ToastOptions): CreatedToast => ({
  content,
  options,
  id: generateUEID(),
});

const commonDefaultOptions = {
  autoHideDuration: 5000,
  resumeHideDuration: 3000,
};

const toastDefaultOptions = {
  ...commonDefaultOptions,
  persistent: false,
  variant: "error",
};

const providerDefaultOptions = {
  ...commonDefaultOptions,
  maxCount: 5,
  position: {
    vertical: "top",
    horizontal: "right",
  },
};

export const ToastProvider = ({
  children,
  ...rest
}: {
  children: ReactNode;
}) => {
  const [toasts, setToasts] = useState<CreatedToast[]>([]);

  // Separate provider options from toast options
  const { maxCount, position, ...toastOptions } = {
    ...providerDefaultOptions,
    ...rest,
  };

  const open = (content: string, options = {}) => {
    if (!content) return null;

    const mergedToastOptions = {
      ...toastDefaultOptions,
      ...toastOptions,
      ...options,
    };
    const newToast = createToast(content, mergedToastOptions);
    setToasts((currentToasts) => [...currentToasts, newToast]);

    return newToast.id;
  };

  const close = (id: string) =>
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );

  const contextValue = useMemo(
    () => ({ open, close }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      <div
        className={`toasts-wrapper toasts-wrapper--${providerDefaultOptions.position.vertical} toasts-wrapper--${providerDefaultOptions.position.horizontal}`}
      >
        {toasts.map((toast) => (
          <Toast
            close={() => close(toast.id)}
            key={toast.id}
            {...toast.options}
          >
            {toast.content}
          </Toast>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
