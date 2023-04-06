// TODO: separate client api calls => spotify-core
import { useQuery } from "@tanstack/react-query";
import SpotifyWebApi from "spotify-web-api-js";

import { useAuth } from "./utils/authContext";

export const spotifyClient = new SpotifyWebApi();

export const setAccessToken = (accessToken: string) => {
  spotifyClient.setAccessToken(accessToken);
};

export function useGetUserInformation() {
  const { accessToken } = useAuth();
  return useQuery([accessToken], () => spotifyClient.getMe(), {
    staleTime: Infinity,
  });
}

export function useTrackAnalysisAndFeatures(trackId: string) {
  return useQuery(
    [trackId],
    async () => {
      const [analysis, features] = await Promise.all([
        spotifyClient.getAudioAnalysisForTrack(trackId),
        spotifyClient.getAudioFeaturesForTrack(trackId),
      ]);
      return { analysis, features };
    },
    {
      enabled: !!trackId,
      keepPreviousData: true,
    }
  );
}

export const playTopTracks = async () => {
  const tracksUri = (await spotifyClient.getMyTopTracks()).items.map(
    ({ uri }) => uri
  );

  return await spotifyClient.play({ uris: tracksUri });
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

export const nextTrack = async () => {
  const results = await spotifyClient.skipToNext();
  return results;
};

export const prevTrack = async () => {
  const results = await spotifyClient.skipToPrevious();
  return results;
};
