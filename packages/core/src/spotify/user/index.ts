import { getDefaultOptions, spotifyClient } from "../spotifyClient";
import { handleError } from "../utils";

export async function getUserTopItems(accessToken: string, type = "tracks") {
  try {
    const { data } = await spotifyClient.get(
      `/me/top/${type}`,
      getDefaultOptions(accessToken)
    );
    return data;
  } catch (err: unknown) {
    handleError(err);
  }
}

export async function getCurrentUserProfile(accessToken: string) {
  try {
    const { data } = await spotifyClient.get(
      "/me",
      getDefaultOptions(accessToken)
    );
    return data;
  } catch (err: unknown) {
    handleError(err);
  }
}
