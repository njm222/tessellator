import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyBARk3BcjSSYFGe3LkDQAu1H-6VMxrolNM',
  authDomain: 'tessellator-space.firebaseapp.com',
  databaseURL: 'https://tessellator-space.firebaseio.com',
  projectId: 'tessellator-space',
  storageBucket: 'tessellator-space.appspot.com',
  messagingSenderId: '1095910844942',
  appId: '1:1095910844942:web:1a329d270ba9ed1c05aa5f'
}

firebase.initializeApp(config)

export default firebase
