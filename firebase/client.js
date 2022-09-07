import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB77Q-GrYOyZEvJvHmTsDNb-Qc2418YW4A',
  authDomain: 'twitter-devs.firebaseapp.com',
  projectId: 'twitter-devs',
  storageBucket: 'twitter-devs.appspot.com',
  messagingSenderId: '429556251933',
  appId: '1:429556251933:web:0a3fbf0e180fd8a937b5f4',
  measurementId: 'G-RFKLGDCDXD'
}

firebase.apps.length === 0 && firebase.initializeApp(firebaseConfig)

const mapUserFromFirebaseAuthToUser = (user) => {
  const { photoURL, email, displayName } = user
  return {
    avatar: photoURL,
    username: displayName,
    email
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged(user => {
    const normalizedUser = mapUserFromFirebaseAuthToUser(user)
    onChange(normalizedUser)
  })
}

export const loginWithGithub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase.auth().signInWithPopup(githubProvider)
}
