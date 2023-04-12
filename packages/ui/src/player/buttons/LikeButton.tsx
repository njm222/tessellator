import * as React from "react";

import { IconButton } from "../../icon-button/IconButton";
import { HeartIcon } from "../../icons/HeartIcon";

export const LikeButton = ({
  onClick,
  title = "like-track",
}: {
  onClick: () => void;
  title?: string;
}) => {
  return <IconButton icon={<HeartIcon />} onClick={onClick} title={title} />;
};
