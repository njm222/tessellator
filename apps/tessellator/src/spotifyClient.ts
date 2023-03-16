// TODO: separate client api calls => spotify-core
import SpotifyWebApi from "spotify-web-api-js";

export const spotifyClient = new SpotifyWebApi();

export const setAccessToken = (accessToken: string) => {
  spotifyClient.setAccessToken(accessToken);
};

export const getMyInfo = async () => {
  try {
    return await spotifyClient.getMe();
  } catch (err) {
    console.log(err);
  }
};

export const getUserPlaylists = async (userId: string) => {
  const results = await spotifyClient.getUserPlaylists(userId);
  return results;
};

export const getTrackAnalysis = async (trackId: string) => {
  const results = await spotifyClient.getAudioAnalysisForTrack(trackId);
  return results;
};

export const getTrackFeatures = async (trackId: string) => {
  const results = await spotifyClient.getAudioFeaturesForTrack(trackId);
  return results;
};

/* -------- PLAYER CONTROLS -------- */

export const playPlayer = async () => {
  const results = await spotifyClient.play();
  return results;
};

export const pausePlayer = async () => {
  const results = await spotifyClient.pause();
  return results;
};

export const playTopTracks = async () => {
  const tracksUri = (await spotifyClient.getMyTopTracks()).items.map(
    ({ uri }) => uri
  );

  return await spotifyClient.play({ uris: tracksUri });
};

export const nextTrack = async () => {
  const results = await spotifyClient.skipToNext();
  return results;
};

export const prevTrack = async () => {
  const results = await spotifyClient.skipToPrevious();
  return results;
};
