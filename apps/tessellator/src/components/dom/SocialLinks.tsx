import React from "react";
import { GithubIcon, IconButton, InstagramIcon  } from "ui";

export default function SocialLinks() {
  return (
    <div className="socialLinks">
      <IconButton
        icon={<GithubIcon />}
        onClick={() =>
          window.open("https://github.com/njm222/tessellator", "_blank")
        }
        title="github"
      />
      <IconButton
        icon={<InstagramIcon />}
        onClick={() =>
          window.open("https://www.instagram.com/tessellator_space", "_blank")
        }
        title="instagram"
      />
    </div>
  );
}
