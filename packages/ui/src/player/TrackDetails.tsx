import React from "react";

export function TrackDetails({
  trackName,
  trackArtists,
}: {
  trackName: string;
  trackArtists: { name: string }[];
}) {
  return (
    <div className="trackDetails">
      <div className="trackName" title="track-name">
        {trackName}
      </div>
      <div className="trackArtists" title="track-artists">
        {trackArtists.map(({ name }) => name).join(", ")}
      </div>
    </div>
  );
}
