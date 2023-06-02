import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { StartPlaybackOptions } from "core";
import SpotifyAnalyser from "spotify-analyser";
import { useToast } from "ui";

import { useAuth } from "./authContext";
import {
  AudioFeatures,
  useNextTrack,
  usePausePlayer,
  usePlayPlayer,
  usePlayTopTracks,
  usePrevTrack,
  useRemoveSavedTrack,
  useSaveTrack,
  useSeekToPosition,
  useShufflePlayer,
  useTrackAnalysisAndFeatures,
  useTransferMyPlayback,
} from "./spotify";
import { mutations } from "./store";
import { useLoader } from "./loaderContext";

type PlayerProviderProps = {
  player?: any;
  setPlayer?: any;
  trackFeatures?: AudioFeatures;
  spotifyAnalyser?: SpotifyAnalyser;
  children: ReactNode;
  play?: (props?: StartPlaybackOptions) => void;
  pause?: () => void;
  next?: () => void;
  prev?: () => void;
  seek?: (_: number) => void;
  save?: (_: string) => void;
  removeSaved?: (_: string) => void;
  shuffle?: (_: boolean) => void;
};

const trackFeaturesSample = {
  acousticness: 0.00242,
  analysis_url:
    "https://api.spotify.com/v1/audio-analysis/2takcwOaAZWiXQijPHIx7B\n",
  danceability: 0.585,
  duration_ms: 237040,
  energy: 0.842,
  id: "2takcwOaAZWiXQijPHIx7B",
  instrumentalness: 0.00686,
  key: 9,
  liveness: 0.0866,
  loudness: -5.883,
  mode: 0,
  speechiness: 0.0556,
  tempo: 118.211,
  time_signature: 4,
  track_href: "https://api.spotify.com/v1/tracks/2takcwOaAZWiXQijPHIx7B\n",
  uri: "spotify:track:2takcwOaAZWiXQijPHIx7B",
  valence: 0.428,
  type: "audio_features",
};

const playerSample = {
  duration: 0,
  paused: true,
  shuffle: false,
  track_window: {
    current_track: {
      id: "",
      name: "",
      artists: [{ name: "", uri: "" }],
      album: { images: [{ url: "" }] },
      uri: "",
    },
  },
};

export const PlayerContext = createContext({
  player: playerSample,
  setPlayer: (_: any) => {},
  trackFeatures: trackFeaturesSample,
  spotifyAnalyser: new SpotifyAnalyser(),
  play: (_?: StartPlaybackOptions) => {},
  pause: () => {},
  next: () => {},
  prev: () => {},
  seek: (_: number) => {},
  save: (_: string) => {},
  removeSaved: (_: string) => {},
  shuffle: (_: boolean) => {},
});

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider: FC<PlayerProviderProps> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const toast = useToast();
  const { accessToken, handleRefreshToken } = useAuth();
  const { setIsLoading } = useLoader();
  const [player, setPlayer] = useState(playerSample);
  const [spotifyPlayer, setSpotifyPlayer] = useState<any>(null);
  const [trackId, setTrackId] = useState("");
  const { data = { analysis: null, features: trackFeaturesSample } } =
    useTrackAnalysisAndFeatures(trackId);
  const { mutate: mutatePlay } = usePlayPlayer();
  const { mutate: mutatePause } = usePausePlayer();
  const { mutate: mutateNext } = useNextTrack();
  const { mutate: mutatePrev } = usePrevTrack();
  const { mutate: mutatePlayTopTracks } = usePlayTopTracks();
  const { mutate: mutateTransferMyPlayback } = useTransferMyPlayback();
  const { mutate: mutateSave } = useSaveTrack();
  const { mutate: mutateRemoveSaved } = useRemoveSavedTrack();
  const { mutate: mutateShuffle } = useShufflePlayer();
  const { mutate: mutateSeek } = useSeekToPosition();

  const [spotifyAnalyser] = useState(new SpotifyAnalyser());

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    if (document.getElementById("spotify-sdk")) {
      return;
    }

    setIsLoading(true, "Setting up player");

    const sdk = document.createElement("script");
    sdk.setAttribute("src", "https://sdk.scdn.co/spotify-player.js");
    sdk.id = "spotify-sdk";
    sdk.async = true;
    document.head.appendChild(sdk);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Tessellator Player",
        getOAuthToken: async (cb: (token: string) => any) => {
          cb(accessToken);
        },
      });

      player.addListener(
        "initialization_error",
        (data: { message: string }) => {
          toast.open(data.message);
        }
      );
      player.addListener(
        "authentication_error",
        (data: { message: string }) => {
          toast.open(data.message);
          handleRefreshToken(true);
        }
      );
      player.addListener("account_error", (data: { message: string }) => {
        toast.open(data.message);
      });
      player.addListener("playback_error", (data: { message: string }) => {
        toast.open(data.message);
      });
      player.addListener("ready", (data: { device_id: string }) => {
        if (!data.device_id) {
          // toast message
          toast.open("Player failed to start");
          return;
        }
        mutateTransferMyPlayback(data.device_id);
      });
      player.addListener("player_state_changed", async (playerState: any) => {
        // update track position
        mutations.position = playerState?.position ?? 0;

        const { id, type } = playerState?.track_window.current_track;

        if (type !== "track") {
          // handles case when podcast is played
          mutatePlayTopTracks();
          return;
        }

        if (id !== trackId) {
          setTrackId(id);
          setPlayer({ ...playerState, lastPlayed: id });
          return;
        }
        // update playerState
        setPlayer((prev) => ({ ...prev, ...playerState }));
      });

      player.connect();
      setSpotifyPlayer(player);
    };

    () => {
      if (!spotifyPlayer) return;
      spotifyPlayer.pause();
      spotifyPlayer.disconnect();
    };
  }, [
    accessToken,
    handleRefreshToken,
    setTrackId,
    trackId,
    mutatePlay,
    mutatePlayTopTracks,
    mutateTransferMyPlayback,
    toast,
  ]);

  const value = useMemo(
    () => ({
      player,
      setPlayer,
      trackFeatures: data.features,
      play: (props?: StartPlaybackOptions) => mutatePlay(props),
      pause: () => mutatePause(),
      next: () => mutateNext(),
      prev: () => mutatePrev(),
      seek: (position: number) => mutateSeek(position),
      save: (id: string) => mutateSave(id),
      removeSaved: (id: string) => mutateRemoveSaved(id),
      shuffle: (shuffle: boolean) => mutateShuffle(shuffle),
    }),
    [
      player,
      data.features,
      mutatePlay,
      mutatePause,
      mutateNext,
      mutatePrev,
      mutateSave,
      mutateRemoveSaved,
      mutateShuffle,
      mutateSeek,
      setPlayer,
    ]
  );

  useEffect(() => {
    if (!data.analysis) return;
    spotifyAnalyser.setData(data.analysis);
    setIsLoading(false);
  }, [spotifyAnalyser, data.analysis]);

  return (
    <PlayerContext.Provider value={{ ...value, spotifyAnalyser }}>
      {children}
    </PlayerContext.Provider>
  );
};

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady(): void;
    Spotify: any;
  }
}
