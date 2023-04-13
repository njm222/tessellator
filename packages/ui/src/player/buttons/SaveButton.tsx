import * as React from "react";

import { IconButton } from "../../icon-button/IconButton";
import { FilledHeartIcon, HeartIcon } from "../../icons";

export const SaveButton = ({
  onClick,
  isSaved = false,
  title = "save-track",
}: {
  onClick: () => void;
  isSaved?: boolean;
  title?: string;
}) => {
  return (
    <IconButton
      icon={isSaved ? <FilledHeartIcon /> : <HeartIcon />}
      onClick={onClick}
      title={title}
    />
  );
};
