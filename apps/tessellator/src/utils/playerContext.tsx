import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { generateRandomInteger } from "core";
import SpotifyAnalyser from "spotify-analyser";
import { Loader, useToast } from "ui";

import {
  spotifyWebClient,
  useNextTrack,
  usePausePlayer,
  usePlayPlayer,
  usePlayTopTracks,
  usePrevTrack,
  useTrackAnalysisAndFeatures,
} from "../spotifyClient";

import { useAuth } from "./authContext";
import { mutations } from "./store";

type PlayerProviderProps = {
  player?: any;
  setPlayer?: any;
  trackFeatures?: SpotifyApi.AudioFeaturesResponse;
  spotifyAnalyser?: SpotifyAnalyser;
  children: ReactNode;
  play?: (props?: SpotifyApi.PlayParameterObject) => void;
  pause?: () => void;
  next?: () => void;
  prev?: () => void;
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
  track_window: {
    current_track: {
      name: "",
      artists: [{ name: "" }],
      album: { images: [{ url: "" }] },
    },
  },
};

export const PlayerContext = createContext({
  player: playerSample,
  setPlayer: (_: any) => {},
  trackFeatures: trackFeaturesSample,
  spotifyAnalyser: new SpotifyAnalyser(),
  play: (_?: SpotifyApi.PlayParameterObject) => {},
  pause: () => {},
  next: () => {},
  prev: () => {},
});

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider: FC<PlayerProviderProps> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const toast = useToast();
  const { accessToken, handleRefreshToken } = useAuth();
  const [player, setPlayer] = useState(playerSample);
  const [trackId, setTrackId] = useState("");
  const { data = { analysis: null, features: trackFeaturesSample } } =
    useTrackAnalysisAndFeatures(trackId);
  const { mutate: mutatePlay } = usePlayPlayer();
  const { mutate: mutatePause } = usePausePlayer();
  const { mutate: mutateNext } = useNextTrack();
  const { mutate: mutatePrev } = usePrevTrack();
  const { mutate: mutatePlayTopTracks } = usePlayTopTracks();

  const [spotifyAnalyser] = useState(new SpotifyAnalyser());

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    if (document.getElementById("spotify-sdk")) {
      return;
    }

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
          handleRefreshToken();
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

        spotifyWebClient.transferMyPlayback([data.device_id], {
          play: false,
        });
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
    };
  }, [
    accessToken,
    handleRefreshToken,
    setTrackId,
    trackId,
    mutatePlay,
    mutatePlayTopTracks,
    toast,
  ]);

  const value = useMemo(
    () => ({
      player,
      setPlayer,
      trackFeatures: data.features,
      play: (props?: SpotifyApi.PlayParameterObject) => mutatePlay(props),
      pause: () => mutatePause(),
      next: () => mutateNext(),
      prev: () => mutatePrev(),
    }),
    [
      player,
      data.features,
      mutatePlay,
      mutatePause,
      mutateNext,
      mutatePrev,
      setPlayer,
    ]
  );

  useEffect(() => {
    if (!data.analysis) return;
    spotifyAnalyser.setData(data.analysis);
  }, [spotifyAnalyser, data.analysis]);

  return (
    <PlayerContext.Provider value={{ ...value, spotifyAnalyser }}>
      {!data.analysis ? (
        <Loader
          dotVariant={generateRandomInteger(0, 11)}
          message="Setting up player"
        />
      ) : null}
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
