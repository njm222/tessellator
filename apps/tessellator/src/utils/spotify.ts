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

type TError = {
  message: string;
  response?: {
    status: number;
  };
};

async function handleError(
  error: TError,
  open: (message: string) => void,
  handleRefreshToken: () => Promise<void>
) {
  if (error.response?.status === 401) {
    // handle refresh
    await handleRefreshToken();
    return;
  }
  open(error.message);
}

export function useGetUserInformation() {
  const { accessToken, handleRefreshToken } = useAuth();
  const { open } = useToast();
  const router = useRouter();

  return useQuery(
    [accessToken, "me"],
    async () => getCurrentUserProfile(accessToken),
    {
      staleTime: Infinity,
      enabled: !!accessToken,
      onSuccess: ({ product }: { product: string; display_name: string }) => {
        if (product === "premium") {
          return;
        }
        router.push("/"); // TODO: redirect to "live" visualizer
        open("Visualizer requires a valid Spotify Premium subscription");
      },
      onError: (error: TError) => {
        handleError(error, open, handleRefreshToken);
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
  const { accessToken, handleRefreshToken } = useAuth();
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
      onError: (error: TError) => {
        handleError(error, open, handleRefreshToken);
      },
    }
  );
}

export function useRemoveSavedTrack() {
  const queryClient = useQueryClient();
  const { accessToken, handleRefreshToken } = useAuth();
  const { open } = useToast();
  return useMutation(
    async (id: string) => removeSavedTracks(accessToken, [id]),
    {
      onError: (error: TError) => {
        handleError(error, open, handleRefreshToken);
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
  const { accessToken, handleRefreshToken } = useAuth();
  const { open } = useToast();
  return useMutation(async (id: string) => saveTracks(accessToken, [id]), {
    onError: (error: TError) => {
      handleError(error, open, handleRefreshToken);
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
  const { accessToken, handleRefreshToken } = useAuth();
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
      onError: (error: TError) => {
        handleError(error, open, handleRefreshToken);
      },
    }
  );
}

export function usePlayTopTracks() {
  const { accessToken, handleRefreshToken } = useAuth();
  const { open } = useToast();
  return useMutation(
    async () => {
      const topTracks = await getUserTopItems(accessToken);
      await startPlayback(accessToken, {
        uris: topTracks?.items?.map(({ uri }: { uri: string }) => uri),
      });
    },
    {
      onError: (error: TError) => {
        handleError(error, open, handleRefreshToken);
      },
    }
  );
}

export function useTransferMyPlayback() {
  const { accessToken, handleRefreshToken } = useAuth();
  const { open } = useToast();
  return useMutation(
    async (deviceId: string) =>
      transferMyPlayback(accessToken, deviceId, false),
    {
      onError: (error: TError) => {
        handleError(error, open, handleRefreshToken);
      },
    }
  );
}

/* -------- PLAYER CONTROLS -------- */

export function usePausePlayer() {
  const { accessToken, handleRefreshToken } = useAuth();
  const { open } = useToast();
  const { setPlayer } = usePlayer();
  return useMutation(async () => pausePlayback(accessToken), {
    onMutate: () => {
      setPlayer((prev: any) => ({ ...prev, paused: true }));
    },
    onError: (error: TError) => {
      handleError(error, open, handleRefreshToken);
    },
  });
}

export function usePlayPlayer() {
  const { accessToken, handleRefreshToken } = useAuth();
  const { open } = useToast();
  const { setPlayer } = usePlayer();
  return useMutation(
    async (props?: StartPlaybackOptions) => startPlayback(accessToken, props),
    {
      onMutate: () => {
        setPlayer((prev: any) => ({ ...prev, paused: false }));
      },
      onError: (error: TError) => {
        handleError(error, open, handleRefreshToken);
      },
    }
  );
}

export function useNextTrack() {
  const { accessToken, handleRefreshToken } = useAuth();
  const { open } = useToast();
  const { setPlayer } = usePlayer();
  return useMutation(async () => skipToNext(accessToken), {
    onMutate: () => {
      setPlayer((prev: any) => ({ ...prev, paused: false }));
    },
    onError: (error: TError) => {
      handleError(error, open, handleRefreshToken);
    },
  });
}

export function usePrevTrack() {
  const { accessToken, handleRefreshToken } = useAuth();
  const { open } = useToast();
  const { setPlayer } = usePlayer();
  return useMutation(async () => skipToPrevious(accessToken), {
    onMutate: () => {
      setPlayer((prev: any) => ({ ...prev, paused: false }));
    },
    onError: (error: TError) => {
      handleError(error, open, handleRefreshToken);
    },
  });
}

export function useShufflePlayer() {
  const { accessToken, handleRefreshToken } = useAuth();
  const { open } = useToast();
  const { setPlayer } = usePlayer();
  return useMutation(
    async (shuffle: boolean) => shufflePlayback(accessToken, shuffle),
    {
      onMutate: (shuffle) => {
        setPlayer((prev: any) => ({ ...prev, shuffle }));
      },
      onError: (error: TError) => {
        handleError(error, open, handleRefreshToken);
      },
    }
  );
}

export function useSeekToPosition() {
  const { accessToken, handleRefreshToken } = useAuth();
  const { open } = useToast();
  return useMutation(
    async (position: number) => seekToPosition(accessToken, position),
    {
      onError: (error: TError) => {
        handleError(error, open, handleRefreshToken);
      },
    }
  );
}
