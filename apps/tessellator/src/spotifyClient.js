import SpotifyWebApi from "spotify-web-api-js";
import { useStore, mutations } from "./utils/store";
import { updateToken } from "./backendClient";

const spotifyClient = new SpotifyWebApi();

export const setAccessToken = (accessToken) => {
  spotifyClient.setAccessToken(accessToken);
};

export const getMyInfo = async () => {
  try {
    const results = await spotifyClient.getMe();
    return results;
  } catch (err) {
    console.log(err);
    const token = useStore.getState().accessToken;
    if (token) {
      updateToken(token);
    }
  }
};

export const getUserPlaylists = async (userId) => {
  const results = await spotifyClient.getUserPlaylists(userId);
  return results;
};

export const getTrackAnalysis = async (trackId) => {
  const results = await spotifyClient.getAudioAnalysisForTrack(trackId);
  return results;
};

export const getTrackFeatures = async (trackId) => {
  const results = await spotifyClient.getAudioFeaturesForTrack(trackId);
  return results;
};

/* -------- PLAYER -------- */

export const sdkInit = () => {
  console.log('sdkInit');
  window.onSpotifyWebPlaybackSDKReady = () => {
    const player = new window.Spotify.Player({
      name: "Visualizer Player",
      getOAuthToken: (cb) => {
        cb(spotifyClient.getAccessToken());
      },
    });
    addPlayerListeners(player);
    player.connect();
    console.log('connect player')
  };
};

const addPlayerListeners = (player) => {
  player.addListener("initialization_error", (data) => {
    console.log("initialization_error");
    console.log(data);
  });
  player.addListener("authentication_error", (data) => {
    console.log("authentication_error");
    console.log(data);
  });
  player.addListener("account_error", (data) => {
    console.log("account_error");
    console.log(data);
  });
  player.addListener("playback_error", (data) => {
    console.log("playback_error");
    console.log(data); // TODO: change these to toast messages
  });
  player.addListener("ready", (data) => {
    console.log("Ready with deviceID ", data.device_id);
    spotifyClient
      .transferMyPlayback([data.device_id])
      .then(() => spotifyClient.play({ device_id: data.device_id }));
  });
  player.addListener("player_state_changed", async (playerState) => {
    console.log("player state changed");

    // update track position
    mutations.position = playerState?.position;

    const trackId = playerState?.track_window.current_track.id;
    if (trackId !== useStore.getState().player.lastPlayed) {
      const analysis = await getTrackAnalysis(trackId);
      const features = await getTrackFeatures(trackId);

      // update spotifyAnalyzer
      useStore.getState().spotifyAnalyzer.setData(analysis);
      // update store with new track data
      useStore.setState({
        playerReady: true,
        spotifyFeatures: features,
        player: {
          playerState,
          lastPlayed: trackId,
        },
      });
      // send trackId and artistsId to firestore
      // send trackId as lastPlayed under /users/{uid} (should this be there for this release?)
      return;
    }
    // update playerState
    useStore.setState((state) => ({
      player: {
        ...state.player,
        playerState,
      },
    }));
  });
};

/* -------- PLAYER CONTROLS -------- */

export const playTrack = async (trackId = null) => {
  useStore.getState().audioAnalyzer?.context?.resume(); // temp solution
  const results = await spotifyClient.play(trackId);
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
