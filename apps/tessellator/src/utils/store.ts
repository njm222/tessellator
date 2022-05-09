import create from "zustand";
import shallow from "zustand/shallow";
import { persist, subscribeWithSelector } from "zustand/middleware";
import SpotifyAnalyzer from "./SpotifyAnalyzer";
import { defaultAnalyzerOptions } from "../constants";

const useStoreImpl = create(
  subscribeWithSelector(
    persist((set) => ({
      set,
      title: "Tessellator",
      router: null,
      dom: null,
      accessToken: null,
      refreshToken: null,
      tokenReady: false,
      playerReady: false,
      sceneReady: false,
      mouseActive: true,
      stats: true,
      settings: false,
      isVisualizer: false,
      colourKey: 0,
      modeKey: 0,
      audioAnalyzerOptions: defaultAnalyzerOptions,
      audioAnalyzer: null,
      spotifyAnalyzer: new SpotifyAnalyzer(),
      spotifyFeatures: null,
      player: {
        lastPlayed: null,
        playerState: null,
      },
    }),
      {
        name: "tessellator-zustand",
        version: 1.0,
        partialize: (state) => ({
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
          audioAnalyzerOptions: state.audioAnalyzerOptions,
        }),
        merge: (persistedState, currentState) => {
          if (currentState?.refreshToken) {
            return currentState;
          }
          return { ...currentState, ...persistedState };
        },
      }
    ))
);

const mutations = {
  position: 0,
};

// shallow compare store
const useStore = ((selector) => useStoreImpl(selector, shallow)) as typeof useStoreImpl;
Object.assign(useStore, useStoreImpl);

const { getState, setState } = useStoreImpl;

export { getState, setState, useStore, mutations };
