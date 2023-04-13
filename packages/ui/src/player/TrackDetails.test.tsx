import { render } from "@testing-library/react";

import { TrackDetails } from "./TrackDetails";

describe("TrackDetails", () => {
  it("renders without crashing ", () => {
    const trackName = "trackName";
    const trackLink = "trackLink";
    const trackArtists = [{ name: "artist1", link: "link1" }];
    const { getByTitle } = render(
      <TrackDetails
        trackArtists={trackArtists}
        trackLink={trackLink}
        trackName={trackName}
      />
    );

    expect(getByTitle("track-name").innerHTML).toEqual(trackName);
    expect(getByTitle("track-artist").innerHTML).toEqual("artist1");
  });
  it("should concatenate artists ", () => {
    const trackName = "trackName";
    const trackLink = "trackLink";
    const trackArtists = [
      { name: "artist1", link: "link1" },
      { name: "artist2", link: "link2" },
    ];
    const { getAllByTitle, getByTitle } = render(
      <TrackDetails
        trackArtists={trackArtists}
        trackLink={trackLink}
        trackName={trackName}
      />
    );

    expect(getByTitle("track-name").innerHTML).toEqual(trackName);
    const [artist1, artist2] = getAllByTitle("track-artist");
    expect(artist1.innerHTML).toEqual("artist1,");
    expect(artist2.innerHTML).toEqual("artist2");
  });
});
