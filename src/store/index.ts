import Vue from 'vue'
import Vuex from 'vuex'
import { authUser } from '@/services/firebase-utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: null,
    refreshToken: null,
    user: null,
    authUser: null,
    openVisualizer: false,
    onlineUsers: null,
    lastOnlineUsers: null,
    deviceID: null,
    playerInfo: null,
    trackPosition: null,
    topTracks: null,
    topArtists: null,
    userPlaylists: null,
    usersPlaylists: new Map(),
    toggleUsersPlaylists: new Map(),
    spotifyAnalysisUtils: null,
    modeKey: 1,
    colourKey: 1,
    randomMode: true,
    randomColour: true,
    cameraZoomToggle: true,
    cameraRotateToggle: true
  },
  mutations: {
    mutateAccessToken (state, payload) {
      state.accessToken = payload
    },
    mutateRefreshToken (state, payload) {
      state.refreshToken = payload
    },
    mutateUser (state, payload) {
      state.user = payload
    },
    mutateAuthUser (state, payload) {
      state.authUser = payload
    },
    mutateOpenVisualizer (state, payload) {
      state.openVisualizer = payload
    },
    mutateOnlineUsers (state, payload) {
      state.onlineUsers = payload
    },
    mutateLastOnlineUsers (state, payload) {
      state.lastOnlineUsers = payload
    },
    mutateDeviceID (state, payload) {
      state.deviceID = payload
    },
    mutatePlayerInfo (state, payload) {
      state.playerInfo = payload
    },
    mutateTrackPosition (state, payload) {
      state.trackPosition = payload
    },
    mutateTopTracks (state, payload) {
      state.topTracks = payload
    },
    mutateTopArtists (state, payload) {
      state.topArtists = payload
    },
    mutateUserPlaylists (state, payload) {
      state.userPlaylists = payload
    },
    mutateUsersPlaylists (state, payload) {
      const uPlaylists = state.usersPlaylists.set(payload.key, payload.value)
      state.usersPlaylists = new Map()
      state.usersPlaylists = uPlaylists
    },
    mutateSpotifyAnalysisUtils (state, payload) {
      state.spotifyAnalysisUtils = payload
    },
    mutateModeKey (state, payload) {
      state.modeKey = payload
    },
    mutateColourKey (state, payload) {
      state.colourKey = payload
    },
    mutateRandomMode (state, payload) {
      state.randomMode = payload
    },
    mutateRandomColour (state, payload) {
      state.randomColour = payload
    },
    mutateCameraZoomToggle (state, payload) {
      state.cameraZoomToggle = payload
    },
    mutateCameraRotateToggle (state, payload) {
      state.cameraRotateToggle = payload
    }
  },
  getters: {
    getAccessToken (state) {
      return state.accessToken
    },
    getRefreshToken (state) {
      return state.refreshToken
    },
    getUser (state) {
      return state.user
    },
    getAuthUser (state) {
      return state.authUser
    },
    getOnlineUsers (state) {
      return state.onlineUsers
    },
    getLastOnlineUsers (state) {
      return state.lastOnlineUsers
    },
    getDeviceID (state) {
      return state.deviceID
    },
    getPlayerInfo (state) {
      return state.playerInfo
    },
    getTopTracks (state) {
      return state.topTracks
    },
    getTopArtists (state) {
      return state.topArtists
    },
    getUsersPlaylists (state) {
      return state.usersPlaylists
    },
    getToggleUsersPlaylists (state) {
      return state.toggleUsersPlaylists
    }
  },
  actions: {
    async actionAuthUser (context, payload) {
      context.commit('mutateAuthUser', await authUser(payload))
    }
  },
  modules: {
  }
})
