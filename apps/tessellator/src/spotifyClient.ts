import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getCurrentUserProfile,
  getTrackAudioAnalysis,
  getTrackAudioFeatures,
  getUserTopItems,
} from "core";
import SpotifyWebApi from "spotify-web-api-js";
import { useToast } from "ui";

import { useAuth } from "./utils/authContext";
import { usePlayer } from "./utils/playerContext";

export const spotifyWebClient = new SpotifyWebApi();

export const setAccessToken = (accessToken: string) => {
  spotifyWebClient.setAccessToken(accessToken);
};

export function useGetUserInformation() {
  const { accessToken } = useAuth();
  const { open } = useToast();

  return useQuery(
    [accessToken, "me"],
    async () => getCurrentUserProfile(accessToken),
    {
      staleTime: Infinity,
      enabled: !!accessToken,
      onError: ({ message }: Error) => {
        open(message);
      },
    }
  );
}

export function useTrackAnalysisAndFeatures(trackId: string) {
  const { accessToken } = useAuth();
  const { open } = useToast();
  return useQuery(
    [trackId],
    async () => {
      const [analysis, features] = await Promise.all([
        getTrackAudioAnalysis(accessToken, trackId),
        getTrackAudioFeatures(accessToken, trackId),
      ]);
      return { analysis, features };
    },
    {
      enabled: !!accessToken && !!trackId,
      keepPreviousData: true,
      onError: ({ message }: Error) => {
        open(message);
      },
    }
  );
}

export function usePlayTopTracks() {
  const { accessToken } = useAuth();
  const { open } = useToast();
  return useMutation(
    async () => {
      const topTracks = await getUserTopItems(accessToken);
      await spotifyWebClient.play({
        uris: topTracks?.items?.map(({ uri }: { uri: string }) => uri),
      });
    },
    {
      onError: ({ message }: Error) => {
        open(message);
      },
    }
  );
}

/* -------- PLAYER CONTROLS -------- */

export function usePausePlayer() {
  const { accessToken } = useAuth();
  const { open } = useToast();
  const { setPlayer } = usePlayer();
  return useMutation(() => spotifyWebClient.pause(), {
    onMutate: () => {
      setPlayer((prev: any) => ({ ...prev, paused: true }));
    },
    onError: ({ message }: Error) => {
      open(message);
    },
  });
}

export function usePlayPlayer() {
  const { accessToken } = useAuth();
  const { open } = useToast();
  const { setPlayer } = usePlayer();
  return useMutation(
    (props?: SpotifyApi.PlayParameterObject) => spotifyWebClient.play(props),
    {
      onMutate: () => {
        setPlayer((prev: any) => ({ ...prev, paused: false }));
      },
      onError: ({ message }: Error) => {
        open(message);
      },
    }
  );
}

export function useNextTrack() {
  const { accessToken } = useAuth();
  const { open } = useToast();
  const { setPlayer } = usePlayer();
  return useMutation(() => spotifyWebClient.skipToNext(), {
    onMutate: () => {
      setPlayer((prev: any) => ({ ...prev, paused: false }));
    },
    onError: ({ message }: Error) => {
      open(message);
    },
  });
}

export function usePrevTrack() {
  const { accessToken } = useAuth();
  const { open } = useToast();
  const { setPlayer } = usePlayer();
  return useMutation(() => spotifyWebClient.skipToPrevious(), {
    onMutate: () => {
      setPlayer((prev: any) => ({ ...prev, paused: false }));
    },
    onError: ({ message }: Error) => {
      open(message);
    },
  });
}
