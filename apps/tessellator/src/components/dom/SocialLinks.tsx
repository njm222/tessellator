import React from "react";
import { GithubIcon, IconButton, InstagramIcon } from "ui";
import { openNewTabLink } from "../../helpers/global";

export default function SocialLinks() {
  return (
    <div className="socialLinks">
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
