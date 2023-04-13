import { getDefaultOptions, spotifyClient } from "../spotifyClient";

export async function getTrackAudioAnalysis(
  accessToken: string,
  trackId: string
) {
  try {
    const { data } = await spotifyClient.get(
      `/audio-analysis/${trackId}`,
      getDefaultOptions(accessToken)
    );
    return data;
  } catch (err: any) {
    console.log(err);
    throw Error(err);
  }
}

export async function getTrackAudioFeatures(
  accessToken: string,
  trackId: string
) {
  try {
    const { data } = await spotifyClient.get(
      `/audio-features/${trackId}`,
      getDefaultOptions(accessToken)
    );
    return data;
  } catch (err: any) {
    console.log(err);
    throw Error(err);
  }
}

export async function saveTracks(accessToken: string, ids: string[]) {
  try {
    const { data } = await spotifyClient.put(
      `/me/tracks`,
      { ids },
      getDefaultOptions(accessToken)
    );
    return data;
  } catch (err: any) {
    console.log(err);
    throw Error(err);
  }
}

export async function checkSavedTracks(accessToken: string, ids: string[]) {
  try {
    const { data } = await spotifyClient.get(
      `/me/tracks/contains?ids=${ids.join(",")}`,
      getDefaultOptions(accessToken)
    );
    return data;
  } catch (err: any) {
    console.log(err);
    throw Error(err);
  }
}
