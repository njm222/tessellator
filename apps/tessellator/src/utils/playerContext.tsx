import {
  ReactNode,
  useMemo,
  useContext,
  createContext,
  useEffect,
  useState,
  FC,
} from "react";
import {
  getTrackAnalysis,
  getTrackFeatures,
  playRandomTopTrack,
} from "../spotifyClient";
import { useAuth } from "./authContext";
import { mutations } from "./store";
import { spotifyClient } from "../spotifyClient";
import SpotifyAnalyser, { SpotifyAnalyserData } from "spotify-analyser";
import { Loader } from "ui";

type PlayerProviderProps = {
  player?: any;
  trackFeatures?: SpotifyApi.AudioFeaturesResponse;
  spotifyAnalyser?: SpotifyAnalyser;
  children: ReactNode;
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
  lastPlayed: null,
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
  trackFeatures: trackFeaturesSample,
  spotifyAnalyser: new SpotifyAnalyser(),
});

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider: FC<PlayerProviderProps> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { accessToken, handleRefreshToken } = useAuth();
  const [player, setPlayer] = useState(playerSample);
  const [trackFeatures, setTrackFeatures] = useState(trackFeaturesSample);
  const [trackAnalysis, setTrackAnalysis] =
    useState<SpotifyAnalyserData | null>(null);
  const [spotifyAnalyser] = useState(new SpotifyAnalyser());

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    if (!document.getElementById("spotify-sdk")) {
      const sdk = document.createElement("script");
      sdk.setAttribute("src", "https://sdk.scdn.co/spotify-player.js");
      sdk.id = "spotify-sdk";
      sdk.async = true;
      document.head.appendChild(sdk);

      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: "Tessellator Player",
          getOAuthToken: async (cb: (token: string) => any) => {
            // check if token is valid
            // refresh token
            cb(accessToken);
          },
        });

        player.addListener("initialization_error", (data: any) => {
          console.log("initialization_error");
          console.log(data);
        });
        player.addListener("authentication_error", (data: any) => {
          console.log("authentication_error");
          console.log(data);
          handleRefreshToken();
        });
        player.addListener("account_error", (data: any) => {
          console.log("account_error");
          console.log(data);
        });
        player.addListener("playback_error", (data: any) => {
          console.log("playback_error");
          console.log(data); // TODO: change these to toast messages
        });
        player.addListener("ready", async (data: { device_id: string }) => {
          await playRandomTopTrack();
          spotifyClient.transferMyPlayback([data.device_id], { play: false });
        });
        player.addListener("player_state_changed", async (playerState: any) => {
          // update track position
          mutations.position = playerState?.position;

          const { id, type } = playerState?.track_window.current_track;

          if (type !== "track") {
            // handles case when podcast is played
            await playRandomTopTrack();
            return;
          }

          if (id !== player?.lastPlayed) {
            const [analysis, features] = await Promise.all([
              getTrackAnalysis(id),
              getTrackFeatures(id),
            ]);

            setTrackFeatures(features);
            setTrackAnalysis(analysis);
            setPlayer({ ...playerState, lastPlayed: id });
            return;
          }
          // update playerState
          setPlayer((prev) => ({ ...prev, ...playerState }));
        });

        player.connect();
      };
    }
  }, [accessToken, handleRefreshToken]);

  const value = useMemo(
    () => ({
      player,
      trackFeatures,
    }),
    [player, trackFeatures]
  );

  useEffect(() => {
    if (!trackAnalysis) return;
    spotifyAnalyser.setData(trackAnalysis);
  }, [spotifyAnalyser, trackAnalysis]);

  return (
    <PlayerContext.Provider value={{ ...value, spotifyAnalyser }}>
      {!trackAnalysis ? (
        <Loader
          message="Setting up player"
          dotVariant={Math.floor(Math.random() * 11)}
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
