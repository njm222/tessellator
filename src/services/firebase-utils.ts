/** Firebase utility  functions */
import Axios from 'axios'
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_ApiKey,
  authDomain: process.env.VUE_APP_AuthDomain,
  databaseURL: process.env.VUE_APP_DatabaseURL,
  projectId: process.env.VUE_APP_ProjectId,
  storageBucket: process.env.VUE_APP_StorageBucket,
  messagingSenderId: process.env.VUE_APP_MessagingSenderId,
  appId: process.env.VUE_APP_AppId
}

firebase.initializeApp(firebaseConfig)

export const firebaseRef = { firebase }

function handleUserPresense (auth: any, spotifyUrl: string) {
  const userID = auth.user.uid
  const myConnectionsRef = firebase.database().ref(`users/${userID}/connections`)

  // stores the timestamp of my last disconnect (the last time I was seen online)
  const lastOnlineRef = firebase.database().ref(`users/${userID}/lastOnline`)

  const spotifyLinkRef = firebase.database().ref(`users/${userID}/spotifyLink`)

  spotifyLinkRef.set(spotifyUrl)

  const connectedRef = firebase.database().ref('.info/connected')
  connectedRef.on('value', function (snap) {
    if (snap.val() === true) {
      // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)

      // When I disconnect, remove this device
      myConnectionsRef.onDisconnect().remove()

      // Add this device to my connections list
      // this value could contain info about the device or a timestamp too
      myConnectionsRef.set(userID)

      console.log(userID + ' is online')

      // When I disconnect, update the last time I was seen online
      lastOnlineRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP)
    }
  })
}

export function authUser (userData: SpotifyApi.UserProfileResponse): Promise<boolean> {
  return new Promise((resolve, reject) => {
    Axios.post('/authUser', userData).then((res) => {
      console.log(`Sent user id: ${userData.id} to server`)
      firebase.auth().signInWithCustomToken(res.data).then((res) => {
        handleUserPresense(res, userData.external_urls.spotify)
        resolve(true)
      }).catch(function (error) {
        reject(error)
      })
    })
  })
}

export function addUser (UserData: SpotifyApi.UserProfileResponse) {
  Axios.post('/addUser', {
    userData: UserData
  }).then((res) => {
    console.log(res)
  }).catch(function (error) {
    console.log(error)
  })
}

export function addTrackPlayed (trackData: SpotifyApi.TrackObjectFull, userID: string) {
  Axios.post('/addTrackPlayed', {
    trackData: trackData,
    userID: userID
  }).then((res) => {
    console.log(res)
  }).catch(function (error) {
    console.log(error)
  })
}

export function addArtistsPlayed (trackData: SpotifyApi.TrackObjectFull, userID: string) {
  Axios.post('/addArtistsPlayed', {
    artistsData: trackData.artists,
    userID: userID
  }).then((res) => {
    console.log(res)
  }).catch(function (error) {
    console.log(error)
  })
}
