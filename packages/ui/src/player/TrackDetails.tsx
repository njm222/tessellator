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
      <div className="trackName">{trackName}</div>
      <div className="trackArtists">
        {trackArtists.map(({ name }) => name).join(", ")}
      </div>
    </div>
  );
}
