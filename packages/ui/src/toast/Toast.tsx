import { ReactNode, useState } from "react";

import { useTimeout } from "../hooks/useTimeout";

export type ToastProps = {
  autoHideDuration?: number;
  resumeHideDuration?: number;
  persistent?: boolean;
  close: () => void;
  children: ReactNode;
  variant?: string;
};

export const Toast = ({
  autoHideDuration = 5000,
  resumeHideDuration = 3000,
  variant = "",
  close,
  persistent = false,
  children,
}: ToastProps) => {
  const [duration, setDuration] = useState(autoHideDuration);
  const [mouseOver, setMouseOver] = useState(false);

  const handleMouseEnter = () => {
    setMouseOver(true);
    setDuration(0);
  };
  const handleMouseLeave = () => {
    setMouseOver(false);
    setDuration(resumeHideDuration);
  };

  useTimeout(() => {
    if (!persistent && !mouseOver) close();
  }, duration);

  return (
    <div
      className={`toast text-sm ${variant}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="toast-text">{children}</div>
      <div>
        <button className="toast-close-btn" onClick={close}>
          x
        </button>
      </div>
    </div>
  );
};
