// TODO: separate client api calls => spotify-core
import { useMutation, useQuery } from "@tanstack/react-query";
import SpotifyWebApi from "spotify-web-api-js";

import { useAuth } from "./utils/authContext";
import { usePlayer } from "./utils/playerContext";

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

export function useGetTopTracks() {
  const { accessToken } = useAuth();

  return useQuery([accessToken], () => spotifyClient.getMyTopTracks(), {
    staleTime: Infinity,
  });
}

/* -------- PLAYER CONTROLS -------- */

export function usePausePlayer() {
  const { setPlayer } = usePlayer();
  return useMutation(() => spotifyClient.pause(), {
    onMutate: () => {
      setPlayer((prev: any) => ({ ...prev, paused: true }));
    },
  });
}

export function usePlayPlayer() {
  const { setPlayer } = usePlayer();
  return useMutation(
    (props?: SpotifyApi.PlayParameterObject) => spotifyClient.play(props),
    {
      onMutate: () => {
        setPlayer((prev: any) => ({ ...prev, paused: false }));
      },
    }
  );
}

export function useNextTrack() {
  const { setPlayer } = usePlayer();
  return useMutation(() => spotifyClient.skipToNext(), {
    onMutate: () => {
      setPlayer((prev: any) => ({ ...prev, paused: false }));
    },
  });
}

export function usePrevTrack() {
  const { setPlayer } = usePlayer();
  return useMutation(() => spotifyClient.skipToPrevious(), {
    onMutate: () => {
      setPlayer((prev: any) => ({ ...prev, paused: false }));
    },
  });
}
