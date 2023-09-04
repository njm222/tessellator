import { getDefaultOptions, spotifyClient } from "../spotifyClient";
import { handleError } from "../utils";

export type StartPlaybackOptions = {
  uris?: string[];
};
export async function startPlayback(
  accessToken: string,
  options?: StartPlaybackOptions
) {
  try {
    const { data } = await spotifyClient.put(
      "/me/player/play",
      options,
      getDefaultOptions(accessToken)
    );
    return data;
  } catch (err: unknown) {
    handleError(err);
  }
}

export async function pausePlayback(accessToken: string) {
  try {
    const { data } = await spotifyClient.put(
      "/me/player/pause",
      null,
      getDefaultOptions(accessToken)
    );
    return data;
  } catch (err: unknown) {
    handleError(err);
  }
}

export async function skipToPrevious(accessToken: string) {
  try {
    const { data } = await spotifyClient.post(
      "/me/player/previous",
      null,
      getDefaultOptions(accessToken)
    );
    return data;
  } catch (err: unknown) {
    handleError(err);
  }
}

export async function skipToNext(accessToken: string) {
  try {
    const { data } = await spotifyClient.post(
      "/me/player/next",
      null,
      getDefaultOptions(accessToken)
    );
    return data;
  } catch (err: unknown) {
    handleError(err);
  }
}

export async function shufflePlayback(accessToken: string, shuffle: boolean) {
  try {
    const { data } = await spotifyClient.put(
      `/me/player/shuffle?state=${shuffle}`,
      null,
      getDefaultOptions(accessToken)
    );
    return data;
  } catch (err: unknown) {
    handleError(err);
  }
}

export async function seekToPosition(accessToken: string, position: number) {
  try {
    const { data } = await spotifyClient.put(
      `/me/player/seek?position_ms=${Math.round(position)}`,
      null,
      getDefaultOptions(accessToken)
    );
    return data;
  } catch (err: unknown) {
    handleError(err);
  }
}

export async function transferMyPlayback(
  accessToken: string,
  deviceId: string,
  play?: boolean
) {
  try {
    const { data } = await spotifyClient.put(
      "/me/player",
      { device_ids: [deviceId], play },
      getDefaultOptions(accessToken)
    );
    return data;
  } catch (err: unknown) {
    handleError(err);
  }
}
