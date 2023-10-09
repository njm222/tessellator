import React from "react";
import { GithubIcon, IconButton, InstagramIcon } from "ui";

import { openNewTabLink } from "../../helpers/global";

import { useMouseActivity } from "./controls/mouseActivityContext";

export default function SocialLinks() {
  const { mouseActive } = useMouseActivity();
  return (
    <div className={`socialLinks ${mouseActive ? "" : "hidden"}`}>
      <IconButton
        icon={<GithubIcon />}
        onClick={() => openNewTabLink("https://github.com/njm222/tessellator")}
        title="github"
      />
      <IconButton
        icon={<InstagramIcon />}
        onClick={() =>
          openNewTabLink("https://www.instagram.com/tessellator_space")
        }
        title="instagram"
      />
    </div>
  );
}
