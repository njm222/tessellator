import * as React from "react";

import { IconButton } from "../../buttons/icon-button/IconButton";
import { ShuffleIcon } from "../../icons";

export const ShuffleButton = ({
  onClick,
  isShuffle = false,
  title = "shuffle",
}: {
  onClick: () => void;
  isShuffle?: boolean;
  title?: string;
}) => {
  return (
    <IconButton
      icon={<ShuffleIcon active={isShuffle} />}
      onClick={onClick}
      title={title}
    />
  );
};
