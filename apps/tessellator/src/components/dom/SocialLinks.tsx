import React from "react";
import { GithubIcon, InstagramIcon } from "ui";
import { IconButton } from "ui";

export default function SocialLinks() {
  return (
    <div className="socialLinks">
      <IconButton
        title="github"
        onClick={() =>
          window.open("https://github.com/njm222/tessellator", "_blank")
        }
        icon={<GithubIcon />}
      />
      <IconButton
        title="instagram"
        onClick={() =>
          window.open("https://www.instagram.com/tessellator_space", "_blank")
        }
        icon={<InstagramIcon />}
      />
    </div>
  );
}
