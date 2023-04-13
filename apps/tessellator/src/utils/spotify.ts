import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getCurrentUserProfile,
  getTrackAudioAnalysis,
  getTrackAudioFeatures,
  getUserTopItems,
  pausePlayback,
  saveTracks,
  skipToNext,
  skipToPrevious,
  startPlayback,
  StartPlaybackOptions,
  transferMyPlayback,
} from "core";
import { useToast } from "ui";

import { useAuth } from "./authContext";
import { usePlayer } from "./playerContext";

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

export type AudioFeatures = {
  acousticness: number;
  analysis_url: string;
  danceability: number;
  duration_ms: number;
  energy: number;
  id: string;
  instrumentalness: number;
  key: number;
  liveness: number;
  loudness: number;
  mode: number;
  speechiness: number;
  tempo: number;
  time_signature: number;
  track_href: string;
  type: string;
  uri: string;
  valence: number;
};

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

export function useSaveTrack() {
  const { accessToken } = useAuth();
  const { open } = useToast();
  const { setPlayer } = usePlayer();
  return useMutation(async (id: string) => saveTracks(accessToken, [id]), {
    onMutate: () => {
      setPlayer((prev: any) => ({ ...prev, paused: false }));
    },
    onError: ({ message }: Error) => {
      open(message);
    },
  });
}

export function usePlayTopTracks() {
  const { accessToken } = useAuth();
  const { open } = useToast();
  return useMutation(
    async () => {
      const topTracks = await getUserTopItems(accessToken);
      await startPlayback(accessToken, {
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

export function useTransferMyPlayback() {
  const { accessToken } = useAuth();
  const { open } = useToast();
  return useMutation(
    async (deviceId: string) =>
      transferMyPlayback(accessToken, deviceId, false),
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
  return useMutation(async () => pausePlayback(accessToken), {
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
    async (props?: StartPlaybackOptions) => startPlayback(accessToken, props),
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
  return useMutation(async () => skipToNext(accessToken), {
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
  return useMutation(async () => skipToPrevious(accessToken), {
    onMutate: () => {
      setPlayer((prev: any) => ({ ...prev, paused: false }));
    },
    onError: ({ message }: Error) => {
      open(message);
    },
  });
}
