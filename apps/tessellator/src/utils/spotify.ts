import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  checkSavedTracks,
  getCurrentUserProfile,
  getTrackAudioAnalysis,
  getTrackAudioFeatures,
  getUserTopItems,
  pausePlayback,
  removeSavedTracks,
  saveTracks,
  seekToPosition,
  shufflePlayback,
  skipToNext,
  skipToPrevious,
  startPlayback,
  StartPlaybackOptions,
  transferMyPlayback,
} from "core";
import { useRouter } from "next/router";
import { useToast } from "ui";

import { useAuth } from "./authContext";
import { usePlayer } from "./playerContext";

export function useGetUserInformation() {
  const { accessToken } = useAuth();
  const { open } = useToast();
  const router = useRouter();

  return useQuery(
    [accessToken, "me"],
    async () => getCurrentUserProfile(accessToken),
    {
      staleTime: Infinity,
      enabled: !!accessToken,
      onSuccess: ({
        product,
        display_name,
      }: {
        product: string;
        display_name: string;
      }) => {
        if (product === "premium") {
          return;
        }
        router.push("/"); // TODO: redirect to "live" visualizer
        open("Visualizer requires a valid Spotify Premium subscription");
      },
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
    ["me", "tracks", trackId],
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

export function useRemoveSavedTrack() {
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();
  const { open } = useToast();
  return useMutation(
    async (id: string) => removeSavedTracks(accessToken, [id]),
    {
      onError: ({ message }: Error) => {
        open(message);
      },
      onMutate: (id: string) => {
        queryClient.setQueryData(["me", "tracks", id, "contains"], false);
      },
      onSettled: ({ id }) =>
        queryClient.cancelQueries(["me", "tracks", id, "contains"]),
      onSuccess: () => {
        open("Track removed from Liked Songs", { variant: "" });
      },
    }
  );
}

export function useSaveTrack() {
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();
  const { open } = useToast();
  return useMutation(async (id: string) => saveTracks(accessToken, [id]), {
    onError: ({ message }: Error) => {
      open(message);
    },
    onMutate: (id: string) => {
      queryClient.setQueryData(["me", "tracks", id, "contains"], true);
    },
    onSettled: ({ id }) =>
      queryClient.cancelQueries(["me", "tracks", id, "contains"]),
    onSuccess: () => {
      open("Track added to Liked Songs", { variant: "" });
    },
  });
}

export function useCheckSavedTrack(trackId: string) {
  const { accessToken } = useAuth();
  const { open } = useToast();
  return useQuery(
    ["me", "tracks", trackId, "contains"],
    async () => {
      const [saved] = await checkSavedTracks(accessToken, [trackId]);
      return saved;
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

export function useShufflePlayer() {
  const { accessToken } = useAuth();
  const { open } = useToast();
  const { setPlayer } = usePlayer();
  return useMutation(
    async (shuffle: boolean) => shufflePlayback(accessToken, shuffle),
    {
      onMutate: (shuffle) => {
        setPlayer((prev: any) => ({ ...prev, shuffle }));
      },
      onError: ({ message }: Error) => {
        open(message);
      },
    }
  );
}

export function useSeekToPosition() {
  const { accessToken } = useAuth();
  const { open } = useToast();
  return useMutation(
    async (position: number) => seekToPosition(accessToken, position),
    {
      onError: ({ message }: Error) => {
        open(message);
      },
    }
  );
}
