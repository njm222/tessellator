import * as React from "react";

import { IconButton } from "../../buttons/icon-button/IconButton";
import { PrevIcon } from "../../icons/PrevIcon";

export const PrevButton = ({
  onClick,
  title = "prev-track",
}: {
  onClick: () => void;
  title?: string;
}) => {
  return <IconButton icon={<PrevIcon />} onClick={onClick} title={title} />;
};
