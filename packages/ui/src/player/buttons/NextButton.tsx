import * as React from "react";

import { IconButton } from "../../icon-button/IconButton";
import { NextIcon } from "../../icons/NextIcon";

export const NextButton = ({
  onClick,
  title = "next-track",
}: {
  onClick: () => void;
  title?: string;
}) => {
  return <IconButton icon={<NextIcon />} onClick={onClick} title={title} />;
};
