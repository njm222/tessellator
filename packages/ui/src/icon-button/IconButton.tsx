import { MouseEventHandler, ReactNode, useState } from "react";

export const IconButton = ({
  title,
  icon,
  onClick,
}: {
  title: string;
  icon: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  const [hover, setHover] = useState(false);

  return (
    <button
      className={`iconButton ${hover ? "hover" : ""}`}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      title={title}
    >
      {icon}
    </button>
  );
};
