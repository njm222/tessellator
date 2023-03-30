import * as React from "react";

import { IconButton } from "../../icon-button/IconButton";
import { PlayIcon } from "../../icons/PlayIcon";

export const PlayButton = ({
  onClick,
  title = "play-track",
}: {
  onClick: () => void;
  title?: string;
}) => {
  return <IconButton icon={<PlayIcon />} onClick={onClick} title={title} />;
};
