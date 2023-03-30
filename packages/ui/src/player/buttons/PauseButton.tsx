import * as React from "react";

import { IconButton } from "../../icon-button/IconButton";
import { PauseIcon } from "../../icons/PauseIcon";

export const PauseButton = ({
  onClick,
  title = "pause-track",
}: {
  onClick: () => void;
  title?: string;
}) => {
  return <IconButton icon={<PauseIcon />} onClick={onClick} title={title} />;
};
