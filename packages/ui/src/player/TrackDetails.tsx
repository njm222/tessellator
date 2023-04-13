import React from "react";

import { NewTabLink } from "../new-tab/NewTabLink";

export function TrackDetails({
  trackName,
  trackLink,
  trackArtists,
}: {
  trackName: string;
  trackLink: string;
  trackArtists: { name: string; link: string }[];
}) {
  return (
    <div className="trackDetails">
      <NewTabLink
        className="text-sm trackName"
        href={trackLink}
        title="track-name"
      >
        {trackName}
      </NewTabLink>
      <div className="trackArtists">
        {trackArtists.map(({ name, link }, index) => (
          <NewTabLink
            className="text-xs trackArtist"
            href={link}
            key={link}
            title="track-artist"
          >
            {name + (index !== trackArtists.length - 1 ? "," : "")}
          </NewTabLink>
        ))}
      </div>
    </div>
  );
}
