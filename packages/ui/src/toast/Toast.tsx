import { ReactNode, useState } from "react";

import { useTimeout } from "../hooks/useTimeout";

export type ToastProps = {
  autoHideDuration: number;
  resumeHideDuration: number;
  persistent: boolean;
  close: () => void;
  children: ReactNode;
  variant: string;
};

export const Toast = (props: ToastProps) => {
  const [duration, setDuration] = useState(props.autoHideDuration);
  const [mouseOver, setMouseOver] = useState(false);

  const handleMouseEnter = () => {
    setMouseOver(true);
    setDuration(0);
  };
  const handleMouseLeave = () => {
    setMouseOver(false);
    setDuration(props.resumeHideDuration);
  };

  useTimeout(() => {
    if (!props.persistent && !mouseOver) props.close();
  }, duration);

  return (
    <div
      className={`toast ${props.variant}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="toast__text">{props.children}</div>
      <div>
        <button className="toast__close-btn" onClick={props.close}>
          x
        </button>
      </div>
    </div>
  );
};
