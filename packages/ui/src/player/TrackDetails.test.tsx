import { render } from "@testing-library/react";

import { TrackDetails } from "./TrackDetails";

describe("TrackDetails", () => {
  it("renders without crashing ", () => {
    const trackName = "trackName";
    const trackArtists = [{ name: "artist1" }];
    const { getByTitle } = render(
      <TrackDetails trackArtists={trackArtists} trackName={trackName} />
    );

    expect(getByTitle("track-name").innerHTML).toEqual(trackName);
    expect(getByTitle("track-artists").innerHTML).toEqual("artist1");
  });
  it("should concatenate artists ", () => {
    const trackName = "trackName";
    const trackArtists = [{ name: "artist1" }, { name: "artist2" }];
    const { getByTitle } = render(
      <TrackDetails trackArtists={trackArtists} trackName={trackName} />
    );

    expect(getByTitle("track-name").innerHTML).toEqual(trackName);
    expect(getByTitle("track-artists").innerHTML).toEqual("artist1, artist2");
  });
});
