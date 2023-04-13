import * as React from "react";

import { IconButton } from "../../icon-button/IconButton";
import { HeartIcon } from "../../icons/HeartIcon";

export const SaveButton = ({
  onClick,
  title = "save-track",
}: {
  onClick: () => void;
  title?: string;
}) => {
  return <IconButton icon={<HeartIcon />} onClick={onClick} title={title} />;
};
